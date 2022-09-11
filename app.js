var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const authMiddleware = require("./auth-middleware");

var app = express();
var cors = require("cors");
app.use(cors());

app.use("/", authMiddleware);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.use("/api/v1/verify", require("./routes/verifyRoute"));
app.use("/api/v1/users", require("./routes/userRoute"));

app.use("/api/v1/tweets",require("./routes/tweetsRoute"));

app.use("/api/v1/followers",require("./routes/followersRoute"))

app.use("/api/v1/search",require("./routes/searchRoute"))
app.use("/api/v1/like",require("./routes/likeRoute"))

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
