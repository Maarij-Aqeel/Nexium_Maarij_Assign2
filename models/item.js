// Database Schema
import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "Untitled Blog",
  },

  fullText: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Item || mongoose.model("Item", ItemSchema);
