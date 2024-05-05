const User = require("../model/usermodel/userModel");
const appEr = require("../utils/appEr");
const jwt = require("jsonwebtoken");

const Authentication = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(userId).select("-password");
    next();
  } else {
    return res.json({ satus: "fail", user: "login first" });
  }
};
module.exports = Authentication;
