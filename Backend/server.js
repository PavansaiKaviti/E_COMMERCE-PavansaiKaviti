// creating server
const express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();
const UserRouter = require("./Routes/products/productRouter");
const connectdb = require("./config/mongoose/Mongoose.js");
const GolbalErrorHandler = require("./middleware/GlobalErrorhandler.js");
const userRouter = require("./Routes/user/userRoute.js");
const cookie_parser = require("cookie-parser");
const OderRouter = require("./Routes/Oder/OderRoute.js");
// const cors = require("cors");
//mogoose connect
connectdb();
//
//middleware
app.use(express.json());
app.use(cookie_parser());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   })
// );\
//

//routers
app.get("/", (req, res) => {
  res.json({ status: "success", operation: "server started ...." });
});
app.use("/api/products", UserRouter);
app.use("/api/User", userRouter);
app.use("/api/Order", OderRouter);
app.get("/api/config/paypal", (req, res) =>
  res.send({ client_id: process.env.PAYPAL_CLIENT_ID })
);
//

// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// if (process.env.NODE_ENV === "production") {
//   //set static folder
//   app.use(express.static(path.join(__dirname, "/frontend/build")));
//   app.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
// } else {
//   app.get("/", (req, res) => {
//     res.json({ status: "success", operation: "server started ...." });
//   });
// }
app.use(GolbalErrorHandler);

const port = 3000;
app.listen(port, (error) => {
  try {
    console.log(`server starts at port : http://localhost:${port}`);
  } catch (error) {
    console.log("error:", error);
  }
});
