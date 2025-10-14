import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: { type: [String], default: ["User"] },
    avatar: { type: String, default: null },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    date_of_birth: { type: Date, required: true },
    about: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
