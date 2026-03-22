import {
  POINTS_CORRECT,
  POINTS_WITH_HINT,
  POINTS_WRONG,
  STREAK_BONUS,
  STREAK_BONUS_THRESHOLD,
} from '@/data/scoring'
import { LEVELS, MAX_LEVEL, getTitleForLevel } from '@/data/levels'
import type { UserProgress } from '@/types'

export const calculatePoints = (
  correct: boolean,
  hintUsed: boolean,
  streak: number,
): number => {
  if (!correct) return POINTS_WRONG

  let points = hintUsed ? POINTS_WITH_HINT : POINTS_CORRECT

  if (!hintUsed && streak >= STREAK_BONUS_THRESHOLD) {
    points += STREAK_BONUS
  }

  return points
}

export type LevelUpResult = {
  didLevelUp: boolean
  newLevel: number
  newTitle: string
  newXp: number
}

export const applyXpGain = (progress: UserProgress, xpGained: number): LevelUpResult => {
  if (xpGained <= 0) {
    return {
      didLevelUp: false,
      newLevel: progress.level,
      newTitle: progress.title,
      newXp: progress.xpTowardsNextLevel,
    }
  }

  let currentLevel = progress.level
  let currentXp = progress.xpTowardsNextLevel + xpGained

  let didLevelUp = false

  while (currentLevel < MAX_LEVEL) {
    const levelConfig = LEVELS.find((l) => l.level === currentLevel)
    const xpRequired = levelConfig?.xpRequired ?? Infinity

    if (xpRequired === Infinity) break

    if (currentXp >= xpRequired) {
      currentXp -= xpRequired
      currentLevel++
      didLevelUp = true
    } else {
      break
    }
  }

  return {
    didLevelUp,
    newLevel: currentLevel,
    newTitle: getTitleForLevel(currentLevel),
    newXp: currentXp,
  }
}

export const getXpProgressPercent = (xp: number, level: number): number => {
  const levelConfig = LEVELS.find((l) => l.level === level)
  const xpRequired = levelConfig?.xpRequired ?? Infinity

  if (xpRequired === Infinity) return 100

  return Math.min(100, Math.round((xp / xpRequired) * 100))
}
