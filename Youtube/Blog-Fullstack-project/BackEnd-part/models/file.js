import mongoose from "mongoose";

const FileSchema = new mongoose.Schema(
  {
    title: {
      name: {
        type: String,
        required: true,
      },
      locationWay: {
        type: String,
        required: true,
      },
    },
    reaper: {
      type: String,
      default: "fileReaper",
      required: true,
      immutable: true,
    },
    expirationDate: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  },
  { timestamps: true }
);

export default mongoose.model("FileList", FileSchema);
