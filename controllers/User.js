const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { addUserModel } = require("../models/User");

const signup = async (req, res) => {
  const { name, email, password, age,gender,photo } = req.body;
  try {
    const newUser = {
      name,
      age,
      gender,                                                                 
      email,
      password,
      photo
    };
    const userId = await addUserModel(newUser);
    if(userId){
      res.send({ ok: true , message: "signup success" });
    }
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
};

const login = async (req, res) => {
  const { password, user } = req.body;
  try {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.log("here")
        res.status(500).send(err);
      } else if (!result) {
        console.log("here too")
        res.status(400).send("Incorrect Password");
      } else {
        console.log("here as well")
        const token = jwt.sign(
          { id: user.id, name: user.name, admin: user.isAdmin },
          process.env.TOKEN_SECRET,
          { expiresIn: "1h" }
        );

        res.cookie("token", token, {
          maxAge: 860000000,
          httpOnly: true,
        });
        console.log("token works")
        res.send({
          ok: true,
          userId: user.id,
          userEmail: user.email,
          name: user.name,
          token: token,
        });
        console.log(token);
      }
    });
  } catch (err) {
    res.status(500).send("There was a problem");
  }
};

module.exports = { signup, login };
