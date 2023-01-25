const bcrypt = require("bcrypt");
const e = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const hashPwd = (req, res, next) => {
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    req.body.password = hash;
    next();
  });
};

const doesUserExist = async (req, res, next) => {
  const user = await getUserByEmailModel(req.body.email);
  if (!user) {
    res.status(400).send("User with this email does not exist");
    return;
  }
  req.body.user = user;
  console.log("user exist");
  next();
};

const auth = (req, res, next) => {
  console.log("AUTH", req.cookies.token);
  // console.log('Headers', req.headers);

  if (!req.cookies.token) {
    res.status(401).send("Must have access token in the headers");
    return;
  }

  jwt.verify(req.cookies.token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send("Unauthorized");
      console.log("401 Unauthorized", req.cookies.token);
      return;
    }

    if (decoded) {
      req.body.userId = decoded.id;
      console.log("Decoded YES", decoded, req.cookies.token);
      next();
      return;
    }
  });
};

function checkPasswordsMatch(req, res, next) {
  if (req.body.password !== req.body.repassword) {
    res.status(400).send("Passwords don't match");
    return;
  }
  next();
}

module.exports = { hashPwd, doesUserExist, auth, checkPasswordsMatch };
