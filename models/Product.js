import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: { type: String, length: 80, required: true },
  image: { type: String, lenght: 200, required: true },
  desc: { type: String, lenght: 200, required: true },
  prices: { type: [Number], required: true },
  extras: [
    {
      text: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
