const express = require('express');
const routes = require("./routes/index");
const {connectToDatabase} = require("../db/connection");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routes);
connectToDatabase();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Api Restful Ok and executing on port', port);
})