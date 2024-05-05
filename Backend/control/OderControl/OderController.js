const asyncHandler = require("express-async-handler");
const Oder = require("../../model/odermodel/oderModel");
const appEr = require("../../utils/appEr");
const { networkInterfaces } = require("os");

//working
const createdOrder = asyncHandler(async (req, res, next) => {
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;
  if (cartItems && cartItems.length === 0) {
    return next(appEr("items not found", 400));
  } else {
    const newCart = cartItems.map((x) => ({
      ...x,
      product: x._id,
      _id: undefined,
    }));
    const order = new Oder({
      cartItems: newCart,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      user: req.user._id,
    });
    const CreatedOrder = await order.save();
    res.json(CreatedOrder);
  }
});
const fetechOrder = asyncHandler(async (req, res) => {
  try {
    const Orders = await Oder.find({ user: req.user._id });
    res.json(Orders);
  } catch (error) {
    return next(appEr(error.message, 404));
  }
});
const singleOder = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const singleitem = await Oder.findById(id).populate("user");
    if (singleitem) {
      return res.json(singleitem);
    } else {
      return next(appEr("no Oders yet", 404));
    }
  } catch (error) {
    return next(appEr(error.message, 404));
  }
});
const Orderpaid = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const Upadatepaid = await Oder.findByIdAndUpdate(id, {
      isPaid: true,
      paidAt: Date.now(),
      paymentResult,
    });
    res.json(Upadatepaid);
  } catch (error) {
    return next(appEr(error.message, 404));
  }
});
const OrderDeliveres = asyncHandler(async (req, res, next) => {
  try {
    const Delivery = await Oder.findByIdAndUpdate(req.params.id, {
      isDelivered: true,
      deliveredAt: Date.now(),
    });
    res.json(Delivery);
  } catch (error) {
    return next(appEr(error.message, 404));
  }
});
const FetchAllOrders = asyncHandler(async (req, res, next) => {
  try {
    const Alloders = await Oder.find().populate("user");
    res.json(Alloders);
  } catch (error) {
    return next(appEr(error.message));
  }
});
module.exports = {
  createdOrder,
  fetechOrder,
  singleOder,
  Orderpaid,
  OrderDeliveres,
  FetchAllOrders,
};
