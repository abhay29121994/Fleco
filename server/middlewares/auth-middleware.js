const User = require("../models/user-model");
const jwt = require("jsonwebtoken");

//? Here we check the token provided by user

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not provided" });
  }

  const finalToken = token.replace("Bearer ", "").trim();
  try {
    isVerifiedToken = jwt.verify(finalToken, process.env.JWT_SECRET_KEY);

    //!This query is written because we want latest data here
    const userData = await User.findOne({
      email: isVerifiedToken.email,
    }).select({ password: 0 });
    
    req.token = token;
    req.user = userData;
    req.userId = userData.id;

    // res.status(200).json(userData);
    next();
  } catch (error) {
    res.status(400).json({message:"Hello",error});
  }
  //   res.status(200).json({ token, finalToken });
};

module.exports = authMiddleware;
