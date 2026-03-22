import { cn } from '@/lib/utils'

type HintMatrixProps = {
  factorA: number
  factorB: number
  onClose: () => void
}

const HintMatrix = ({ factorA, factorB, onClose }: HintMatrixProps) => {
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
            <p className="text-xs text-amber-500">
              {factorA} × {factorB} = {factorA * factorB}
            </p>
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
                {Array.from({ length: 10 }, (_, i) => i + 1).map((col) => (
                  <th
                    key={col}
                    className={cn(
                      'p-1 font-bold rounded',
                      col === factorB
                        ? 'bg-amber-500 text-white'
                        : 'bg-amber-100 text-amber-600',
                    )}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((row) => (
                <tr key={row}>
                  <th
                    className={cn(
                      'p-1 font-bold rounded',
                      row === factorA
                        ? 'bg-amber-500 text-white'
                        : 'bg-amber-100 text-amber-600',
                    )}
                  >
                    {row}
                  </th>
                  {Array.from({ length: 10 }, (_, j) => j + 1).map((col) => {
                    const isHighlighted = row === factorA && col === factorB
                    const isRowHighlight = row === factorA
                    const isColHighlight = col === factorB

                    return (
                      <td
                        key={col}
                        className={cn(
                          'p-1 rounded transition-colors font-medium',
                          isHighlighted
                            ? 'bg-green-500 text-white font-bold text-sm ring-2 ring-green-300'
                            : isRowHighlight || isColHighlight
                            ? 'bg-amber-100 text-amber-700'
                            : 'text-gray-600 hover:bg-gray-50',
                        )}
                      >
                        {row * col}
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
