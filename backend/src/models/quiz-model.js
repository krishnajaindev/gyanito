// ✅ Step 1: Add "duration" field to quiz model (in minutes)

import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  duration: { type: Number, required: true }, // <-- New field added for quiz time limit (e.g., 15 for 15 minutes)
}, { timestamps: true });

export const QuizModel = mongoose.model("Quiz", quizSchema);
