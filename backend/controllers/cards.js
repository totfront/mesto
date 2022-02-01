const Card = require("../models/card");
const NotFoundError = require("../errors/NotFoundError");
const InvalidError = require("../errors/InvalidError");
const ServerError = require("../errors/ServerError");
const ForbiddenError = require("../errors/ForbiddenError");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (cards.length !== 0) {
        return res.send(cards);
      }
      return res.send({ data: "No cards" });
    })
    .catch((err) => next(new ServerError(`${err.message} - Default error`)));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(
          new InvalidError("passed wrong data into card creating methods")
        );
      }
      return next(new ServerError(`${err.message} - Default error`));
    });
};

module.exports.deleteCard = (req, res, next) => {
  const owner = req.cookies._id;
  Card.findOne({ _id: req.params.cardId })
    .orFail(new Error("NotFound"))
    .then((card) => {
      if (card.owner !== owner) {
        return next(new ForbiddenError("You can not delete this cards"));
      }
      return Card.deleteOne({ _id: req.params.cardId })
        .then((foundCard) => res.send({ data: foundCard, status: "deleted" }))
        .catch((err) =>
          next(new ServerError(`${err.message} - Default error`))
        );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new InvalidError("Invalid id"));
      }
      if (err.message === "NotFound") {
        return next(new NotFoundError("There is not card with this ID"));
      }
      return next(new ServerError(`${err.message} - Default error`));
    });
};

module.exports.addLikeToCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // add _id in a array, if it is not there
    { new: true }
  )
    .orFail(new Error("NotFound"))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new InvalidError("Invalid id"));
      }
      if (err.message === "NotFound") {
        return next(new NotFoundError("There is not card with this ID"));
      }
      return next(new ServerError(`${err.message} - Default error`));
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // delete _id from an array
    { new: true }
  )
    .orFail(new Error("NotFound"))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new InvalidError("Invalid id"));
      }
      if (err.message === "NotFound") {
        return next(new NotFoundError("there is not card with this ID"));
      }
      return next(new ServerError(`${err.message} - Default error`));
    });
};
