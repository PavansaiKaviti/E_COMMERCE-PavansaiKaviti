const appEr = require("../utils/appEr");
const Admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return next(appEr("Restricted access denied!"));
  }
};

module.exports = Admin;
