import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  profilePic: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
});
export default mongoose.model("category", categorySchema);
