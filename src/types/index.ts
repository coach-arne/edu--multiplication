export type TableStats = {
  correct: number
  incorrect: number
  total: number
}

export type OperationCategory = 'multiplication' | 'division'

export type CategoryStats = {
  multiplication: Record<number, TableStats>
  division: Record<number, TableStats>
}

export type UserProgress = {
  level: number
  title: string
  totalPoints: number
  xpTowardsNextLevel: number
  categoryStats: CategoryStats
}

export type Question = {
  operation: OperationCategory
  factorA: number
  factorB: number
  correctAnswer: number
  options: number[]
}

export type FeedbackState = {
  type: 'correct' | 'wrong' | 'hint' | null
  correctAnswer?: number
  pointsEarned?: number
}

export type SessionStats = {
  correct: number
  wrong: number
  hintsUsed: number
  totalQuestions: number
  totalPointsEarned: number
}
