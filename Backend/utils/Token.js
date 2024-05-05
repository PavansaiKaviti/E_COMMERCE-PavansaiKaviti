const jwt = require("jsonwebtoken");
const Token = (res, found) => {
  const token = jwt.sign({ userId: found._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  // token into  cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });
};

module.exports = Token;
