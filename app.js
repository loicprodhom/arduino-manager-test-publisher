var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Activating the MQTT Browserified bundle for the Express app
app.use(express.static(path.dirname(require.resolve("mosca")) + "/public"));

//Starting the publishers
let RelayPublisher = require("./script/RelayPublisher.js");
RelayPublisher.init();
RelayPublisher.connect();
RelayPublisher.publish();
RelayPublisher.subscribe();

let LCDPublisher = require("./script/LCDPublisher.js");
LCDPublisher.init();
LCDPublisher.connect();
LCDPublisher.publish();
LCDPublisher.subscribe();

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
