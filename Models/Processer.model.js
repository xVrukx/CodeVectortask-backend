import mongoose, { Schema } from "mongoose";

const Processer_Schema = new mongoose.Schema(
       {
        name : {type: String, required:true},
        Model_number : {type: String, required:true, unique:true},
        core : {type: String, required:true},
       },
       {
        timestamps:true
       }
)

export default mongoose.model("Processer", Processer_Schema);