import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validations/register-validation";
import { doLogin } from "../api/user-api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/shared/context/AuthContext";
import AuthNotification from "../../../shared/components/AuthNotification";

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
  const [alertType, setAlertType] = useState<"error" | "success" | "">("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login: authLogin, redirectToUserDashboard, isAuthenticated, user } = useAuth();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      redirectToUserDashboard();
    }
  }, [isAuthenticated, user, redirectToUserDashboard]);

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

  const onSubmit = async (userData: { email: string; password: string }) => {
    setIsLoading(true);
    setAlertType("");
    setMessage("");
    
    try {
      const result = await doLogin(userData);
      
      // Check if login was successful (status is true or message exists with no false status)
      if (result.data.status === true || (result.data.message && result.data.status !== false)) {
        // Show success message first
        setAlertType("success");
        setMessage(result.data.message || "Login successful! Redirecting...");
        
        // Short delay for user feedback before redirect
        setTimeout(() => {
          // Use the AuthContext login function instead of directly setting localStorage
          authLogin(result.data.token, result.data.role, result.data.userId);
          
          // Use redirectToUserDashboard instead of manual navigation
          // The redirection will happen automatically via the useEffect
        }, 1000);
      } else {
        // Login failed with a specific message from the server
        setAlertType("error");
        setMessage(result.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login failed", err);
      setAlertType("error");
      
      // Extract error message from response if available
      if (err && typeof err === "object" && "response" in err) {
        const errorResponse = err as { response?: { data?: { message?: string } } };
        setMessage(errorResponse.response?.data?.message || "Login failed. Please try again.");
      } else {
        setMessage("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
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
          <AuthNotification 
            type={alertType}
            message={message}
            onClose={() => setMessage('')}
          />

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
              <Button 
                className={`w-full ${theme.button}`} 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Let's Go!"}
              </Button>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-indigo-300">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-fuchsia-400 hover:underline">
                    Register here
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
