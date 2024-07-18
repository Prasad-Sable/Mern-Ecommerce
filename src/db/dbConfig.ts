import { Redis } from "ioredis";
import mongoose from "mongoose";

export const connectDB = (uri:string) => {
    mongoose
      .connect(uri, {
        dbName: "Ecommerce_App",
      })
      .then((c) => console.log(`DB Connected to ${c.connection.host}`))
      .catch((e) => console.log(e));
  };

  
  export const connectRedis = (redisURI: string) => {
    const redis = new Redis(redisURI);
  
    redis.on("connect", () => console.log("Redis Connected"));
    redis.on("error", (e) => console.log(e));
  
    return redis;
  };