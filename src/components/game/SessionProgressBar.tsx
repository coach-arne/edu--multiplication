import { Progress } from '@/components/ui/progress'

type SessionProgressBarProps = {
  current: number
  total: number
  score: number
  streak: number
}

const SessionProgressBar = ({ current, total, score, streak }: SessionProgressBarProps) => {
  const progressPercent = Math.round((current / total) * 100)

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-amber-700 font-medium">
          Vraag {current} van {total}
        </span>
        <div className="flex items-center gap-3">
          {streak >= 2 && (
            <span className="text-orange-500 font-bold text-base">
              🔥 {streak} op rij
            </span>
          )}
          <span className="text-amber-600 font-bold">
            ⭐ {score} pnt
          </span>
        </div>
      </div>
      <Progress value={progressPercent} className="h-3 bg-amber-100" />
    </div>
  )
}

export default SessionProgressBar
