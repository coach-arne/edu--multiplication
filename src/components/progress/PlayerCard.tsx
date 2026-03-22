import { useAtomValue } from 'jotai'
import { currentLevelAtom, currentTitleAtom, totalPointsAtom, xpProgressAtom } from '@/atoms/userProgressAtom'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { getXpProgressPercent } from '@/lib/scoring'
import { LEVELS } from '@/data/levels'

const PlayerCard = () => {
  const level = useAtomValue(currentLevelAtom)
  const title = useAtomValue(currentTitleAtom)
  const totalPoints = useAtomValue(totalPointsAtom)
  const xp = useAtomValue(xpProgressAtom)

  const progressPercent = getXpProgressPercent(xp, level)
  const xpRequired = LEVELS.find((l) => l.level === level)?.xpRequired ?? Infinity
  const isMaxLevel = xpRequired === Infinity

  return (
    <Card className="w-full bg-white/80 border-amber-200 shadow-md">
      <CardContent className="pt-5 pb-4 px-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">⚔️</span>
              <div>
                <p className="text-xs text-amber-600 font-semibold uppercase tracking-wide">
                  Level {level}
                </p>
                <h2 className="text-lg font-bold text-amber-900 leading-tight">{title}</h2>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-amber-600 font-semibold uppercase tracking-wide">Punten</p>
            <p className="text-2xl font-bold text-amber-700">{totalPoints.toLocaleString('nl')}</p>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs text-amber-600">
            <span>Voortgang naar level {level + 1}</span>
            {!isMaxLevel && (
              <span>
                {xp} / {xpRequired} XP
              </span>
            )}
          </div>
          <Progress
            value={progressPercent}
            className="h-3 bg-amber-100"
          />
          {isMaxLevel && (
            <p className="text-xs text-amber-600 text-center font-semibold">
              Maximaal level bereikt! 🏆
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default PlayerCard
