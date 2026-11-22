import dns from "node:dns";

dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);

import express from 'express';
import dotenv from "dotenv";
import {connectDB} from "./lib/db.js";

import authRoute from "./route/authRoute.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use("/api/auth", authRoute);

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Running on port ${PORT}`);
})

