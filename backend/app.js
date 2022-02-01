const express = require("express");
const { celebrate, errors, Joi } = require("celebrate");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorsHandler = require("./middlewares/errorsHandler");
const NotFoundError = require("./errors/NotFoundError");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const auth = require("./middlewares/auth");

dotenv.config();

const { PORT = 3001 } = process.env;

const app = express();

app.use(cookieParser());

mongoose.connect("mongodb://localhost:27017/mesto");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(helmet());

const options = {
  origin: [
    `http://localhost:${PORT}`,
    "http://localhost:3000",
    "https://totfront.nomoredomains.rocks",
    "http://totfront.nomoredomains.rocks",
    "https://github.com/totfront/totfront",
    "http://github.com/totfront/totfront",
  ],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ["Content-Type", "Origin", "Authorization"],
  credentials: true,
};

app.use(cors(options));

app.use(requestLogger);

// Crash-test
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server is going to crash");
  }, 0);
});
app.use(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  require("./routes/signin")
);
// Crash-test
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server is going to crash");
  }, 0);
});
app.use(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string(),
    }),
  }),
  require("./routes/signup")
);

app.use(auth);

app.use("/users", require("./routes/users"));
app.use("/cards", require("./routes/cards"));

app.use("*", (req, res, next) =>
  next(new NotFoundError("Requested source is not found"))
);

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);
app.listen(PORT);
