import type { Question } from '@/types'
import { Card, CardContent } from '@/components/ui/card'

type QuestionCardProps = {
  question: Question
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  return (
    <Card className="w-full bg-white/90 border-amber-200 shadow-md">
      <CardContent className="py-10 px-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl font-bold text-amber-900 tracking-wide select-none">
            {question.factorA} × {question.factorB} = ?
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default QuestionCard
