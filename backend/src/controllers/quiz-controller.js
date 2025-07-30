import { QuizModel } from "../models/quiz-model.js";
import { QuestionModel } from "../models/question-model.js";

// Create a new quiz
export const createQuiz = async (req, res) => {
  try {
    const { title, description, questions, duration } = req.body; // 👈 include duration

    const questionDocs = await QuestionModel.insertMany(questions);
    const questionIds = questionDocs.map(q => q._id);

    const quiz = await QuizModel.create({
      title,
      description,
      duration, // 👈 include duration here
      questions: questionIds
    });

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

// Update quiz
export const updateQuiz = async (req, res) => {
  try {
    const { title, description, duration, questions } = req.body;

    const updatedQuestionIds = [];

    for (const q of questions) {
      if (q._id) {
        // Existing question: update it
        const updated = await QuestionModel.findByIdAndUpdate(q._id, {
          questionText: q.questionText,
          options: q.options,
          correctAnswerIndex: q.correctAnswerIndex,
        }, { new: true });
        if (updated) updatedQuestionIds.push(updated._id);
      } else {
        // New question: create it
        const created = await QuestionModel.create({
          questionText: q.questionText,
          options: q.options,
          correctAnswerIndex: q.correctAnswerIndex,
        });
        updatedQuestionIds.push(created._id);
      }
    }

    // Update quiz with updated question IDs
    const updatedQuiz = await QuizModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        duration,
        questions: updatedQuestionIds,
      },
      { new: true }
    );

    if (!updatedQuiz) return res.status(404).json({ message: "Quiz not found" });

    res.status(200).json({ message: "Quiz updated", quiz: updatedQuiz });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await QuizModel.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // Delete all questions in the quiz
    await QuestionModel.deleteMany({ _id: { $in: quiz.questions } });

    // Delete the quiz itself
    await QuizModel.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Quiz and its questions deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
