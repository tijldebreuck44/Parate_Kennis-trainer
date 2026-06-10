import { motion } from 'framer-motion'
import MultipleChoice from '../../components/quiz/MultipleChoice'
import FillBlanks from '../../components/quiz/FillBlanks'
import Flashcard from '../../components/quiz/Flashcard'
import { EUROPE_COUNTRIES, EUROPE_RIVERS, EUROPE_MOUNTAINS } from '../../data/geography'
import { useState } from 'react'

export default function EuropePage() {
  const [quizType, setQuizType] = useState<'none' | 'capitals' | 'flashcards' | 'rivers' | 'mountains'>('none')
  const [questionIndex, setQuestionIndex] = useState(0)

  const generateCapitalQuiz = () => {
    const country = EUROPE_COUNTRIES[Math.floor(Math.random() * EUROPE_COUNTRIES.length)]
    const options = [
      country.capital,
      ...EUROPE_COUNTRIES.filter((c) => c.id !== country.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((c) => c.capital),
    ].sort(() => 0.5 - Math.random())

    return {
      id: country.id,
      question: `Wat is de hoofdstad van ${country.name}?`,
      correctAnswer: country.capital,
      options,
    }
  }

  const generateRiverQuiz = () => {
    const river = EUROPE_RIVERS[Math.floor(Math.random() * EUROPE_RIVERS.length)]
    const countries = EUROPE_COUNTRIES.slice(0, 4)

    return {
      id: river.id,
      question: `Door welke landen stroomt de ${river.name}?`,
      correctAnswer: river.name,
      options: [river.name, ...EUROPE_RIVERS.slice(0, 3).map((r) => r.name)].sort(() => 0.5 - Math.random()),
    }
  }

  if (quizType === 'none') {
    return (
      <div className="space-y-6">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="section-title"
        >
          🗺️ Europa
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setQuizType('capitals')}
            className="card bg-gradient-to-br from-blue-600/20 to-blue-700/20 hover:from-blue-600/30 hover:to-blue-700/30 border border-blue-500/30 p-6 text-left"
          >
            <h3 className="text-xl font-bold text-white mb-2">🏛️ Hoofdsteden</h3>
            <p className="text-slate-300">Kun jij alle Europese hoofdsteden herkennen?</p>
            <p className="text-sm text-slate-400 mt-2">{EUROPE_COUNTRIES.length} landen</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setQuizType('flashcards')}
            className="card bg-gradient-to-br from-purple-600/20 to-purple-700/20 hover:from-purple-600/30 hover:to-purple-700/30 border border-purple-500/30 p-6 text-left"
          >
            <h3 className="text-xl font-bold text-white mb-2">🎴 Flashcards</h3>
            <p className="text-slate-300">Leer landen en hoofdsteden met flashcards</p>
            <p className="text-sm text-slate-400 mt-2">{EUROPE_COUNTRIES.length} kaarten</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setQuizType('rivers')}
            className="card bg-gradient-to-br from-cyan-600/20 to-cyan-700/20 hover:from-cyan-600/30 hover:to-cyan-700/30 border border-cyan-500/30 p-6 text-left"
          >
            <h3 className="text-xl font-bold text-white mb-2">🌊 Rivieren</h3>
            <p className="text-slate-300">Leer de belangrijkste Europese rivieren</p>
            <p className="text-sm text-slate-400 mt-2">{EUROPE_RIVERS.length} rivieren</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setQuizType('mountains')}
            className="card bg-gradient-to-br from-orange-600/20 to-orange-700/20 hover:from-orange-600/30 hover:to-orange-700/30 border border-orange-500/30 p-6 text-left"
          >
            <h3 className="text-xl font-bold text-white mb-2">⛰️ Gebergten</h3>
            <p className="text-slate-300">Herken de grote bergketens</p>
            <p className="text-sm text-slate-400 mt-2">{EUROPE_MOUNTAINS.length} gebergten</p>
          </motion.button>
        </div>
      </div>
    )
  }

  if (quizType === 'capitals') {
    const question = generateCapitalQuiz()
    return (
      <div className="space-y-6">
        <motion.button
          onClick={() => setQuizType('none')}
          className="btn-ghost"
        >
          ← Terug
        </motion.button>
        <MultipleChoice
          question={question}
          onAnswer={(correct) => {
            if (correct) {
              setTimeout(() => setQuestionIndex(questionIndex + 1), 1500)
            }
          }}
        />
      </div>
    )
  }

  if (quizType === 'flashcards') {
    const country = EUROPE_COUNTRIES[questionIndex % EUROPE_COUNTRIES.length]
    return (
      <div className="space-y-6">
        <motion.button
          onClick={() => setQuizType('none')}
          className="btn-ghost"
        >
          ← Terug
        </motion.button>
        <Flashcard
          front={country.name}
          back={country.capital}
          onFlip={() => {}}
        />
        <div className="flex gap-3">
          <button
            onClick={() => setQuestionIndex(Math.max(0, questionIndex - 1))}
            className="btn-secondary flex-1"
          >
            ← Vorige
          </button>
          <button
            onClick={() => setQuestionIndex(questionIndex + 1)}
            className="btn-primary flex-1"
          >
            Volgende →
          </button>
        </div>
        <p className="text-center text-slate-400">
          {(questionIndex % EUROPE_COUNTRIES.length) + 1} / {EUROPE_COUNTRIES.length}
        </p>
      </div>
    )
  }

  return (
    <div className="text-center py-12">
      <h2 className="section-title mb-4">{quizType}</h2>
      <p className="text-slate-400">In desenvolvimento...</p>
    </div>
  )
}
