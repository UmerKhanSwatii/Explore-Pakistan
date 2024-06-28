import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.ObjectId,
      ref: "service",
    },

    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "user",
    },
    seller: {
      type: mongoose.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
export default mongoose.model("orders", orderSchema);
