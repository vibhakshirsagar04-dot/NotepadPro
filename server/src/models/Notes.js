import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    category: {
      type: String,
      enum: ["personal", "work", "study", "important"],
      default: "personal"
    },
    color: {
      type: String,
      enum: ["yellow", "blue", "green", "pink","purple", "orange"],
      default: "yellow"
    }
  },
  { timestamps: true }
);

noteSchema.index({ user: 1, createdAt: -1 });

const Note = mongoose.model("Note", noteSchema);
export default Note;
