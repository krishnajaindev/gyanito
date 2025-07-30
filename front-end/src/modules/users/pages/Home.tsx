import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Home() {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate("/login") // navigates to the login page
  }

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-to-br from-[#2e005f] via-[#4b0082] to-[#6a0dad] text-white px-6 text-center">
      {/* Heading */}
      <h1 className="text-5xl md:text-6xl font-bold mb-6">
        Welcome to <span className="text-pink-400">Gyanito</span>
      </h1>

      {/* Description */}
      <p className="max-w-2xl text-lg text-gray-200 mb-10">
        Gyanito is your ultimate academic companion! Boost your knowledge with interactive quizzes,
        track your progress, and compete with friends on the leaderboard.
        Whether you're preparing for exams or just want to learn, Gyanito makes studying fun and effective.
      </p>

      {/* Get Started Button */}
      <Button 
        onClick={handleGetStarted}
        className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-xl text-lg shadow-lg hover:opacity-90 transition"
      >
        Get Started
      </Button>
    </section>
  )
}
