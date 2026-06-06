import { atom } from 'jotai'
import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import type { UserProgress } from '@/types'
import { createDefaultUserProgress, migrateUserProgress } from '@/lib/storage'

const storage = createJSONStorage<UserProgress>(() => localStorage)

export const userProgressAtom = atomWithStorage<UserProgress>(
  'maaltafels-progress',
  createDefaultUserProgress(),
  {
    ...storage,
    getItem: (key, initialValue) => {
      const stored = storage.getItem(key, initialValue)
      return migrateUserProgress(stored)
    },
    setItem: (key, value) => {
      storage.setItem(key, migrateUserProgress(value))
    },
  },
)

export const currentLevelAtom = atom((get) => get(userProgressAtom).level)

export const currentTitleAtom = atom((get) => get(userProgressAtom).title)

export const totalPointsAtom = atom((get) => get(userProgressAtom).totalPoints)

export const xpProgressAtom = atom((get) => get(userProgressAtom).xpTowardsNextLevel)
