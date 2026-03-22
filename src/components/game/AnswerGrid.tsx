import type { Question } from '@/types'
import AnswerButton from './AnswerButton'

type AnswerState = 'default' | 'correct' | 'wrong' | 'disabled'

type AnswerGridProps = {
  question: Question
  selectedAnswer: number | null
  onAnswer: (value: number) => void
}

const getButtonState = (
  option: number,
  correctAnswer: number,
  selectedAnswer: number | null,
): AnswerState => {
  if (selectedAnswer === null) return 'default'
  if (option === correctAnswer) return 'correct'
  if (option === selectedAnswer) return 'wrong'
  return 'disabled'
}

const AnswerGrid = ({ question, selectedAnswer, onAnswer }: AnswerGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      {question.options.map((option) => (
        <AnswerButton
          key={option}
          value={option}
          state={getButtonState(option, question.correctAnswer, selectedAnswer)}
          onClick={onAnswer}
        />
      ))}
    </div>
  )
}

export default AnswerGrid
