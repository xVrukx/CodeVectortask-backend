import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    model_number: { type: String, required: true, unique: true },
    category: { type: String, required: true, index: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", ProductSchema);