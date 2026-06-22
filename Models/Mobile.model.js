import mongoose, { Schema } from "mongoose";

const Mobile_Schema = new mongoose.Schema(
       {
        name : {type: String, required:true},
        Model_number : {type: String, required:true, unique:true},
       },
       {
        timestamps:true
       }
)

export default mongoose.model("Mobile", Mobile_Schema);