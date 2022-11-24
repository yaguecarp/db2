const cassandra = require("cassandra-driver");

function cassandraClient() {
  const authProvider = new cassandra.auth.PlainTextAuthProvider(
    "nyague",
    "taekwondo2326"
  );
  const contactPoints = ["127.0.0.1:9042"];
  const localDataCenter = "datacenter1";

  const client = new cassandra.Client({
    contactPoints: contactPoints,
    authProvider: authProvider,
    localDataCenter: localDataCenter,
    keyspace: "logs"
  });

  client
    .connect()
    .then((db) => console.log("Cassandra Connected."))
    .catch((err) => console.log(err));
}

module.exports = cassandraClient;
