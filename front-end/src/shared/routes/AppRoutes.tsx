import { Route, Routes } from "react-router-dom";
import Home from "../../modules/users/pages/Home.tsx";
import About from "../../modules/users/pages/About.tsx";
import Leaderboard from "../../modules/users/pages/Leaderboard.tsx";
import Signup from "../../modules/users/pages/SignUp.tsx";
import Login from "../../modules/users/pages/Login.tsx";
import Dashboard from "@/modules/users/pages/Dashboard.tsx";
import AdminDashboard from "@/modules/users/pages/adminDashboard.tsx";
import CreateQuiz from "@/modules/users/pages/CretaeQuiz.tsx";
import EditQuiz from "@/modules/users/pages/EditQuiz.tsx";
import QuizPage from "@/modules/users/pages/QuizPage.tsx";
import ProtectedRoute from "../components/ProtectedRoute.tsx";
import NotFound from "@/modules/users/pages/NotFound.tsx";
import ErrorPage from "@/modules/users/pages/ErrorPage.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      
      {/* Protected User Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="/quiz/:id" element={
        <ProtectedRoute>
          <QuizPage />
        </ProtectedRoute>
      } />
      
      {/* Protected Admin Routes */}
      <Route 
        path="/admindashboard" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/create-quiz" 
        element={
          <ProtectedRoute requiredRole="admin">
            <CreateQuiz />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/edit-quiz/:id" 
        element={
          <ProtectedRoute requiredRole="admin">
            <EditQuiz />
          </ProtectedRoute>
        } 
      />
      
      {/* Error Routes */}
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;