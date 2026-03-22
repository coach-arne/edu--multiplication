export const CORRECT_MESSAGES = [
  'Goed gedaan!',
  'Geweldig! Zo doe je dat!',
  'Fantastisch! Je bent een ster!',
  'Prachtig! Helemaal goed!',
  'Super! Je bent op weg!',
  'Bravo! Dat was makkelijk voor jou!',
]

export const WRONG_MESSAGES = [
  'Bijna! Probeer het nog eens.',
  'Dat was niet helemaal goed. Ga door!',
  'Niet erg! Elk foutje is een leerkans.',
  'Oeps! De volgende is zeker goed!',
]

export const HINT_MESSAGE = 'Hint gebruikt — je verdient deze keer minder punten.'

export const STREAK_BONUS_MESSAGE = (streak: number) =>
  `${streak} op rij! Bonus verdiend!`

export const LEVEL_UP_MESSAGE = (title: string) =>
  `Level omhoog! Je bent nu een ${title}!`

export const getRandomCorrectMessage = (): string =>
  CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]

export const getRandomWrongMessage = (): string =>
  WRONG_MESSAGES[Math.floor(Math.random() * WRONG_MESSAGES.length)]
