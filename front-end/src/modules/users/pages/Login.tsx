import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validations/register-validation";
import { doLogin } from "../api/user-api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { Angry } from "lucide-react";
import { useNavigate } from "react-router-dom";

const theme = {
  card: "bg-purple-900/40 border-purple-600/50 backdrop-blur-sm",
  title: "text-fuchsia-400 font-bold tracking-wider",
  description: "text-indigo-300",
  label: "text-indigo-200 font-semibold",
  input: "bg-purple-900/50 border-purple-700 text-gray-50 placeholder:text-purple-400/60 focus:ring-fuchsia-500 focus:border-fuchsia-500",
  button:
    "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white font-bold tracking-wide hover:from-fuchsia-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-fuchsia-800/20",
};

const Login = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (userObject: any) => {
    try {
      const result = await doLogin(userObject);
      console.log("Result ", result);

      if (result.data.message) {
        localStorage.setItem("role", result.data.role);
        localStorage.setItem("token", result.data.token);
        setMessage(result.data.message);
        if(result.data.role == "admin"){
            navigate("/admindashboard");
        }

        // ✅ Navigate to User Dashboard
        else{

            navigate("/dashboard");
        }
      } else {
        setMessage(result.data.message);
      }
    } catch (err) {
      console.log("Login failed", err);
      setMessage("Login failed. Please try again.");
    }
  };

  return (
    <div className="mt-[80px]">
      <Card className={`w-full max-w-md mx-auto ${theme.card} shadow-2xl shadow-purple-900/50`}>
        <CardHeader className="text-center">
          <CardTitle className={`text-3xl ${theme.title}`}>LOGIN ZONE</CardTitle>
          <CardDescription className={theme.description}>Enter the Quiz Universe</CardDescription>
        </CardHeader>
        <CardContent>
          {message && (
            <Alert>
              <AlertTitle className="flex items-center gap-1">
                <Angry className="w-4 h-4" /> Message
              </AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <form className="space-y-6 pt-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="email" className={theme.label}>
                Email
              </Label>
              <Input
                type="email"
                id="email"
                {...register("email")}
                placeholder="your-email@quiz.com"
                className={theme.input}
              />
              {errors.email && (
                <span className="text-red-400 text-sm">{errors.email.message}</span>
              )}
            </div>

            <div className="grid w-full items-center gap-2">
              <Label htmlFor="password" className={theme.label}>
                Password
              </Label>
              <Input
                type="password"
                id="password"
                {...register("password")}
                placeholder="••••••••••"
                className={theme.input}
              />
              {errors.password && (
                <span className="text-red-400 text-sm">{errors.password.message}</span>
              )}
            </div>

            <div className="pt-4">
              <Button className={`w-full ${theme.button}`} type="submit">
                Let&apos;s Go!
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
