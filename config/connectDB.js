import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connection_string = process.env.MONGO_STRING;
export const connect = async() => {
    try {
        console.log(connection_string)
    const con = await mongoose.connect(connection_string);
    console.log("DB is connected");
}
catch(e) {
    console.log("Error occored:-" + e);
};
};