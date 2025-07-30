import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { getQuizById, submitQuiz } from "../api/quiz-api";
import { Button } from "@/components/ui/button";

// Types
interface Question {
  _id: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  duration: number;
  questions: Question[];
}

interface AnswerPayload {
  questionId: string;
  selectedIndex: number;
}

const QuizPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;

    getQuizById(id)
      .then((res) => {
        const quizData: Quiz = res.data;
        setQuiz(quizData);
        setTimeLeft(quizData.duration * 60); // minutes to seconds
      })
      .catch((error) => {
        console.error("Error fetching quiz:", error);
      });
  }, [id]);

  const handleOptionSelect = (questionId: string, selectedIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedIndex,
    }));
  };

  const handleSubmit = useCallback(async () => {
    if (!quiz) return;

    const answersToSubmit: AnswerPayload[] =
      Object.keys(answers).length === 0
        ? quiz.questions.map((q) => ({
            questionId: q._id,
            selectedIndex: -1,
          }))
        : Object.entries(answers).map(([questionId, selectedIndex]) => ({
            questionId,
            selectedIndex,
          }));

    try {
      const res = await submitQuiz({ answers: answersToSubmit });
      setScore(res.data.score);
      setSubmitted(true);
    } catch (err) {
      console.error("Submit error", err);
    }
  }, [quiz, answers]);

  useEffect(() => {
    if (!quiz) return;
    if (timeLeft <= 0 && !submitted) handleSubmit();

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted, quiz, handleSubmit]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!quiz)
    return (
      <p className="text-center text-purple-100 mt-10 text-lg">
        Loading quiz...
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-white">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-fuchsia-400 tracking-wide">
          {quiz.title}
        </h1>
        <p className="text-indigo-200 text-lg mt-1">{quiz.description}</p>
        <p className="mt-3 text-yellow-300 font-semibold text-xl bg-purple-900/40 inline-block px-4 py-1 rounded-full shadow-md">
          Time Left: {formatTime(timeLeft)}
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {quiz.questions.map((q, index) => (
          <div
            key={q._id}
            className="bg-purple-900/40 p-5 rounded-xl border border-purple-700 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-indigo-100 mb-4">
              Q{index + 1}: {q.questionText}
            </h3>
            <div className="grid gap-3">
              {q.options.map((opt, i) => (
                <label
                  key={i}
                  className={`flex items-center gap-3 cursor-pointer px-4 py-2 rounded-md transition-colors duration-200 ${
                    answers[q._id] === i
                      ? "bg-fuchsia-600/60 text-white"
                      : "bg-purple-800/40 hover:bg-purple-700/40 text-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name={q._id}
                    checked={answers[q._id] === i}
                    onChange={() => handleOptionSelect(q._id, i)}
                    className="accent-fuchsia-500"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Submit */}
      {!submitted && (
        <Button
          onClick={handleSubmit}
          className="w-full mt-8 bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 text-white font-bold py-3 text-lg rounded-lg shadow-md transition-all duration-300"
        >
          Submit Quiz
        </Button>
      )}

      {/* Result */}
      {submitted && score !== null && (
        <div className="mt-8 text-center">
          <p className="text-2xl font-bold text-green-400 mb-4">
            You scored: {score} / {quiz.questions.length}
          </p>
          <Button
            onClick={() => navigate("/dashboard")}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Dashboard
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
