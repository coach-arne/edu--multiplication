import type { SessionStats } from '@/types'
import { Card, CardContent } from '@/components/ui/card'

type SessionStatsProps = {
  stats: SessionStats
}

const SessionStatsCard = ({ stats }: SessionStatsProps) => {
  const accuracy =
    stats.totalQuestions > 0
      ? Math.round((stats.correct / stats.totalQuestions) * 100)
      : 0

  const getRating = () => {
    if (accuracy === 100) return { emoji: '🏆', label: 'Perfecte score!' }
    if (accuracy >= 80) return { emoji: '⭐', label: 'Uitstekend!' }
    if (accuracy >= 60) return { emoji: '👍', label: 'Goed gedaan!' }
    return { emoji: '💪', label: 'Blijf oefenen!' }
  }

  const rating = getRating()

  return (
    <Card className="w-full bg-white/90 border-amber-200 shadow-md">
      <CardContent className="pt-6 pb-5 px-5">
        <div className="text-center mb-5">
          <div className="text-5xl mb-2">{rating.emoji}</div>
          <h2 className="text-2xl font-bold text-amber-800">{rating.label}</h2>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center bg-green-50 rounded-2xl p-3 border border-green-100">
            <p className="text-2xl font-bold text-green-600">{stats.correct}</p>
            <p className="text-xs text-green-500 font-medium mt-1">Goed</p>
          </div>
          <div className="text-center bg-red-50 rounded-2xl p-3 border border-red-100">
            <p className="text-2xl font-bold text-red-500">{stats.wrong}</p>
            <p className="text-xs text-red-400 font-medium mt-1">Fout</p>
          </div>
          <div className="text-center bg-amber-50 rounded-2xl p-3 border border-amber-100">
            <p className="text-2xl font-bold text-amber-600">{accuracy}%</p>
            <p className="text-xs text-amber-500 font-medium mt-1">Score</p>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-amber-600 bg-amber-50 rounded-xl p-3">
          <span>Punten verdiend:</span>
          <span className="font-bold text-amber-800 text-lg">
            ⭐ {stats.totalPointsEarned} punten
          </span>
        </div>

        {stats.hintsUsed > 0 && (
          <p className="text-center text-xs text-amber-400 mt-2">
            💡 {stats.hintsUsed} hint{stats.hintsUsed !== 1 ? 's' : ''} gebruikt
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export default SessionStatsCard
