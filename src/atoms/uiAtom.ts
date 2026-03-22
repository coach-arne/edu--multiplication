import { atom } from 'jotai'
import type { FeedbackState } from '@/types'

export const showLevelUpAtom = atom<boolean>(false)

export const newLevelAtom = atom<number>(0)

export const feedbackAtom = atom<FeedbackState>({ type: null })

export const showHintAtom = atom<boolean>(false)
