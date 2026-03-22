export type LevelConfig = {
  level: number
  title: string
  xpRequired: number
}

export const LEVELS: LevelConfig[] = [
  { level: 1, title: 'Rekenleerling', xpRequired: 100 },
  { level: 2, title: 'Tafelverkenner', xpRequired: 200 },
  { level: 3, title: 'Cijferwacht', xpRequired: 350 },
  { level: 4, title: 'Sommenridder', xpRequired: 550 },
  { level: 5, title: 'Schilddrager van de Tafels', xpRequired: 800 },
  { level: 6, title: 'Rekenmagiër', xpRequired: 1100 },
  { level: 7, title: 'Bewaker van de Matrix', xpRequired: 1500 },
  { level: 8, title: 'Meester van de Tafels', xpRequired: 2000 },
  { level: 9, title: 'Grootmeester van Getallen', xpRequired: 2600 },
  { level: 10, title: 'Legende van het Rekenrijk', xpRequired: Infinity },
]

export const MAX_LEVEL = LEVELS.length

export const getTitleForLevel = (level: number): string => {
  const config = LEVELS.find((l) => l.level === level)
  return config?.title ?? LEVELS[0].title
}

export const getXpRequiredForLevel = (level: number): number => {
  const config = LEVELS.find((l) => l.level === level)
  return config?.xpRequired ?? 100
}
