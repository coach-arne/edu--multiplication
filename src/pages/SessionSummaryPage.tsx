import { useAtomValue } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { sessionStatsAtom, selectedTablesAtom } from '@/atoms/sessionAtom'
import AppLayout from '@/components/layout/AppLayout'
import SessionStatsCard from '@/components/game/SessionStats'
import PlayerCard from '@/components/progress/PlayerCard'
import { Button } from '@/components/ui/button'
import { generateSession } from '@/lib/questions'
import { useSetAtom, useAtom } from 'jotai'
import { sessionQuestionsAtom, currentQuestionIndexAtom, sessionScoreAtom, streakAtom } from '@/atoms/sessionAtom'
import { QUESTIONS_PER_SESSION } from '@/data/scoring'

const SessionSummaryPage = () => {
  const navigate = useNavigate()
  const stats = useAtomValue(sessionStatsAtom)
  const selectedTables = useAtomValue(selectedTablesAtom)
  const setSessionQuestions = useSetAtom(sessionQuestionsAtom)
  const [, setCurrentQuestionIndex] = useAtom(currentQuestionIndexAtom)
  const [, setSessionScore] = useAtom(sessionScoreAtom)
  const [, setStreak] = useAtom(streakAtom)
  const [, setSessionStats] = useAtom(sessionStatsAtom)

  const playAgain = () => {
    if (selectedTables.length === 0) {
      navigate('/select')
      return
    }
    const questions = generateSession(selectedTables, QUESTIONS_PER_SESSION)
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
  }

  return (
    <AppLayout>
      <div className="flex flex-col gap-5 flex-1">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-amber-800">Resultaat</h1>
          <p className="text-amber-600">Sessie afgerond!</p>
        </div>

        <SessionStatsCard stats={stats} />

        <PlayerCard />

        <div className="flex flex-col gap-3 mt-auto">
          <Button
            size="lg"
            onClick={playAgain}
            className="w-full h-16 text-xl font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md active:scale-95 transition-transform"
          >
            🔄 Nog een ronde
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/select')}
            className="w-full h-14 text-lg font-semibold border-amber-300 text-amber-700 hover:bg-amber-50 active:scale-95 transition-transform"
          >
            📚 Andere tafels kiezen
          </Button>

          <Button
            variant="ghost"
            size="lg"
            onClick={() => navigate('/')}
            className="w-full h-12 text-base text-amber-500 hover:text-amber-700 hover:bg-amber-50 active:scale-95 transition-transform"
          >
            🏠 Terug naar start
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}

export default SessionSummaryPage
