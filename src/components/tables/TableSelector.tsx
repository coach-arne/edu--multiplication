import { cn } from '@/lib/utils'

type TableSelectorProps = {
  selectedTables: number[]
  onToggle: (table: number) => void
}

const TableSelector = ({ selectedTables, onToggle }: TableSelectorProps) => {
  return (
    <div className="grid grid-cols-5 gap-3 w-full">
      {Array.from({ length: 10 }, (_, i) => i + 1).map((table) => {
        const isSelected = selectedTables.includes(table)
        return (
          <button
            key={table}
            onClick={() => onToggle(table)}
            className={cn(
              'h-16 text-xl font-bold rounded-2xl border-2 transition-all active:scale-95 shadow-sm',
              isSelected
                ? 'bg-amber-500 border-amber-600 text-white shadow-amber-200 shadow-md'
                : 'bg-white border-amber-200 text-amber-700 hover:border-amber-400 hover:bg-amber-50',
            )}
          >
            {table}
          </button>
        )
      })}
    </div>
  )
}

export default TableSelector
