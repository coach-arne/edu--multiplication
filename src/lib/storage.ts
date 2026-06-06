import type { CategoryStats, TableStats, UserProgress } from '@/types'
import { getTitleForLevel } from '@/data/levels'

const EMPTY_CATEGORY_STATS: CategoryStats = {
  multiplication: {},
  division: {},
}

const isTableStats = (value: unknown): value is TableStats =>
  typeof value === 'object' &&
  value !== null &&
  typeof (value as TableStats).correct === 'number' &&
  typeof (value as TableStats).incorrect === 'number' &&
  typeof (value as TableStats).total === 'number'

const normalizeTableStatsRecord = (value: unknown): Record<number, TableStats> => {
  if (typeof value !== 'object' || value === null) return {}

  return Object.entries(value).reduce<Record<number, TableStats>>((acc, [key, stats]) => {
    const table = Number(key)
    if (!Number.isNaN(table) && isTableStats(stats)) {
      acc[table] = stats
    }
    return acc
  }, {})
}

export const createDefaultUserProgress = (): UserProgress => ({
  level: 1,
  title: getTitleForLevel(1),
  totalPoints: 0,
  xpTowardsNextLevel: 0,
  categoryStats: { ...EMPTY_CATEGORY_STATS },
})

export const migrateUserProgress = (raw: unknown): UserProgress => {
  const defaults = createDefaultUserProgress()

  if (typeof raw !== 'object' || raw === null) {
    return defaults
  }

  const data = raw as Partial<UserProgress> & {
    tableStats?: Record<number, TableStats>
    categoryStats?: Partial<CategoryStats>
  }

  const legacyTableStats = normalizeTableStatsRecord(data.tableStats)
  const multiplicationStats = normalizeTableStatsRecord(data.categoryStats?.multiplication)
  const divisionStats = normalizeTableStatsRecord(data.categoryStats?.division)

  const categoryStats: CategoryStats = {
    multiplication: {
      ...legacyTableStats,
      ...multiplicationStats,
    },
    division: divisionStats,
  }

  return {
    level: typeof data.level === 'number' && data.level > 0 ? data.level : defaults.level,
    title: typeof data.title === 'string' ? data.title : getTitleForLevel(data.level ?? 1),
    totalPoints:
      typeof data.totalPoints === 'number' && data.totalPoints >= 0
        ? data.totalPoints
        : defaults.totalPoints,
    xpTowardsNextLevel:
      typeof data.xpTowardsNextLevel === 'number' && data.xpTowardsNextLevel >= 0
        ? data.xpTowardsNextLevel
        : defaults.xpTowardsNextLevel,
    categoryStats,
  }
}
