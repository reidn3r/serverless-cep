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
    "service:": "viacep",
    "statusCode": 200
  });
});

app.get("/cep/:cep", async (req, res, next) => {
  const cep = req.params.cep;

  const foundCep = await redis.get(cep);
  if(foundCep) return res.status(200).json(JSON.parse(foundCep));

  const response = await http.HttpGetRequest(
    `${process.env.VIACEP_API}/${cep}/json/`
  );

  await redis.set(cep, JSON.stringify(response));
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
