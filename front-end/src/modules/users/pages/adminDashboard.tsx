import { useEffect, useState } from "react";
import { getAllQuizzes, deleteQuiz } from "@/modules/users/api/quiz-api";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Quiz {
  _id: string;
  title: string;
  description: string;
}

const AdminDashboard = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const navigate = useNavigate();

  const loadQuizzes = async () => {
    const res = await getAllQuizzes();
    setQuizzes(res.data);
  };

  const handleDelete = async (id: string) => {
    await deleteQuiz(id);
    loadQuizzes();
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-white tracking-wide">
          🧠 Quiz Management
        </h1>
        <Button
          onClick={() => navigate("/admin/create-quiz")}
          className="bg-gradient-to-r from-fuchsia-700 to-purple-600 text-white hover:brightness-110"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Quiz
        </Button>
      </div>

      {quizzes.length === 0 ? (
        <div className="text-purple-300 text-center text-lg mt-20">
          No quizzes available. Start by creating one!
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="rounded-2xl p-6 bg-gradient-to-br from-purple-950/60 to-purple-900/40 border border-purple-700 text-white shadow-xl hover:shadow-2xl transition duration-300"
            >
              <h2 className="text-xl font-semibold mb-2 text-indigo-100">
                {quiz.title}
              </h2>
              <p className="text-purple-300 text-sm mb-4">{quiz.description}</p>

              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  className="flex items-center gap-2 bg-fuchsia-800/60 text-white hover:bg-fuchsia-700"
                  onClick={() => navigate(`/admin/edit-quiz/${quiz._id}`)}
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  className="flex items-center gap-2"
                  onClick={() => handleDelete(quiz._id)}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
