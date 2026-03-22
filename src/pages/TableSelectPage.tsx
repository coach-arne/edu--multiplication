import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { selectedTablesAtom, sessionQuestionsAtom, currentQuestionIndexAtom, sessionScoreAtom, streakAtom, sessionStatsAtom } from '@/atoms/sessionAtom'
import AppLayout from '@/components/layout/AppLayout'
import TableSelector from '@/components/tables/TableSelector'
import { Button } from '@/components/ui/button'
import { generateSession } from '@/lib/questions'
import { QUESTIONS_PER_SESSION } from '@/data/scoring'

const TableSelectPage = () => {
  const navigate = useNavigate()
  const [selectedTables, setSelectedTables] = useAtom(selectedTablesAtom)
  const [, setSessionQuestions] = useAtom(sessionQuestionsAtom)
  const [, setCurrentQuestionIndex] = useAtom(currentQuestionIndexAtom)
  const [, setSessionScore] = useAtom(sessionScoreAtom)
  const [, setStreak] = useAtom(streakAtom)
  const [, setSessionStats] = useAtom(sessionStatsAtom)

  const toggleTable = (table: number) => {
    setSelectedTables((prev) =>
      prev.includes(table) ? prev.filter((t) => t !== table) : [...prev, table],
    )
  }

  const selectAll = () => {
    setSelectedTables(Array.from({ length: 10 }, (_, i) => i + 1))
  }

  const clearAll = () => {
    setSelectedTables([])
  }

  const startSession = () => {
    if (selectedTables.length === 0) return

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

  const allSelected = selectedTables.length === 10

  return (
    <AppLayout>
      <div className="flex flex-col gap-6 flex-1">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-amber-600 hover:text-amber-800 hover:bg-amber-100 -ml-2"
          >
            ← Terug
          </Button>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-amber-800">Kies je tafels</h1>
          <p className="text-amber-600 mt-1">Selecteer welke tafels je wilt oefenen</p>
        </div>

        <TableSelector selectedTables={selectedTables} onToggle={toggleTable} />

        <div className="flex gap-3 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={allSelected ? clearAll : selectAll}
            className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50"
          >
            {allSelected ? 'Deselecteer alles' : 'Selecteer alles'}
          </Button>
          <div className="flex-1 flex items-center justify-center">
            <span className="text-amber-600 text-sm font-medium">
              {selectedTables.length} tafel{selectedTables.length !== 1 ? 's' : ''} geselecteerd
            </span>
          </div>
        </div>

        <div className="mt-auto">
          <Button
            size="lg"
            onClick={startSession}
            disabled={selectedTables.length === 0}
            className="w-full h-20 text-2xl font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-lg disabled:opacity-40 active:scale-95 transition-transform"
          >
            ⚔️ Start ({QUESTIONS_PER_SESSION} vragen)
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}

export default TableSelectPage
