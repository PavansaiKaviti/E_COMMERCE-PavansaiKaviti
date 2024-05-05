const asynchandler = require("express-async-handler");
const User = require("../../model/usermodel/userModel");
const appEr = require("../../utils/appEr");
const Token = require("../../utils/Token");
const bcrypt = require("bcryptjs");

//login control //!done
const LoginControl = asynchandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const finduser = (await User.findOne({ email }))
      ? await User.findOne({ email })
      : false;
    if (finduser) {
      const match = await finduser.match(password);
      if (!match) {
        return next(appEr("enter valid details "));
      }
      // token created
      Token(res, finduser);
      res.json(finduser);
    } else {
      return next(appEr("please register to login"));
    }
  } catch (error) {
    return next(appEr(error.message));
  }
});

//?register control
// forntend Backend //!done
const RegisterControl = asynchandler(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const founduser = (await User.findOne({ email }))
      ? await User.findOne({ email })
      : false;
    if (!name || !email || !password) {
      return next(appEr("all fields are required"));
    }
    if (founduser) {
      return next(appEr("user already exsist"));
    } else {
      const UserCreated = await User.create({
        name,
        email,
        password,
      });
      Token(res, UserCreated);
      res.json(UserCreated);
    }
  } catch (error) {
    return next(appEr(error.message));
  }
});
//user logout//!done
//?FD
const LogoutControl = asynchandler((req, res, next) => {
  try {
    res.clearCookie("token").json({ status: "success", user: "user Logout" });
  } catch (error) {
    return next(appEr(error.message));
  }
});
//getuserprofile //!done
const ProfileControl = asynchandler(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const UserFound = await User.findById(userId);
    res.json(UserFound);
  } catch (error) {
    return next(appEr(error.message));
  }
});
//update user profile//!done
const UpdateUserControl = asynchandler(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const UpdatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name || name,
        email: req.body.email || email,
        password: await bcrypt.hash(req.body.password || password, 10),
      },
      { new: true }
    );
    res.json(UpdatedUser);
  } catch (error) {
    return next(appEr(error.message));
  }
});
//delete user profile//!done
const DeleteUserControl = asynchandler(async (req, res, next) => {
  try {
    const userDeleted = await User.findByIdAndDelete(req.user._id);
    res.json({
      status: "success",
      user: "user deleted  ",
      data: userDeleted,
    });
  } catch (error) {
    return next(appEr(error.message));
  }
});
//get allusers admin//!done
const AllusersContron = asynchandler(async (req, res, next) => {
  try {
    const alluser = await User.find();
    res.json(alluser);
  } catch (error) {
    return next(appEr(error.message));
  }
});
//get single user admin
const SingleUserControl = asynchandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const Founduser = await User.findById(id);
    res.send(Founduser);
  } catch (error) {
    return next(appEr(error.message));
  }
});
//delete
const DeleteControl = asynchandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: "user deleted successfully" });
  } catch (error) {
    return next(appEr(error.message));
  }
});
//updateuser by admin
const UserUpdadeADMControl = asynchandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, isAdmin } = req.body;
    await User.findByIdAndUpdate(id, { name, email, isAdmin });
    res.json({ message: "user updated" });
  } catch (error) {
    return next(appEr(error.message));
  }
});

module.exports = {
  LoginControl,
  RegisterControl,
  LogoutControl,
  ProfileControl,
  UpdateUserControl,
  AllusersContron,
  SingleUserControl,
  DeleteControl,
  UserUpdadeADMControl,
  DeleteUserControl,
};
