const path = require("path");
require("dotenv")
  .config({ path: path.join(__dirname, '..', '..', '.env') });

const { createClient } = require("redis");

const client = createClient({
  url: process.env.MODE == "development"
  ? "http://localhost:6379"
  : process.env.REDIS_HOST
})
  .on("error", (err) => console.log("Redis Client Error", err));

let isConnected = false;

async function getClient() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
  return client;
}

async function set(key, value) {
  const c = await getClient();
  return c.set(key, value);
}

async function get(key) {
  const c = await getClient();
  return c.get(key);
}

module.exports = { set, get };
