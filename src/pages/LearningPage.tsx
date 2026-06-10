import { motion } from 'framer-motion'
import Flashcard from '../../components/quiz/Flashcard'
import MultipleChoice from '../../components/quiz/MultipleChoice'
import { BELGIUM_PROVINCES, EUROPE_COUNTRIES } from '../../data/geography'
import { useState } from 'react'

export default function LearningPage() {
  const [learningMode, setLearningMode] = useState<'none' | 'belgium' | 'europe'>('none')
  const [cardIndex, setCardIndex] = useState(0)

  if (learningMode === 'none') {
    return (
      <div className="space-y-6">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="section-title"
        >
          📚 Leermodus
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setLearningMode('belgium')}
            className="card bg-gradient-to-br from-yellow-600/20 to-yellow-700/20 hover:from-yellow-600/30 hover:to-yellow-700/30 border border-yellow-500/30 p-6 text-left"
          >
            <h3 className="text-xl font-bold text-white mb-2">🇧🇪 België Flashcards</h3>
            <p className="text-slate-300">Leer stap voor stap alle Belgische provincies</p>
            <p className="text-sm text-slate-400 mt-2">{BELGIUM_PROVINCES.length} kaarten</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setLearningMode('europe')}
            className="card bg-gradient-to-br from-pink-600/20 to-pink-700/20 hover:from-pink-600/30 hover:to-pink-700/30 border border-pink-500/30 p-6 text-left"
          >
            <h3 className="text-xl font-bold text-white mb-2">🗺️ Europa Flashcards</h3>
            <p className="text-slate-300">Leer alle Europese landen en hoofdsteden</p>
            <p className="text-sm text-slate-400 mt-2">{EUROPE_COUNTRIES.length} kaarten</p>
          </motion.button>
        </div>
      </div>
    )
  }

  if (learningMode === 'belgium') {
    const province = BELGIUM_PROVINCES[cardIndex]
    return (
      <div className="space-y-6">
        <motion.button
          onClick={() => setLearningMode('none')}
          className="btn-ghost"
        >
          ← Terug
        </motion.button>

        <div>
          <h2 className="text-2xl font-bold text-white mb-2">🇧🇪 Belgische Provincies</h2>
          <p className="text-slate-400">
            Kaart {cardIndex + 1} van {BELGIUM_PROVINCES.length}
          </p>
        </div>

        <Flashcard front={province.name} back={province.capital} />

        <div className="flex gap-3">
          <button
            onClick={() => setCardIndex(Math.max(0, cardIndex - 1))}
            disabled={cardIndex === 0}
            className="btn-secondary flex-1"
          >
            ← Vorige
          </button>
          <button
            onClick={() => setCardIndex(cardIndex + 1)}
            disabled={cardIndex === BELGIUM_PROVINCES.length - 1}
            className="btn-primary flex-1"
          >
            Volgende →
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full h-2 bg-slate-800 rounded-full overflow-hidden"
        >
          <motion.div
            animate={{ width: `${((cardIndex + 1) / BELGIUM_PROVINCES.length) * 100}%` }}
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
          />
        </motion.div>
      </div>
    )
  }

  if (learningMode === 'europe') {
    const country = EUROPE_COUNTRIES[cardIndex]
    return (
      <div className="space-y-6">
        <motion.button
          onClick={() => setLearningMode('none')}
          className="btn-ghost"
        >
          ← Terug
        </motion.button>

        <div>
          <h2 className="text-2xl font-bold text-white mb-2">🗺️ Europese Landen</h2>
          <p className="text-slate-400">
            Kaart {cardIndex + 1} van {EUROPE_COUNTRIES.length}
          </p>
        </div>

        <Flashcard front={country.name} back={country.capital} />

        <div className="flex gap-3">
          <button
            onClick={() => setCardIndex(Math.max(0, cardIndex - 1))}
            disabled={cardIndex === 0}
            className="btn-secondary flex-1"
          >
            ← Vorige
          </button>
          <button
            onClick={() => setCardIndex(cardIndex + 1)}
            disabled={cardIndex === EUROPE_COUNTRIES.length - 1}
            className="btn-primary flex-1"
          >
            Volgende →
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full h-2 bg-slate-800 rounded-full overflow-hidden"
        >
          <motion.div
            animate={{ width: `${((cardIndex + 1) / EUROPE_COUNTRIES.length) * 100}%` }}
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          />
        </motion.div>
      </div>
    )
  }

  return null
}
