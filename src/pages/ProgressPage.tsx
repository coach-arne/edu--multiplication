import { useAtomValue } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { userProgressAtom } from '@/atoms/userProgressAtom'
import AppLayout from '@/components/layout/AppLayout'
import PlayerCard from '@/components/progress/PlayerCard'
import TableProgressCard from '@/components/progress/TableProgressCard'
import { Button } from '@/components/ui/button'

const ProgressPage = () => {
  const navigate = useNavigate()
  const progress = useAtomValue(userProgressAtom)

  const practicedTables = Object.entries(progress.tableStats)
    .map(([table, stats]) => ({ table: Number(table), stats }))
    .sort((a, b) => a.table - b.table)

  return (
    <AppLayout>
      <div className="flex flex-col gap-5 flex-1">
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
          <h1 className="text-3xl font-bold text-amber-800">Jouw Voortgang</h1>
        </div>

        <PlayerCard />

        <div>
          <h2 className="text-lg font-bold text-amber-700 mb-3">Statistieken per tafel</h2>
          {practicedTables.length === 0 ? (
            <div className="text-center py-8 text-amber-400">
              <p className="text-4xl mb-2">📚</p>
              <p className="text-base font-medium">Nog geen tafels geoefend.</p>
              <p className="text-sm">Start een sessie om te beginnen!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {practicedTables.map(({ table, stats }) => (
                <TableProgressCard key={table} table={table} stats={stats} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-auto">
          <Button
            size="lg"
            onClick={() => navigate('/select')}
            className="w-full h-16 text-xl font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md active:scale-95 transition-transform"
          >
            ⚔️ Start Oefenen
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}

export default ProgressPage
