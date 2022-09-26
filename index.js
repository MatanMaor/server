const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const productRouter = require("./Routers/productRouter");
const reviewRouter = require("./Routers/reviewRouters");
const userRouter = require("./Routers/userRouter");
const authRouter = require("./Routers/authRouther");
const orderRouter = require("./Routers/ordersRouther");

const app = express();

app.use(express.json());
app.use(cookieParser()); // create req.cookie

app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/review", reviewRouter);
app.use("/user", userRouter);
app.use("/order", orderRouter);

dotenv.config({ path: ".env" });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to mongo"))
  .catch((err) => console.log(err));

const port = process.env.PORT;
const url = process.env.SERVER_URL;

app.listen(port, url, () => {
  console.log(`listening on ${url}:${port}`);
});
