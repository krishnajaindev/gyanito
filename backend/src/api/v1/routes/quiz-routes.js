import express from "express";
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  submitQuiz,
} from "../../../controllers/quiz-controller.js";

const router = express.Router();

router.post("/create", createQuiz);
router.get("/", getAllQuizzes);
router.get("/:id", getQuizById);
router.post("/submit", submitQuiz);

export default router;
