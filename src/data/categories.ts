import type { OperationCategory } from '@/types'

export type CategoryConfig = {
  id: OperationCategory
  label: string
  labelSingular: string
  symbol: string
  selectTitle: string
  selectSubtitle: string
  tableLabelPrefix: string
  startButtonLabel: string
  routeSegment: OperationCategory
}

export const CATEGORIES: Record<OperationCategory, CategoryConfig> = {
  multiplication: {
    id: 'multiplication',
    label: 'Maaltafels',
    labelSingular: 'Maaltafel',
    symbol: '×',
    selectTitle: 'Kies je maaltafels',
    selectSubtitle: 'Selecteer welke maaltafels je wilt oefenen',
    tableLabelPrefix: 'Tafel van',
    startButtonLabel: 'Maaltafels oefenen',
    routeSegment: 'multiplication',
  },
  division: {
    id: 'division',
    label: 'Deeltafels',
    labelSingular: 'Deeltafel',
    symbol: '÷',
    selectTitle: 'Kies je deeltafels',
    selectSubtitle: 'Selecteer welke deeltafels je wilt oefenen',
    tableLabelPrefix: 'Deeltafel van',
    startButtonLabel: 'Deeltafels oefenen',
    routeSegment: 'division',
  },
}

export const OPERATION_CATEGORIES: OperationCategory[] = ['multiplication', 'division']

export const isOperationCategory = (value: string): value is OperationCategory =>
  OPERATION_CATEGORIES.includes(value as OperationCategory)

export const getCategoryConfig = (category: OperationCategory): CategoryConfig =>
  CATEGORIES[category]
