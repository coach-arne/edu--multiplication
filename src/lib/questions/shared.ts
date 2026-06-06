export const shuffle = <T>(array: T[]): T[] => {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export const generateNumericDistractors = (
  correct: number,
  candidates: number[],
): number[] => {
  const distractors = new Set<number>()

  for (const c of candidates) {
    if (c > 0 && c !== correct) {
      distractors.add(c)
    }
    if (distractors.size >= 3) break
  }

  let offset = 1
  while (distractors.size < 3) {
    const candidate = correct + offset
    if (candidate > 0 && candidate !== correct) distractors.add(candidate)
    if (distractors.size < 3) {
      const candidate2 = correct - offset
      if (candidate2 > 0 && candidate2 !== correct) distractors.add(candidate2)
    }
    offset++
  }

  return [...distractors].slice(0, 3)
}
