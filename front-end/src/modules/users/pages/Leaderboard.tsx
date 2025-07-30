import { motion } from "framer-motion"

export default function Leaderboard() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-to-br from-[#2e005f] via-[#4b0082] to-[#6a0dad] text-white px-6 text-center">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold mb-6"
      >
        🏆 Leaderboard
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="max-w-2xl text-lg text-gray-200 mb-10"
      >
        The Leaderboard will allow you to track your progress, compete with friends, and see where you rank 
        among the top learners. Earn points by completing quizzes and climb your way to the top!
      </motion.p>

      {/* Coming Soon Animated Badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120, delay: 0.6 }}
        className="bg-pink-500/20 border border-pink-500 px-8 py-4 rounded-2xl shadow-lg"
      >
        <motion.h2
          animate={{ 
            opacity: [1, 0.5, 1], 
            scale: [1, 1.05, 1] 
          }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-2xl md:text-3xl font-semibold text-pink-400"
        >
          🚧 Coming Soon!
        </motion.h2>
      </motion.div>

      {/* Extra Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-12 max-w-xl text-gray-300 text-base"
      >
        <p>
          This section will include:
        </p>
        <ul className="mt-4 text-left list-disc list-inside">
          <li>🌟 Real-time rankings</li>
          <li>🏅 Weekly and monthly challenges</li>
          <li>📊 Detailed performance stats</li>
          <li>🤝 Friend leaderboard comparison</li>
        </ul>
      </motion.div>
    </section>
  )
}
