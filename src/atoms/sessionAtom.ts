import { atom } from 'jotai'
import type { Question, SessionStats } from '@/types'
import { QUESTIONS_PER_SESSION } from '@/data/scoring'

export const selectedTablesAtom = atom<number[]>([])

export const sessionActiveAtom = atom<boolean>(false)

export const sessionQuestionsAtom = atom<Question[]>([])

export const currentQuestionIndexAtom = atom<number>(0)

export const currentQuestionAtom = atom<Question | null>((get) => {
  const questions = get(sessionQuestionsAtom)
  const index = get(currentQuestionIndexAtom)
  return questions[index] ?? null
})

export const sessionScoreAtom = atom<number>(0)

export const streakAtom = atom<number>(0)

export const hintUsedAtom = atom<boolean>(false)

export const sessionStatsAtom = atom<SessionStats>({
  correct: 0,
  wrong: 0,
  hintsUsed: 0,
  totalQuestions: QUESTIONS_PER_SESSION,
  totalPointsEarned: 0,
})
