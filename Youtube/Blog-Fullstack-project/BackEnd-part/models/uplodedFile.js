import mongoose from "mongoose";

const UplodedFiles = new mongoose.Schema(
  {
    originalname: {
      type: String,
      require: true,
    },
    expirationDate: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("UplodedFiles", UplodedFiles);
