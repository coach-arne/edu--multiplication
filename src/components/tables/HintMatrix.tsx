import type { Question } from '@/types'
import { cn } from '@/lib/utils'
import { getHintMatrixFactors } from '@/lib/formatQuestion'

type HintMatrixProps = {
  question: Question
  onClose: () => void
}

const HintMatrix = ({ question, onClose }: HintMatrixProps) => {
  const { row, col, subtitle } = getHintMatrixFactors(question)

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-4 w-full max-w-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="text-lg font-bold text-amber-800">Maaltafelmatrix</h2>
            <p className="text-xs text-amber-500">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-2xl text-amber-400 hover:text-amber-700 transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-amber-50"
          >
            ✕
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs border-collapse">
            <thead>
              <tr>
                <th className="p-1 bg-amber-100 text-amber-600 rounded font-bold">×</th>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((column) => (
                  <th
                    key={column}
                    className={cn(
                      'p-1 font-bold rounded',
                      column === col
                        ? 'bg-amber-500 text-white'
                        : 'bg-amber-100 text-amber-600',
                    )}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((matrixRow) => (
                <tr key={matrixRow}>
                  <th
                    className={cn(
                      'p-1 font-bold rounded',
                      matrixRow === row
                        ? 'bg-amber-500 text-white'
                        : 'bg-amber-100 text-amber-600',
                    )}
                  >
                    {matrixRow}
                  </th>
                  {Array.from({ length: 10 }, (_, j) => j + 1).map((column) => {
                    const isHighlighted = matrixRow === row && column === col
                    const isRowHighlight = matrixRow === row
                    const isColHighlight = column === col

                    return (
                      <td
                        key={column}
                        className={cn(
                          'p-1 rounded transition-colors font-medium',
                          isHighlighted
                            ? 'bg-green-500 text-white font-bold text-sm ring-2 ring-green-300'
                            : isRowHighlight || isColHighlight
                              ? 'bg-amber-100 text-amber-700'
                              : 'text-gray-600 hover:bg-gray-50',
                        )}
                      >
                        {matrixRow * column}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={onClose}
          className="mt-3 w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl text-base transition-colors active:scale-95"
        >
          Sluiten
        </button>
      </div>
    </div>
  )
}

export default HintMatrix
