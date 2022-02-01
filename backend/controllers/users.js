const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user");
const NotFoundError = require("../errors/NotFoundError");
const InvalidError = require("../errors/InvalidError");
const ConflictError = require("../errors/ConflictError");
const ForbiddenError = require("../errors/ForbiddenError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const ServerError = require("../errors/ServerError");

dotenv.config();

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => {
      if (user.length !== 0) {
        return res.send({ data: user });
      }
      return res.send({ data: "No users" });
    })
    .catch((err) => next(new ServerError(`${err.message} - Default error`)));
};
module.exports.getUser = (req, res, next) => {
  User.find({ _id: req.params.id })
    .orFail(new Error("noUser"))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === "noUser") {
        return next(new NotFoundError("The user has not been found"));
      }
      if (err.name === "CastError") {
        return next(new InvalidError("Indavlid id"));
      }
      return next(new ServerError(`${err.message} - Default error`));
    });
};
module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  if (validator.isEmail(email)) {
    User.findOne({ email }).then((user) => {
      if (user) {
        return next(
          new ConflictError("There has been created the user with this id")
        );
      }
      return bcrypt.hash(password, 10).then((hash) => {
        User.create({
          name,
          about,
          avatar,
          email,
          password: hash,
        })
          .then((userData) => res.send({ data: userData }))
          .catch((err) => {
            if (err.name === "ValidationError") {
              return next(new InvalidError("Passed wrong user data"));
            }
            return next(new ServerError(`${err.message} - Default error`));
          });
      });
    });
  } else {
    res.send("invalid email");
  }
};
module.exports.setCurrentUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    { _id: req.user._id },
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(new Error("notFound"))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new InvalidError("invalid id"));
      }
      if (err.name === "ValidationError") {
        return next(new InvalidError("Invalid user data"));
      }
      if (err.message === "notFound") {
        return next(new NotFoundError("The user has not been found"));
      }
      return next(new ServerError(`${err.message} - Default error`));
    });
};
module.exports.setUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    { _id: req.user._id },
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(new Error("notFound"))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new InvalidError("invalid id"));
      }
      if (err.name === "ValidationError") {
        return next(new InvalidError("Invalid data"));
      }
      if (err.message === "notFound") {
        return next(new NotFoundError("The user has not been found"));
      }
      return next(new ServerError(`${err.message} - Default error`));
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new InvalidError("Email or passwords can not be empty"));
  }

  return User.findOne({ email })
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError("Wrong username or password"));
      }
      return bcrypt.compare(password, user.password, (error, isValid) => {
        if (error) {
          return next(
            new ForbiddenError(`${error} + Permission is not allowed`)
          );
        }
        if (!isValid) {
          return next(new UnauthorizedError("Wrong password or username"));
        }

        let secretKey = process.env.JWT_SECRET;

        if (process.env.JWT_SECRET) {
          secretKey = process.env.JWT_SECRET;
        } else {
          secretKey = "super-secret-jwt";
        }
        const token = jwt.sign({ _id: user._id }, secretKey, {
          expiresIn: "7d",
        });
        res.cookie("_id", user._id, {
          httpOnly: true,
          sameSite: false,
        });
        // Send JWT in cookie to predict XSS-atack
        res.cookie("jwt", token, {
          httpOnly: true,
          sameSite: false,
          secure: true,
        });
        return res.status(200).send({ user, verifiedToken: true });
      });
    })
    .catch((err) => next(new UnauthorizedError(err.message)));
};

module.exports.logout = (req, res, next) => {
  if (!req.cookies.jwt) {
    next(new NotFoundError("You can not delete empty token"));
  }
  return (
    res
      // Send JWT in cookie to predict XSS-atack
      .cookie("jwt", "", {
        httpOnly: true,
        sameSite: true,
        secure: true,
      })
      .status(200)
      .send({ message: "Token deleted" })
  );
};

module.exports.getCurrentUser = (req, res, next) => {
  const id = req.cookies._id;
  User.find({ _id: id })
    .orFail(new Error("noUser"))
    .then((users) => res.send(users[0]))
    .catch((err) => {
      if (err.message === "noUser") {
        return next(new NotFoundError("There is not user in data base"));
      }
      if (err.name === "CastError") {
        return next(new InvalidError("invalid id"));
      }
      return next(new ServerError(`${err.message} - Default error`));
    });
};
