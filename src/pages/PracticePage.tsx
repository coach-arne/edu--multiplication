import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  currentQuestionAtom,
  currentQuestionIndexAtom,
  sessionQuestionsAtom,
  sessionScoreAtom,
  streakAtom,
  hintUsedAtom,
  sessionStatsAtom,
} from '@/atoms/sessionAtom'
import { userProgressAtom } from '@/atoms/userProgressAtom'
import { feedbackAtom, showHintAtom, showLevelUpAtom, newLevelAtom } from '@/atoms/uiAtom'
import AppLayout from '@/components/layout/AppLayout'
import QuestionCard from '@/components/game/QuestionCard'
import AnswerGrid from '@/components/game/AnswerGrid'
import SessionProgressBar from '@/components/game/SessionProgressBar'
import FeedbackBanner from '@/components/game/FeedbackBanner'
import HintMatrix from '@/components/tables/HintMatrix'
import LevelUpOverlay from '@/components/progress/LevelUpOverlay'
import { Button } from '@/components/ui/button'
import { calculatePoints, applyXpGain } from '@/lib/scoring'
import { QUESTIONS_PER_SESSION } from '@/data/scoring'

const PracticePage = () => {
  const navigate = useNavigate()

  const question = useAtomValue(currentQuestionAtom)
  const questions = useAtomValue(sessionQuestionsAtom)
  const [questionIndex, setQuestionIndex] = useAtom(currentQuestionIndexAtom)
  const [sessionScore, setSessionScore] = useAtom(sessionScoreAtom)
  const [streak, setStreak] = useAtom(streakAtom)
  const [hintUsed, setHintUsed] = useAtom(hintUsedAtom)
  const [sessionStats, setSessionStats] = useAtom(sessionStatsAtom)
  const [userProgress, setUserProgress] = useAtom(userProgressAtom)
  const [feedback, setFeedback] = useAtom(feedbackAtom)
  const setShowHint = useSetAtom(showHintAtom)
  const showHint = useAtomValue(showHintAtom)
  const [showLevelUp, setShowLevelUp] = useAtom(showLevelUpAtom)
  const setNewLevel = useSetAtom(newLevelAtom)
  const newLevel = useAtomValue(newLevelAtom)

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)

  useEffect(() => {
    if (questions.length === 0) {
      navigate('/')
    }
  }, [questions, navigate])

  const resetQuestionState = useCallback(() => {
    setSelectedAnswer(null)
    setAnswered(false)
    setHintUsed(false)
    setFeedback({ type: null })
  }, [setHintUsed, setFeedback])

  const handleAnswer = useCallback(
    (value: number) => {
      if (answered || !question) return

      const correct = value === question.correctAnswer
      const points = calculatePoints(correct, hintUsed, streak)

      setSelectedAnswer(value)
      setAnswered(true)

      const newStreak = correct ? streak + 1 : 0
      setStreak(newStreak)

      if (correct) {
        setFeedback({ type: 'correct', pointsEarned: points })
      } else {
        setFeedback({ type: 'wrong', correctAnswer: question.correctAnswer })
      }

      setSessionScore((prev) => prev + points)

      const newStats = {
        correct: sessionStats.correct + (correct ? 1 : 0),
        wrong: sessionStats.wrong + (correct ? 0 : 1),
        hintsUsed: sessionStats.hintsUsed + (hintUsed ? 1 : 0),
        totalQuestions: QUESTIONS_PER_SESSION,
        totalPointsEarned: sessionStats.totalPointsEarned + points,
      }
      setSessionStats(newStats)

      const result = applyXpGain(userProgress, points)
      const updatedTableStats = { ...userProgress.tableStats }

      if (question) {
        const tableKey = question.factorA
        const existing = updatedTableStats[tableKey] ?? { correct: 0, incorrect: 0, total: 0 }
        updatedTableStats[tableKey] = {
          correct: existing.correct + (correct ? 1 : 0),
          incorrect: existing.incorrect + (correct ? 0 : 1),
          total: existing.total + 1,
        }
      }

      setUserProgress({
        level: result.newLevel,
        title: result.newTitle,
        totalPoints: userProgress.totalPoints + points,
        xpTowardsNextLevel: result.newXp,
        tableStats: updatedTableStats,
      })

      if (result.didLevelUp) {
        setNewLevel(result.newLevel)
        setTimeout(() => setShowLevelUp(true), 600)
      }
    },
    [answered, question, hintUsed, streak, sessionStats, userProgress, setStreak, setFeedback, setSessionScore, setSessionStats, setUserProgress, setNewLevel, setShowLevelUp],
  )

  const handleNext = () => {
    const nextIndex = questionIndex + 1
    if (nextIndex >= QUESTIONS_PER_SESSION) {
      navigate('/summary')
    } else {
      resetQuestionState()
      setQuestionIndex(nextIndex)
    }
  }

  const handleHint = () => {
    if (!hintUsed) {
      setHintUsed(true)
      setFeedback({ type: 'hint' })
    }
    setShowHint(true)
  }

  const handleLevelUpDismiss = () => {
    setShowLevelUp(false)
    if (questionIndex + 1 >= QUESTIONS_PER_SESSION) {
      navigate('/summary')
    }
  }

  if (!question) return null

  return (
    <AppLayout>
      <div className="flex flex-col gap-5 flex-1">
        <SessionProgressBar
          current={questionIndex + 1}
          total={QUESTIONS_PER_SESSION}
          score={sessionScore}
          streak={streak}
        />

        <QuestionCard question={question} />

        <FeedbackBanner feedback={feedback} />

        <AnswerGrid
          question={question}
          selectedAnswer={selectedAnswer}
          onAnswer={handleAnswer}
        />

        <div className="flex gap-3 mt-auto">
          {!answered ? (
            <Button
              variant="outline"
              size="lg"
              onClick={handleHint}
              className="flex-1 h-14 text-base font-semibold border-amber-300 text-amber-600 hover:bg-amber-50 active:scale-95 transition-transform"
            >
              {hintUsed ? '📋 Toon matrix' : '💡 Hint gebruiken'}
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={handleNext}
              className="flex-1 h-14 text-xl font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md active:scale-95 transition-transform"
            >
              {questionIndex + 1 >= QUESTIONS_PER_SESSION ? '🏁 Bekijk resultaat' : 'Volgende →'}
            </Button>
          )}
        </div>
      </div>

      {showHint && question && (
        <HintMatrix
          factorA={question.factorA}
          factorB={question.factorB}
          onClose={() => setShowHint(false)}
        />
      )}

      {showLevelUp && (
        <LevelUpOverlay level={newLevel} onDismiss={handleLevelUpDismiss} />
      )}
    </AppLayout>
  )
}

export default PracticePage
