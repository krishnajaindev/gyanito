import { Card, CardContent } from "@/components/ui/card"

export default function About() {
  return (
    <section className="min-h-screen bg-to-br from-[#2e005f] via-[#4b0082] to-[#6a0dad] text-white flex flex-col items-center px-6 py-16">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-pink-400 mb-6">
        About Gyanito
      </h1>

      {/* Description */}
      <p className="max-w-2xl text-center text-lg text-gray-200 mb-12">
        Gyanito is an interactive quiz platform designed to make learning fun and competitive. 
        Test your knowledge, challenge friends, and climb the leaderboard while improving your skills.
      </p>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl w-full">
        <Card className="bg-white/5 border-none rounded-2xl shadow-lg hover:bg-white/10 transition">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold text-pink-400 mb-2">⚡ Quick Quizzes</h3>
            <p className="text-gray-300 text-sm">
              Take short quizzes and improve your knowledge efficiently.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-none rounded-2xl shadow-lg hover:bg-white/10 transition">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold text-pink-400 mb-2">🏆 Leaderboard</h3>
            <p className="text-gray-300 text-sm">
              Compete with friends and top players to secure your rank.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-none rounded-2xl shadow-lg hover:bg-white/10 transition">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold text-pink-400 mb-2">🎯 Multiple Categories</h3>
            <p className="text-gray-300 text-sm">
              Explore quizzes in different subjects and areas of interest.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-none rounded-2xl shadow-lg hover:bg-white/10 transition">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold text-pink-400 mb-2">📊 Progress Tracking</h3>
            <p className="text-gray-300 text-sm">
              Track your learning progress and celebrate your growth.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
