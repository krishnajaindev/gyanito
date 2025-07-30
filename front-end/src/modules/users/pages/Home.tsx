import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Brain, Trophy, BarChart, Users } from "lucide-react"

export default function Home() {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate("/login")
  }

  return (
    <div className="bg-to-br from-[#2e005f] via-[#4b0082] to-[#6a0dad] text-white">
      {/* HERO SECTION */}
      <section className="flex flex-col justify-center items-center text-center min-h-screen px-6 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          Welcome to <span className="text-pink-400">Gyanito</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-2xl text-lg text-gray-200 mb-10"
        >
          Your ultimate academic companion. Take interactive quizzes, compete with friends, and
          master your knowledge while having fun. Learn smarter, not harder.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-xl text-lg shadow-lg hover:opacity-90 transition"
          >
            Get Started
          </Button>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold text-pink-400 mb-12">Why Choose Gyanito?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { icon: Brain, title: "Smart Learning", desc: "AI-powered quizzes to enhance your knowledge effectively." },
            { icon: Trophy, title: "Competitive Fun", desc: "Challenge friends and climb to the top of the leaderboard." },
            { icon: BarChart, title: "Track Progress", desc: "Analyze your performance and improve with detailed stats." },
            { icon: Users, title: "Community Driven", desc: "Join a learning network and grow together with others." },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="bg-white/10 border-none rounded-2xl shadow-lg hover:bg-white/20 transition">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <feature.icon size={40} className="text-pink-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 px-6 bg-black/30 text-center">
        <h2 className="text-4xl font-bold text-pink-400 mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-5xl mx-auto">
          {["Choose a quiz", "Answer questions", "Track progress", "Compete with others"].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="bg-pink-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
                {index + 1}
              </div>
              <p className="text-gray-200">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PREVIEW SECTION */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold text-pink-400 mb-8">Preview the Experience</h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-white/10 rounded-2xl p-8 shadow-xl"
        >
          <p className="text-gray-300 text-lg mb-6">
            Here’s a glimpse of how fun learning can be. Take quizzes, unlock achievements, and keep improving!
          </p>
          <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-700 text-left">
            <p className="text-gray-100 mb-2">Q: What is the capital of France?</p>
            <ul className="text-gray-300 space-y-2">
              <li>• Berlin</li>
              <li className="text-green-400">• Paris ✅</li>
              <li>• Madrid</li>
              <li>• Rome</li>
            </ul>
          </div>
        </motion.div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-20 px-6 bg-black/40 text-center">
        <h2 className="text-4xl font-bold mb-6 text-pink-400">Start Your Learning Journey Today</h2>
        <p className="text-gray-200 mb-8 max-w-xl mx-auto">
          Join thousands of learners and make studying exciting. Your academic success is just one quiz away!
        </p>
        <Button
          onClick={handleGetStarted}
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-xl text-lg shadow-lg hover:opacity-90 transition"
        >
          Get Started Now
        </Button>
      </section>
    </div>
  )
}
