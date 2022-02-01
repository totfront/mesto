const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UnauthorizedError = require("../errors/UnauthorizedError");

dotenv.config();

let { JWT_SECRET } = process.env;

if (!JWT_SECRET) JWT_SECRET = "super-secret-jwt";

const auth = (req, res, next) => {
  if (!req.cookies.jwt) {
    return next(
      new UnauthorizedError("Token has not found. Authorisation falied.")
    );
  }
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError("Authorisation falied."));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
