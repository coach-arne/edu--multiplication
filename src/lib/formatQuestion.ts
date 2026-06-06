import type { Question } from '@/types'
import { getCategoryConfig } from '@/data/categories'

export type QuestionDisplay = {
  left: number
  operator: string
  right: number
  expression: string
}

export const formatQuestionDisplay = (question: Question): QuestionDisplay => {
  const config = getCategoryConfig(question.operation)

  return {
    left: question.factorA,
    operator: config.symbol,
    right: question.factorB,
    expression: `${question.factorA} ${config.symbol} ${question.factorB} = ?`,
  }
}

export const getHintMatrixFactors = (question: Question) => {
  if (question.operation === 'division') {
    return {
      row: question.factorB,
      col: question.correctAnswer,
      subtitle: `${question.factorA} ÷ ${question.factorB} = ${question.correctAnswer} · ${question.factorB} × ${question.correctAnswer} = ${question.factorA}`,
    }
  }

  return {
    row: question.factorA,
    col: question.factorB,
    subtitle: `${question.factorA} × ${question.factorB} = ${question.correctAnswer}`,
  }
}

export const getTableKeyForQuestion = (question: Question): number =>
  question.operation === 'division' ? question.factorB : question.factorA
