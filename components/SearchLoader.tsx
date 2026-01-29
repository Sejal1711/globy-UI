import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function SearchLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      {/* Animated search icon with orbiting dots */}
      <div className="relative w-24 h-24">
        {/* Center search icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <svg
            className="w-12 h-12 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" strokeWidth="2" />
            <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* Orbiting dots */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-primary rounded-full"
            style={{
              top: "50%",
              left: "50%",
              marginTop: "-6px",
              marginLeft: "-6px",
            }}
            animate={{
              rotate: [i * 90, i * 90 + 360],
              scale: [1, 1.5, 1],
            }}
            transition={{
              rotate: {
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1],
              },
            }}
          >
            <motion.div
              className="w-full h-full bg-primary rounded-full"
              style={{
                transformOrigin: "center",
                x: 36,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Animated text with typing effect */}
      <div className="text-center space-y-2">
        <motion.div
          className="flex items-center justify-center space-x-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-lg font-medium text-gray-700">Searching</span>
          <motion.span
            className="flex space-x-1"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </motion.span>
        </motion.div>

        {/* Fun loading messages that rotate */}
        <AnimatedMessages />
      </div>

      {/* Image card shimmer preview */}
      <div className="grid grid-cols-4 gap-3 w-full max-w-2xl px-4">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="relative h-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.2,
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function AnimatedMessages() {
  const messages = [
    "🔍 Scanning the galaxy...",
    "🎨 Finding perfect matches...",
    "✨ Discovering amazing images...",
    "🚀 Almost there...",
  ]

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.p
      key={index}
      className="text-sm text-gray-500"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {messages[index]}
    </motion.p>
  )
}


