import type { Question } from '@/types'
import { generateNumericDistractors, shuffle } from '@/lib/questions/shared'

const generateMultiplicationDistractors = (
  correct: number,
  factorA: number,
  factorB: number,
): number[] =>
  generateNumericDistractors(correct, [
    factorA * (factorB - 1),
    factorA * (factorB + 1),
    (factorA - 1) * factorB,
    (factorA + 1) * factorB,
    factorA * factorB + factorA,
    factorA * factorB - factorA,
    factorA * factorB + factorB,
    factorA * factorB - factorB,
  ])

export const generateMultiplicationQuestion = (selectedTables: number[]): Question => {
  const factorA = selectedTables[Math.floor(Math.random() * selectedTables.length)]
  const factorB = Math.floor(Math.random() * 10) + 1
  const correctAnswer = factorA * factorB

  const distractors = generateMultiplicationDistractors(correctAnswer, factorA, factorB)
  const options = shuffle([correctAnswer, ...distractors])

  return {
    operation: 'multiplication',
    factorA,
    factorB,
    correctAnswer,
    options,
  }
}
