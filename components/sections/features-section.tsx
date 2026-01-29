"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

function TypeTester() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setScale((prev) => (prev === 1 ? 1.15 : 1))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center h-full px-6 overflow-hidden">
      <motion.span
        className="font-serif text-foreground text-[clamp(1.2rem,2.3vw,2.0rem)] md:text-[clamp(1.3rem,2vw,2.1rem)] text-center leading-snug max-w-full"
        animate={{ scale }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Search Anything
      </motion.span>
    </div>
  )
}


function LayoutAnimation() {
  const [layout, setLayout] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLayout((prev) => (prev + 1) % 3)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const layouts = ["grid-cols-2 grid-rows-2", "grid-cols-3 grid-rows-1", "grid-cols-1 grid-rows-3"]

  return (
    <div className="h-full p-4 flex items-center justify-center">
      <motion.div className={`grid ${layouts[layout]} gap-2 w-full max-w-[140px]`} layout>
        {["Auto", "Smart", "Tags"].map((word) => (
          <motion.div
            key={word}
            className="bg-primary/20 rounded-md min-h-[30px] flex items-center justify-center text-sm font-medium text-foreground"
            layout
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

function SpeedIndicator() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => setProgress(100), 500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <span className="text-3xl md:text-4xl font-sans font-medium text-foreground">~2s</span>
      <span className="text-sm text-muted-foreground">Search Time</span>
      <div className="w-full max-w-[120px] h-1.5 bg-foreground/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </div>
  )
}

export function FeaturesSection() {
  return (
    <section className="bg-background px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-muted-foreground text-sm uppercase tracking-widest mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Features
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* AI Search Card */}
          <motion.div
            className="bg-secondary rounded-xl p-8 min-h-[280px] flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            data-clickable
          >
            <div className="flex-1">
              <TypeTester />
            </div>
            <div className="mt-4">
              <h3 className="font-serif text-xl text-foreground">AI Search</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Instantly find anything across your files using natural language.
              </p>
            </div>
          </motion.div>

          {/* Auto Tagging Card */}
          <motion.div
            className="bg-secondary rounded-xl p-8 min-h-[280px] flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.96 }}
            data-clickable
          >
            <div className="flex-1">
              <LayoutAnimation />
            </div>
            <div className="mt-4">
              <h3 className="font-serif text-xl text-foreground">Auto Tagging</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Automatically tags images and documents using AI vision and NLP.
              </p>
            </div>
          </motion.div>

          {/* Instant Results Card */}
          <motion.div
            className="bg-secondary rounded-xl p-8 min-h-[280px] flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.96 }}
            data-clickable
          >
            <div className="flex-1">
              <SpeedIndicator />
            </div>
            <div className="mt-4">
              <h3 className="font-serif text-xl text-foreground">Instant Results</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Get accurate results in milliseconds, even across massive datasets.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
