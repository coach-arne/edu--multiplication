import { getTitleForLevel } from '@/data/levels'

type LevelUpOverlayProps = {
  level: number
  onDismiss: () => void
}

const LevelUpOverlay = ({ level, onDismiss }: LevelUpOverlayProps) => {
  const title = getTitleForLevel(level)

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center animate-bounce-in">
        <div className="text-6xl mb-4">🎉</div>
        <div className="text-5xl mb-2">⭐</div>
        <h2 className="text-3xl font-bold text-amber-800 mb-1">Level omhoog!</h2>
        <div className="text-5xl font-bold text-amber-500 my-3">Level {level}</div>
        <p className="text-lg text-amber-600 mb-6">
          Je bent nu een{' '}
          <span className="font-bold text-amber-800">{title}</span>!
        </p>

        <div className="flex justify-center gap-1 mb-6">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className="text-2xl">⭐</span>
          ))}
        </div>

        <button
          onClick={onDismiss}
          className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xl rounded-2xl transition-colors active:scale-95"
        >
          Ga door! →
        </button>
      </div>
    </div>
  )
}

export default LevelUpOverlay
