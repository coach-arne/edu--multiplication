import type { OperationCategory, Question } from '@/types'
import { QUESTIONS_PER_SESSION } from '@/data/scoring'
import { generateMultiplicationQuestion } from '@/lib/questions/multiplication'
import { generateDivisionQuestion } from '@/lib/questions/division'

const generateQuestion = (category: OperationCategory, selectedTables: number[]): Question => {
  if (category === 'division') {
    return generateDivisionQuestion(selectedTables)
  }
  return generateMultiplicationQuestion(selectedTables)
}

export const generateSession = (
  category: OperationCategory,
  selectedTables: number[],
  count: number = QUESTIONS_PER_SESSION,
): Question[] => {
  return Array.from({ length: count }, () => generateQuestion(category, selectedTables))
}
