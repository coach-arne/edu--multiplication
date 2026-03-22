import { cn } from '@/lib/utils'
import type { FeedbackState } from '@/types'
import { getRandomCorrectMessage, getRandomWrongMessage, HINT_MESSAGE } from '@/data/feedback'

type FeedbackBannerProps = {
  feedback: FeedbackState
}

const FeedbackBanner = ({ feedback }: FeedbackBannerProps) => {
  if (!feedback.type) return null

  const isCorrect = feedback.type === 'correct'
  const isHint = feedback.type === 'hint'

  const getMessage = () => {
    if (isHint) return HINT_MESSAGE
    if (isCorrect) {
      const base = getRandomCorrectMessage()
      if (feedback.pointsEarned !== undefined) {
        return `${base} +${feedback.pointsEarned} punten`
      }
      return base
    }
    return `${getRandomWrongMessage()} Het goede antwoord was ${feedback.correctAnswer}.`
  }

  return (
    <div
      className={cn(
        'w-full py-3 px-4 rounded-2xl text-center text-base font-semibold transition-all',
        isCorrect && 'bg-green-100 text-green-800 border border-green-300',
        feedback.type === 'wrong' && 'bg-red-100 text-red-800 border border-red-300',
        isHint && 'bg-amber-100 text-amber-800 border border-amber-300',
      )}
    >
      {getMessage()}
    </div>
  )
}

export default FeedbackBanner
