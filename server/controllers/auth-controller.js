const { response } = require("express");
const User = require("../models/user-model");
// const bcrypt = require("bcrypt");
const home = (req, res) => {
  try {
    res.status(200).json({ message: "I am from Auth controller" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

//Login Controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      res.status(400).json({ message: "Invalid credientials" });
    }

    //give true or false value in user variable
    // const user = await bcrypt.compare(password, userExist.password);
    const user = await userExist.comparePassword(password);
    if (user) {
      res.status(200).json({
        message: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(400).json({ message: "Invalid email and password" });
    }
  } catch (error) {
    console.log("Login Controller" + error);
  }
};

/* Register controller */

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({ message: "User already exists" });
    }

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });

    //give full data
    res.status(201).json({
      message: "Registration successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const user = (req, res) => {
  const token = req.token;
  const userData = req.user;
  const userId = req.userId;
  try {
    res.status(200).json({ token, userData, userId });
  } catch (error) {
    console.log("Error from user route");
  }
};
module.exports = { home, register, login, user };
