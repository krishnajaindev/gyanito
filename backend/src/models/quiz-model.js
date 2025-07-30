import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
}, { timestamps: true });

export const QuizModel = mongoose.model("Quiz", quizSchema);
