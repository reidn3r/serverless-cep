const path = require("path");
require("dotenv")
  .config({ path: path.join(__dirname, '..', '..', '.env') });

const serverless = require("serverless-http");
const express = require("express");
const app = express();
const http = require("../../utils/http/client");
const redis = require('../../utils/redis/client');

app.get("/health", (req, res, next) => {
  return res.status(200).json({
    "service:": "ibge",
    "statusCode": 200
  });
});

app.get("/ibge/:cidade/:uf", async (req, res, next) => {
  const city = req.params.cidade;
  const uf = req.params.uf;

  const foundCep = await redis.get(`${city}-${uf}`);
  if(foundCep) return res.status(200).json(JSON.parse(foundCep));
  
  const response = await http.HttpGetRequest(
    process.env.IBGE_API + `/localidades/municipios/${city}`
  );

  if(Array.isArray(response)){
    const foundCep = response.filter((cep) => {
      const ufNome  = cep.microrregiao?.mesorregiao?.UF?.nome?.toLowerCase();
      const ufSigla = cep.microrregiao?.mesorregiao?.UF?.sigla?.toLowerCase();

      return ufNome === uf.toLowerCase() || ufSigla === uf.toLowerCase();
    });

    await redis.set(`${city}-${uf}`, JSON.stringify(foundCep[0]));
    return res.status(200).json(foundCep[0]);
  }
  
  await redis.set(`${city}-${uf}`, JSON.stringify(response));
  return res.status(200).json({
    response,
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
