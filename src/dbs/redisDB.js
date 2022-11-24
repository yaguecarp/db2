const redis = require("redis");

function redisClient() {
  const client = redis.createClient();
  client.connect();
  client.on("ready", () => {
    console.log("Redis Connected.");
  });
}

module.exports = redisClient;
