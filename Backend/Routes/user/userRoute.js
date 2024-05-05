const express = require("express");
const userRouter = express.Router();
const {
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
} = require("../../control/usercontrol/userControl");
const Authentication = require("../../middleware/AuthenticationMiddleware");
const Admin = require("../../middleware/Admin");

// login user api
userRouter.post("/Login", LoginControl);
//register api
userRouter.post("/Register", RegisterControl);
//user logout
userRouter.post("/Logout", Authentication, LogoutControl);
//getuserprofile
userRouter.get("/Profile", Authentication, ProfileControl);
//update user profile
userRouter.put("/UpdateUser", Authentication, UpdateUserControl);
//update user profile
userRouter.delete("/DeleteUser", Authentication, DeleteUserControl);
//get allusers admin
userRouter.get("/", Authentication, Admin, AllusersContron);
//get single user admin
userRouter.get("/:id", Authentication, Admin, SingleUserControl);
//delete users admin
userRouter.delete("/:id", Authentication, Admin, DeleteControl);
//update user by id admin
userRouter.put("/:id", Authentication, Admin, UserUpdadeADMControl);

module.exports = userRouter;
