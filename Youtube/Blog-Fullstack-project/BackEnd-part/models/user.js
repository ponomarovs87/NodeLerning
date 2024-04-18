import mongoose from "mongoose";

const UserShema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      require: true,
    },
    avatarUrl: String,
    reaper: {
      type: String,
      default:"userReaper"
    },
    expirationDate: {
      type: Date,
      default: () => Date.now() + 120 * 24 * 60 * 60 * 1000,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserShema);
