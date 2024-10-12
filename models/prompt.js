import mongoose, { Schema, model, models } from "mongoose";
import User from "./user"; // Import User to ensure it's registered

const promptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User", // Refers to the User model
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

const Prompt = models.Prompt || model("Prompt", promptSchema);

export default Prompt;
