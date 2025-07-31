import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Angry } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validations/register-validation";
import type { RegisterSchemaType } from "../validations/register-validation";
import { doRegister } from "../api/user-api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// UI Theme config
const theme = {
  card: "bg-purple-900/40 border-purple-600/50 backdrop-blur-sm",
  title: "text-fuchsia-400 font-bold tracking-wider",
  description: "text-indigo-300",
  label: "text-indigo-200 font-semibold",
  input:
    "bg-purple-900/50 border-purple-700 text-gray-50 placeholder:text-purple-400/60 focus:ring-fuchsia-500 focus:border-fuchsia-500",
  button:
    "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white font-bold tracking-wide hover:from-fuchsia-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-fuchsia-800/20",
  errorText: "text-red-400 text-sm",
};

const Register = () => {
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const registerSubmit = async (userData: RegisterSchemaType) => {
    try {
      const result = await doRegister(userData);
      if (result.data.message) {
        setStatus(false);
        navigate("/login");
      } else {
        setStatus(true);
        setMessage("Unable to register...");
      }
    } catch (err: unknown) {
      setStatus(true);

      if (typeof err === "object" && err !== null && "response" in err) {
        const errorResponse = err as {
          response?: { data?: { message?: string } };
        };
        setMessage(
          errorResponse.response?.data?.message || "Something went wrong."
        );
      } else {
        setMessage("Something went wrong.");
      }

      console.error("Register Fail", err);
    }
  };

  return (
    <div className="mt-[80px]">
      <Card
        className={`w-full max-w-md mx-auto ${theme.card} shadow-2xl shadow-purple-900/50`}
      >
        <CardHeader className="text-center">
          <CardTitle className={`text-3xl ${theme.title}`}>
            REGISTER HERE
          </CardTitle>
          <CardDescription className={theme.description}>
            Join the Quiz App Universe
          </CardDescription>
        </CardHeader>

        <CardContent>
          {status && (
            <Alert variant="destructive" className="mb-4">
              <Angry />
              <AlertTitle>Register Message</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(registerSubmit)} className="space-y-5">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="name" className={theme.label}>
                Name
              </Label>
              <Input
                {...register("name")}
                type="text"
                id="name"
                placeholder="Your Name"
                className={theme.input}
              />
              {errors.name && (
                <p className={theme.errorText}>{errors.name.message}</p>
              )}
            </div>

            <div className="grid w-full items-center gap-2">
              <Label htmlFor="email" className={theme.label}>
                Email
              </Label>
              <Input
                {...register("email")}
                type="email"
                id="email"
                placeholder="your-email@quiz.com"
                className={theme.input}
              />
              {errors.email && (
                <p className={theme.errorText}>{errors.email.message}</p>
              )}
            </div>

            <div className="grid w-full items-center gap-2">
              <Label htmlFor="password" className={theme.label}>
                Password
              </Label>
              <Input
                {...register("password")}
                type="password"
                id="password"
                placeholder="••••••••••"
                className={theme.input}
              />
              {errors.password && (
                <p className={theme.errorText}>{errors.password.message}</p>
              )}
            </div>

            <div className="pt-4">
              <Button type="submit" className={`w-full ${theme.button}`}>
                Create Account
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
