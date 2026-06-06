import { useAtomValue } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { sessionStatsAtom, selectedTablesAtom, operationCategoryAtom } from '@/atoms/sessionAtom'
import AppLayout from '@/components/layout/AppLayout'
import SessionStatsCard from '@/components/game/SessionStats'
import PlayerCard from '@/components/progress/PlayerCard'
import { Button } from '@/components/ui/button'
import { getCategoryConfig } from '@/data/categories'
import { useStartSession } from '@/hooks/useStartSession'

const SessionSummaryPage = () => {
  const navigate = useNavigate()
  const stats = useAtomValue(sessionStatsAtom)
  const selectedTables = useAtomValue(selectedTablesAtom)
  const category = useAtomValue(operationCategoryAtom)
  const categoryConfig = getCategoryConfig(category)
  const startSession = useStartSession()

  const playAgain = () => {
    if (selectedTables.length === 0) {
      navigate(`/select/${category}`)
      return
    }
    startSession(category, selectedTables)
  }

  return (
    <AppLayout>
      <div className="flex flex-col gap-5 flex-1">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-amber-800">Resultaat</h1>
          <p className="text-amber-600">{categoryConfig.label} — sessie afgerond!</p>
        </div>

        <SessionStatsCard stats={stats} />

        <PlayerCard />

        <div className="flex flex-col gap-3 mt-auto">
          <Button
            size="lg"
            onClick={playAgain}
            className="w-full h-16 text-xl font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md active:scale-95 transition-transform"
          >
            Nog een ronde
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate(`/select/${category}`)}
            className="w-full h-14 text-lg font-semibold border-amber-300 text-amber-700 hover:bg-amber-50 active:scale-95 transition-transform"
          >
            Andere {categoryConfig.label.toLowerCase()} kiezen
          </Button>

          <Button
            variant="ghost"
            size="lg"
            onClick={() => navigate('/')}
            className="w-full h-12 text-base text-amber-500 hover:text-amber-700 hover:bg-amber-50 active:scale-95 transition-transform"
          >
            Terug naar start
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}

export default SessionSummaryPage
