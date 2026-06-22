import {connect} from "./config/connectDB.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { task_router } from "./Routes/task.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json("connection build succesfully");
});

app.use("/api", task_router);

const server = async() => {
    try{
        console.log("running databased....");
        await connect();
        console.log("databased is live");
    } catch(e) {
        console.log("error occored while streaming db" + e);
    }
    try {
        console.log("running server....");
        await app.listen(PORT, console.log("server is live"));
    } catch (e) {
        console.log("error occored while streamin server" + e)
    }
};
server();