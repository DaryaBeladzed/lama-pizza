import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customer: { type: String, length: 100, required: true },
  address: { type: String, lenght: 200, required: true },
  status: { type: Number, required: true, default: 0 },
  total: {
    type: Number,
    required: true,
  },
  method: {
    type: Number,
    required: true,
  },
  products: [
    {
      title: { type: String, length: 80, required: true },
      size: { type: String, required: true },
      extras: { type: String },
    },
  ],
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
