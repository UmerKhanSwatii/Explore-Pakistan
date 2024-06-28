import mongoose from "mongoose";
import reviewSchema from "./reviewsModel.js";
const serviceSchema = new mongoose.Schema(
  {
    profilePic: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    city: {
      type: mongoose.ObjectId,
      ref: "cities",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
    postedBy: {
      type: mongoose.ObjectId,
      ref: "user",
    },
    reviews: [reviewSchema],
    averageRating: {
      type: Number,
      default: 0,
    },
  },

  {
    timestamps: true,
  }
);
export default mongoose.model("service", serviceSchema);
