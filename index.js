const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");

//DB Setup
mongoose.connect(
  "mongodb://localhost:auth/auth",
  { useNewUrlParser: true }
);

//App setup
app.use(morgan("combine"));
app.use(bodyParser({ type: "*/*" }));
router(app);

//Server setup
const port = process.env.PORT || 8000; //Check whether environment variable had setup PORT value
const server = http.createServer(app);
server.listen(port);
console.log(`Server listening on port: ${port}`);