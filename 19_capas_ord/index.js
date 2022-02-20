const express = require("express");
const express_session = require("express-session");
const mongoStore = require("connect-mongo");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { config, db } = require("./config/index");
const ServerRouter = require("./routes/index");
const yargs = require("yargs")(process.argv.slice(2));
const compression = require("compression");
let { loggerInfo } = require("./utils/logger");


const PORT = process.env.PORT || config.port;
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
let cluster_mode = config.cluster_mode;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "public"));
app.use(express.static(path.join(__dirname, "public")));

if (cluster_mode == "true") {
  if (cluster.isMaster) {
    loggerInfo.info(`Master ${process.pid} is running`);
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit',(worker, code, signal) => {
      loggerInfo.info(`worker with pid: ${worker.process.pid} died`);
        cluster.fork();
    })


  } else {
    loggerInfo.info(`Worker ${process.pid} started`);
    app.listen(PORT, () => {
      loggerInfo.info(`Server listening on port ${PORT} and worker ${process.pid}`);
    });
  }
} else {
  app.listen(PORT, () => {
    loggerInfo.warn(`Server listening on port ${PORT}`);
  });
}

const advancedOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
app.use(
  express_session({
    store: mongoStore.create({
      mongoUrl: db.mongo_db_uri,
      mongoOptions: advancedOption,
      dbName: db.database,
      collection: "sessions",
    }),
    databaseName: db.database,
    secret: "comision",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 20 * 60 * 1000, // 20 minutes
      httpOnly: true,
      secure: false,
    },
  })
);

app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/login", (req, res, next) => {
  res.sendFile(__dirname + "/public/login.html");
});
app.get("/register", (req, res, next) => {
  res.sendFile(__dirname + "/public/register.html");
});


ServerRouter(app);
