const serverless = require("serverless-http");

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

const bodyParser = require("body-parser");

const compression = require("compression");
const helmet = require("helmet");
const Error = require("./exceptions/error");

const app = express();

const routerReg = require("./routeReg");
// const { shopify } = require("./utils/shopify");

var nodeEnv = process.env.NODE_ENV || "development";

// PORT definition
var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

global.ROOTPATH = __dirname;
global.UPLOAD_DIR = __dirname + "/fileUploads";
global.ENV = nodeEnv;
global.PORT = port;
console.log("ENV: ", nodeEnv);

if (nodeEnv !== "development") {
  // use compression
  app.use(compression());

  // use helmet
  app.use(helmet());
}

app.use(express.json());

// use the cors
app.use(cors());

// enable the body parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

if (process.env.DEBUGGING) {
  app.use((req, res, next) => {
    console.log(
      JSON.stringify({
        k: "DEBUGGING",
        h: req.headers,
        b: req.body,
        u: req.originalUrl,
        t: new Date().toISOString(),
      })
    );
    next();
  });
}

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.all("/", function (req, res, next) {
  res.json({
    success: true,
    date: new Date(),
    version: "v18",
    env: nodeEnv,
  });
});

app.get("/favicon.ico", (req, res) => {
  res.sendStatus(404);
});

// route definitions
routerReg(app);

// 404 custom errors
app.use((req, res) => {
  Error.res(res, new NotFoundError(req.originalUrl + " not Found"));
});

app.keepAliveTimeout = 61 * 1000;
app.headersTimeout = 65 * 1000;

app.on("error", onError);

process.on("uncaughtException", function (err) {
  console.log("uncaughtException", err);
});

process.on("unhandledRejection", function (err) {
  console.log("unhandledRejection", err);
});

app.use((err, req, res, next) => {
  Error.res(res, err);
});

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

if (nodeEnv === "development") {
  app.listen(port);
  console.log(`[Start Server]: Started on port ${port}`);
}

module.exports.handler = serverless(app);
