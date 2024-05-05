const express = require("express");
const {
  createdOrder,
  fetechOrder,
  singleOder,
  Orderpaid,
  OrderDeliveres,
  FetchAllOrders,
} = require("../../control/OderControl/OderController");
const Authentication = require("../../middleware/AuthenticationMiddleware");
const Admin = require("../../middleware/Admin");

const OderRouter = express.Router();

//create Post new Oder PRIVATE && Get all oders
OderRouter.route("/")
  .post(Authentication, createdOrder)
  .get(Authentication, Admin, FetchAllOrders);

//check Oder details PRIVATE
OderRouter.get("/myOrders", Authentication, fetechOrder);

// get oder my Id Private
OderRouter.get("/myOrders/:id", Authentication, singleOder);
//  Update order paid Private
OderRouter.put("/myOrders/:id/paid", Authentication, Admin, Orderpaid);
//  Update order delivered
OderRouter.put(
  "/myOrders/:id/delivered",
  Authentication,
  Admin,
  OrderDeliveres
);

module.exports = OderRouter;
