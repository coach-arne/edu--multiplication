import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import type { UserProgress } from '@/types'
import { getTitleForLevel } from '@/data/levels'

const DEFAULT_PROGRESS: UserProgress = {
  level: 1,
  title: getTitleForLevel(1),
  totalPoints: 0,
  xpTowardsNextLevel: 0,
  tableStats: {},
}

export const userProgressAtom = atomWithStorage<UserProgress>(
  'maaltafels-progress',
  DEFAULT_PROGRESS,
)

export const currentLevelAtom = atom((get) => get(userProgressAtom).level)

export const currentTitleAtom = atom((get) => get(userProgressAtom).title)

export const totalPointsAtom = atom((get) => get(userProgressAtom).totalPoints)

export const xpProgressAtom = atom((get) => get(userProgressAtom).xpTowardsNextLevel)
