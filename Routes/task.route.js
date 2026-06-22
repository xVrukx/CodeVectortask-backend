import { showproduct, updateproduct, addproduct } from "../Controllers/task.controller.js";
import express from "express";

export const task_router = express.Router();

task_router.get("/alldata", showproduct);
task_router.post("/add", addproduct);
task_router.post("/update", updateproduct);