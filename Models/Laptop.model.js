import mongoose, { Schema } from "mongoose";

const Laptop_Schema = new mongoose.Schema(
       {
        name : {type: String, required:true},
        Model_number : {type: String, required:true, unique:true},
        core : {type: String, required:true},
       },
       {
        timestamps:true
       }
)

export default mongoose.model("Laptop", Laptop_Schema);