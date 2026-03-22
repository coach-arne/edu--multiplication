import { cn } from '@/lib/utils'

type AnswerButtonState = 'default' | 'correct' | 'wrong' | 'disabled'

type AnswerButtonProps = {
  value: number
  state: AnswerButtonState
  onClick: (value: number) => void
}

const AnswerButton = ({ value, state, onClick }: AnswerButtonProps) => {
  return (
    <button
      onClick={() => state === 'default' && onClick(value)}
      disabled={state === 'disabled' || state === 'correct' || state === 'wrong'}
      className={cn(
        'h-20 w-full rounded-2xl text-3xl font-bold border-2 transition-all select-none',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400',
        state === 'default' &&
          'bg-white border-amber-300 text-amber-800 hover:bg-amber-50 hover:border-amber-500 active:scale-95 shadow-sm',
        state === 'correct' &&
          'bg-green-500 border-green-600 text-white shadow-green-200 shadow-md scale-105',
        state === 'wrong' &&
          'bg-red-400 border-red-500 text-white shadow-sm opacity-90',
        state === 'disabled' &&
          'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed',
      )}
    >
      {value}
    </button>
  )
}

export default AnswerButton
