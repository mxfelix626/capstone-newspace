"use strict";
/** Express app for NewSpace. */
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const postsRoutes = require("./routes/posts");
const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const express = require("express");
const cors = require("cors");
const app = express();
app.options('*', cors());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "https://capstone-client.herokuapp.com");
//   res.header("Access-Control-Allow-Origin", "https://capstone-client.herokuapp.com");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// const options = {
//   "origin": "*",
//   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//   "preflightContinue": false,
//   "optionsSuccessStatus": 204
// }
// app.options('/users/edit', function (req, res) {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
//   res.setHeader('Access-Control-Allow-Methods', '*');
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   res.end();
// });
// const allowCrossDomain = function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', "*");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, PATCH');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// }
//app.use(allowCrossDomain);

const morgan = require("morgan");

//app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);



/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
