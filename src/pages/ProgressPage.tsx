import { useAtomValue } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { userProgressAtom } from '@/atoms/userProgressAtom'
import AppLayout from '@/components/layout/AppLayout'
import PlayerCard from '@/components/progress/PlayerCard'
import TableProgressCard from '@/components/progress/TableProgressCard'
import { Button } from '@/components/ui/button'
import { getCategoryConfig, OPERATION_CATEGORIES } from '@/data/categories'
import type { OperationCategory, TableStats } from '@/types'

const getPracticedTables = (stats: Record<number, TableStats>) =>
  Object.entries(stats)
    .map(([table, tableStats]) => ({ table: Number(table), stats: tableStats }))
    .sort((a, b) => a.table - b.table)

type CategorySectionProps = {
  category: OperationCategory
  stats: Record<number, TableStats>
  onStart: () => void
}

const CategorySection = ({ category, stats, onStart }: CategorySectionProps) => {
  const config = getCategoryConfig(category)
  const practicedTables = getPracticedTables(stats)

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-amber-700">{config.label}</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={onStart}
          className="border-amber-300 text-amber-700 hover:bg-amber-50"
        >
          Oefenen
        </Button>
      </div>

      {practicedTables.length === 0 ? (
        <div className="text-center py-6 text-amber-400 bg-white/50 rounded-2xl border border-amber-100">
          <p className="text-base font-medium">Nog geen {config.label.toLowerCase()} geoefend.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {practicedTables.map(({ table, stats: tableStats }) => (
            <TableProgressCard
              key={`${category}-${table}`}
              table={table}
              stats={tableStats}
              labelPrefix={config.tableLabelPrefix}
            />
          ))}
        </div>
      )}
    </section>
  )
}

const ProgressPage = () => {
  const navigate = useNavigate()
  const progress = useAtomValue(userProgressAtom)

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

        <div className="space-y-6">
          {OPERATION_CATEGORIES.map((category) => (
            <CategorySection
              key={category}
              category={category}
              stats={progress.categoryStats[category]}
              onStart={() => navigate(`/select/${category}`)}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  )
}

export default ProgressPage
