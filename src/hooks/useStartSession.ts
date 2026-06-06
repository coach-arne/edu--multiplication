import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetAtom } from 'jotai'
import type { OperationCategory } from '@/types'
import {
  currentQuestionIndexAtom,
  operationCategoryAtom,
  sessionQuestionsAtom,
  sessionScoreAtom,
  sessionStatsAtom,
  streakAtom,
} from '@/atoms/sessionAtom'
import { generateSession } from '@/lib/questions'
import { QUESTIONS_PER_SESSION } from '@/data/scoring'

export const useStartSession = () => {
  const navigate = useNavigate()
  const setOperationCategory = useSetAtom(operationCategoryAtom)
  const setSessionQuestions = useSetAtom(sessionQuestionsAtom)
  const setCurrentQuestionIndex = useSetAtom(currentQuestionIndexAtom)
  const setSessionScore = useSetAtom(sessionScoreAtom)
  const setStreak = useSetAtom(streakAtom)
  const setSessionStats = useSetAtom(sessionStatsAtom)

  return useCallback(
    (category: OperationCategory, selectedTables: number[]) => {
      if (selectedTables.length === 0) return

      const questions = generateSession(category, selectedTables, QUESTIONS_PER_SESSION)

      setOperationCategory(category)
      setSessionQuestions(questions)
      setCurrentQuestionIndex(0)
      setSessionScore(0)
      setStreak(0)
      setSessionStats({
        correct: 0,
        wrong: 0,
        hintsUsed: 0,
        totalQuestions: QUESTIONS_PER_SESSION,
        totalPointsEarned: 0,
      })

      navigate('/practice')
    },
    [
      navigate,
      setOperationCategory,
      setSessionQuestions,
      setCurrentQuestionIndex,
      setSessionScore,
      setStreak,
      setSessionStats,
    ],
  )
}
