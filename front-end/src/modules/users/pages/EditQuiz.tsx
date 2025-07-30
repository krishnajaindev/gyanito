import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQuizById, updateQuiz } from "../api/quiz-api";

interface Question {
  _id?: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
}

interface QuizFormData {
  title: string;
  description: string;
  duration: number;
  questions: Question[];
}

const EditQuiz = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuizFormData>({
    defaultValues: {
      title: "",
      description: "",
      duration: 15,
      questions: [
        {
          questionText: "",
          options: ["", "", "", ""],
          correctAnswerIndex: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        if (!id) return;

        setLoading(true);
        const response = await getQuizById(id);
        const quiz: QuizFormData = response.data;

        reset({
          title: quiz.title,
          description: quiz.description,
          duration: quiz.duration,
          questions: quiz.questions.map((q: Question) => ({
            _id: q._id,
            questionText: q.questionText,
            options: q.options,
            correctAnswerIndex: q.correctAnswerIndex,
          })),
        });
      } catch (err) {
        console.error("Failed to fetch quiz:", err);
        setMessage("Failed to load quiz data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id, reset]);

  const onSubmit = async (data: QuizFormData) => {
    try {
      if (!id) return;
      await updateQuiz(id, data);
      setMessage("✅ Quiz updated successfully!");
      setTimeout(() => {
        navigate("/admindashboard");
      }, 1500);
    } catch (err) {
      console.error(err);
      setMessage("❌ Something went wrong while updating the quiz!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-xl text-white">Loading quiz data...</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <Card className="w-full max-w-4xl mx-auto bg-purple-900/30 p-4">
        <CardHeader>
          <CardTitle className="text-fuchsia-400 text-2xl">Edit Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label className="text-indigo-200">Title</Label>
              <Input {...register("title", { required: true })} placeholder="Quiz Title" />
              {errors.title && <p className="text-red-400">Title is required</p>}
            </div>
            <div>
              <Label className="text-indigo-200">Description</Label>
              <Input {...register("description")} placeholder="Quiz Description" />
            </div>
            <div>
              <Label className="text-indigo-200">Duration (minutes)</Label>
              <Input type="number" {...register("duration", { required: true })} />
            </div>

            <div className="space-y-6">
              {fields.map((field, index) => (
                <div key={field.id} className="border border-purple-600 p-4 rounded-lg bg-purple-800/30">
                  <Label className="text-pink-300">Question {index + 1}</Label>
                  <Input
                    {...register(`questions.${index}.questionText` as const)}
                    placeholder="Question Text"
                  />

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[0, 1, 2, 3].map((optIndex) => (
                      <Input
                        key={optIndex}
                        {...register(`questions.${index}.options.${optIndex}` as const)}
                        placeholder={`Option ${optIndex + 1}`}
                      />
                    ))}
                  </div>
                  <div className="mt-2">
                    <Label className="text-indigo-200">Correct Answer Index (0–3)</Label>
                    <Input
                      type="number"
                      {...register(`questions.${index}.correctAnswerIndex` as const)}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                    className="mt-2"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() =>
                  append({
                    questionText: "",
                    options: ["", "", "", ""],
                    correctAnswerIndex: 0,
                  })
                }
                className="bg-indigo-600 hover:bg-indigo-500"
              >
                Add Question
              </Button>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full bg-fuchsia-600 hover:bg-fuchsia-500">
                Update Quiz
              </Button>
            </div>
            {message && (
              <p className="text-center mt-2 text-green-300">{message}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditQuiz;
