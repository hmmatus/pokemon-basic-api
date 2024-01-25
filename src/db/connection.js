const mongoose = require("mongoose");
require("dotenv").config();

function connectToDatabase() {
  mongoose
    .connect(process.env.MONGODB_CONNECT_URI)
    .then(() => console.log("Conectado a mongoDB"))
    .catch((err) => console.log("No se pudo conectar", err));
}

module.exports = {
  connectToDatabase,
};
