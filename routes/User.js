const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/User");
const {
  passwordsMatch,
  isNewUser,
  hashPwd,
  doesUserExist,
  auth,
  checkPasswordsMatch,
} = require("../middlewares/User");

router.post("/signup", checkPasswordsMatch, hashPwd, UsersController.signup);
router.post("/login", doesUserExist, UsersController.login);

module.exports = router;
