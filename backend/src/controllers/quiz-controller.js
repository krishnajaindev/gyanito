import { QuizModel } from "../models/quiz-model.js";
import { QuestionModel } from "../models/question-model.js";

// Create a new quiz
export const createQuiz = async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    const questionDocs = await QuestionModel.insertMany(questions);
    const questionIds = questionDocs.map(q => q._id);

    const quiz = await QuizModel.create({ title, description, questions: questionIds });

    res.status(201).json({ message: "Quiz created", quiz });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await QuizModel.find().select("title description");
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a quiz with questions
export const getQuizById = async (req, res) => {
  try {
    const quiz = await QuizModel.findById(req.params.id).populate("questions", "-correctAnswerIndex");
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.status(200).json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Submit answers and get score
export const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body; // [{questionId, selectedIndex}]
    let score = 0;

    for (const { questionId, selectedIndex } of answers) {
      const question = await QuestionModel.findById(questionId);
      if (question && question.correctAnswerIndex === selectedIndex) {
        score++;
      }
    }

    res.status(200).json({ message: "Quiz submitted", score, total: answers.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
