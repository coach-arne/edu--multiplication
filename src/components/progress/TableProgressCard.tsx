import type { TableStats } from '@/types'
import { Progress } from '@/components/ui/progress'

type TableProgressCardProps = {
  table: number
  stats: TableStats
  labelPrefix: string
}

const TableProgressCard = ({ table, stats, labelPrefix }: TableProgressCardProps) => {
  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0

  const getAccuracyColor = () => {
    if (accuracy >= 80) return 'text-green-600'
    if (accuracy >= 60) return 'text-amber-600'
    return 'text-red-500'
  }

  return (
    <div className="bg-white rounded-2xl border border-amber-100 p-3 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-amber-800 text-base">
          {labelPrefix} {table}
        </span>
        <span className={`font-bold text-sm ${getAccuracyColor()}`}>{accuracy}%</span>
      </div>
      <Progress value={accuracy} className="h-2 bg-amber-50" />
      <p className="text-xs text-amber-400 mt-1">
        {stats.correct}/{stats.total} goed
      </p>
    </div>
  )
}

export default TableProgressCard
