import mongoose from "mongoose";
import { nanoid } from "nanoid";
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  linkId: {
    type: String,
    required: true,
    unique: true,
    default: () => nanoid(10),
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
