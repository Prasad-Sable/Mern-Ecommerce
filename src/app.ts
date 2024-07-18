import express from "express"
import {config} from "dotenv"
import {connectDB, connectRedis} from "./db/dbConfig.js"
import { errorMiddleware } from "./middlewares/error.middleware.js"
import NodeCache from "node-cache"
import morgan from "morgan"
import cors from "cors"
import Stripe from "stripe"
import { v2 as cloudinary } from "cloudinary";

config({
    path:"./.env"
})

const port = process.env.PORT || 7000
const mongoURI = process.env.MONGO_URI || "";
const stripeKey = process.env.STRIPE_KEY || ""
const redisURI = process.env.REDIS_URI || "";
export const redisTTL = process.env.REDIS_TTL || 60 * 60 * 4;

console.log(typeof(mongoURI))
connectDB(mongoURI)
export const redis = connectRedis(redisURI);

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });

export const stripe = new Stripe(stripeKey)

const app = express()
app.use(express.json())
app.use(morgan("dev"))
app.use(
    cors({
      origin: [process.env.CLIENT_URL!],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

import userRoute from "./routes/user.route.js"
import productRoute from "./routes/product.route.js"
import orderRoute from "./routes/order.route.js"
import paymentRoute from "./routes/payment.route.js"
import dashBoardRoute from "./routes/stats.route.js"



app.use("/api/v1/users",userRoute)
app.use("/api/v1/products",productRoute)
app.use("/api/v1/orders",orderRoute)
app.use("/api/v1/payments",paymentRoute)
app.use("/api/v1/dashboard",dashBoardRoute)

app.use("/uploads",express.static("uploads"))
app.use(errorMiddleware)



app.listen(port,()=>{
    console.log(`app is running on ${port} port`)
})