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
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// Types
interface Question {
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

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
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

  const onSubmit = async (data: QuizFormData) => {
    try {
      await axios.post(`${import.meta.env.VITE_QUIZ_API}create`, data);
      setMessage("✅ Quiz created successfully!");
      navigate("/admindashboard");
    } catch (err) {
      console.error(err);
      setMessage("❌ Something went wrong!");
    }
  };

  return (
    <div className="py-12 px-4 max-w-5xl mx-auto">
      {/* Back Button */}
      <Button
        variant="outline"
        onClick={() => navigate("/admindashboard")}
        className="mb-4 bg-purple-800/30 border-purple-700 text-white hover:bg-purple-700/50"
      >
        ← Back to Dashboard
      </Button>

      <Card className="bg-gradient-to-br from-purple-900/40 to-purple-800/30 border border-purple-700 text-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl text-fuchsia-300">
            Create a New Quiz
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-purple-200">Quiz Title</Label>
                <Input
                  {...register("title", { required: true })}
                  placeholder="e.g., JavaScript Basics"
                  className="bg-purple-950/40 border-purple-700 text-white"
                />
                {errors.title && (
                  <p className="text-sm text-red-400 mt-1">
                    Title is required
                  </p>
                )}
              </div>

              <div>
                <Label className="text-purple-200">Duration (minutes)</Label>
                <Input
                  type="number"
                  {...register("duration", { required: true })}
                  className="bg-purple-950/40 border-purple-700 text-white"
                />
              </div>

              <div className="md:col-span-2">
                <Label className="text-purple-200">Description</Label>
                <Input
                  {...register("description")}
                  placeholder="Short description (optional)"
                  className="bg-purple-950/40 border-purple-700 text-white"
                />
              </div>
            </div>

            <div className="space-y-6">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="bg-purple-900/30 border border-purple-700 p-6 rounded-xl space-y-4"
                >
                  <Label className="text-pink-300 text-lg">
                    Question {index + 1}
                  </Label>
                  <Input
                    {...register(`questions.${index}.questionText` as const)}
                    placeholder="Enter question"
                    className="bg-purple-950/40 border-purple-700 text-white"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    {[0, 1, 2, 3].map((optIndex) => (
                      <Input
                        key={optIndex}
                        {...register(
                          `questions.${index}.options.${optIndex}` as const
                        )}
                        placeholder={`Option ${optIndex + 1}`}
                        className="bg-purple-950/40 border-purple-700 text-white"
                      />
                    ))}
                  </div>

                  <div>
                    <Label className="text-purple-200">
                      Correct Answer Index (0–3)
                    </Label>
                    <Input
                      type="number"
                      min={0}
                      max={3}
                      {...register(`questions.${index}.correctAnswerIndex` as const)}
                      className="bg-purple-950/40 border-purple-700 text-white"
                    />
                  </div>

                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                    className="mt-2"
                  >
                    Remove Question
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  append({
                    questionText: "",
                    options: ["", "", "", ""],
                    correctAnswerIndex: 0,
                  })
                }
                className="w-full text-white border-purple-700 bg-purple-800/20 hover:bg-purple-700/40"
              >
                + Add Another Question
              </Button>
            </div>

            <Button
              type="submit"
              className="w-full bg-fuchsia-600 hover:bg-fuchsia-500"
            >
              Create Quiz
            </Button>
            {message && (
              <p className="text-center text-sm mt-2 text-green-300">
                {message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateQuiz;
