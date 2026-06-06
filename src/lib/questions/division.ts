import type { Question } from '@/types'
import { generateNumericDistractors, shuffle } from '@/lib/questions/shared'

const generateDivisionDistractors = (
  correct: number,
  divisor: number,
  dividend: number,
): number[] =>
  generateNumericDistractors(correct, [
    correct - 1,
    correct + 1,
    correct - 2,
    correct + 2,
    Math.floor(dividend / (divisor + 1)),
    Math.floor(dividend / Math.max(1, divisor - 1)),
  ])

export const generateDivisionQuestion = (selectedTables: number[]): Question => {
  const divisor = selectedTables[Math.floor(Math.random() * selectedTables.length)]
  const quotient = Math.floor(Math.random() * 10) + 1
  const dividend = divisor * quotient

  const distractors = generateDivisionDistractors(quotient, divisor, dividend)
  const options = shuffle([quotient, ...distractors])

  return {
    operation: 'division',
    factorA: dividend,
    factorB: divisor,
    correctAnswer: quotient,
    options,
  }
}
