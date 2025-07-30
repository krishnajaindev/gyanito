import { useEffect, useState } from "react";
import { getAllQuizzes } from "../api/quiz-api";
import { useNavigate } from "react-router-dom";
import { QuizCard } from "./QuizCard";
import { FileText } from "lucide-react";

// ✅ Add proper interface for quizzes
interface Quiz {
  _id: string;
  title: string;
  duration: number;
}

const UserDashboard = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const navigate = useNavigate();

useEffect(() => {
  const fetchQuizzes = async () => {
    const res = await getAllQuizzes();
    console.log("Fetched quizzes:", res.data); // 🔍 check what's inside
    setQuizzes(res.data);
  };
  fetchQuizzes();
}, []);


  return (
    <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {quizzes.map((quiz) => (
        <div key={quiz._id} onClick={() => navigate(`/quiz/${quiz._id}`)}>
          <QuizCard
            name={quiz.title}
            duration={quiz.duration} // ✅ pass number not string
            Icon={FileText}
          />
        </div>
      ))}
    </div>
  );
};

export default UserDashboard;
