const mongoose = require("mongoose");
const URI = "mongodb://localhost/tpo";

function mongoClient(){
  mongoose
  .connect(URI)
  .then((db) => console.log("MongoDB Connected."))
  .catch((err) => console.log(err));
}
// Mongo


module.exports = mongoClient;
