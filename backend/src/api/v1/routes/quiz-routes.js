import express from "express";
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  submitQuiz,
  updateQuiz
} from "../../../controllers/quiz-controller.js";

const router = express.Router();

router.post("/create", createQuiz);
router.get("/", getAllQuizzes);
router.get("/:id", getQuizById);
router.post("/submit", submitQuiz);
// Add this new route to quiz-routes.js
router.put("/update/:id", updateQuiz); // New update route


export default router;
