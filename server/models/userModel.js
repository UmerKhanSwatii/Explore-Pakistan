import mongoose from "mongoose";

//user Schema

const userSchema = new mongoose.Schema(
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
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    city: {
      type: String,
    },
    phone: {
      type: Number,
    },
    notification: {
      type: Array,
      default: [],
    },
    seenNotification: {
      type: Array,
      default: [],
    },
    serviceRequest: [
      {
        type: mongoose.ObjectId,
        ref: "service",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user", userSchema);
