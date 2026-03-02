import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    },
    views: {
      type: Number,
      default: 0
    },
    duration: {
      type: String,
      required: true
    },
    videoId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);