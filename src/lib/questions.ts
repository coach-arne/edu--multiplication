import type { Question } from '@/types'
import { QUESTIONS_PER_SESSION } from '@/data/scoring'

const shuffle = <T>(array: T[]): T[] => {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const generateDistractors = (correct: number, factorA: number, factorB: number): number[] => {
  const distractors = new Set<number>()

  const candidates = [
    factorA * (factorB - 1),
    factorA * (factorB + 1),
    (factorA - 1) * factorB,
    (factorA + 1) * factorB,
    factorA * factorB + factorA,
    factorA * factorB - factorA,
    factorA * factorB + factorB,
    factorA * factorB - factorB,
  ]

  for (const c of candidates) {
    if (c > 0 && c !== correct) {
      distractors.add(c)
    }
    if (distractors.size >= 3) break
  }

  let offset = 2
  while (distractors.size < 3) {
    const candidate = correct + offset
    if (candidate !== correct) distractors.add(candidate)
    if (distractors.size < 3) {
      const candidate2 = correct - offset
      if (candidate2 > 0 && candidate2 !== correct) distractors.add(candidate2)
    }
    offset++
  }

  return [...distractors].slice(0, 3)
}

export const generateQuestion = (selectedTables: number[]): Question => {
  const factorA = selectedTables[Math.floor(Math.random() * selectedTables.length)]
  const factorB = Math.floor(Math.random() * 10) + 1
  const correctAnswer = factorA * factorB

  const distractors = generateDistractors(correctAnswer, factorA, factorB)
  const options = shuffle([correctAnswer, ...distractors])

  return { factorA, factorB, correctAnswer, options }
}

export const generateSession = (
  selectedTables: number[],
  count: number = QUESTIONS_PER_SESSION,
): Question[] => {
  return Array.from({ length: count }, () => generateQuestion(selectedTables))
}
