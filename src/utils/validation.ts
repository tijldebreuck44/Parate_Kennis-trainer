/**
 * Hulpfuncties voor antwoordvalidatie en verwerking
 */

import diacritics from 'diacritics'

/**
 * Verwijdert diakritische tekens (accenten)
 */
export const verwijderDiakritiek = (tekst: string): string => {
  return diacritics.remove(tekst)
}

/**
 * Normaliseert een antwoord voor vergelijking
 * - Converteert naar kleine letters
 * - Verwijdert diakritische tekens
 * - Verwijdert extra spaties
 */
export const normaliseerAntwoord = (antwoord: string): string => {
  return verwijderDiakritiek(antwoord)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
}

/**
 * Berekent de Levenshtein-afstand (voor typefouten-tolerantie)
 */
export const berekenLevenshteinAfstand = (a: string, b: string): number => {
  const m = a.length
  const n = b.length
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0))

  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
      }
    }
  }

  return dp[m][n]
}

/**
 * Controleert of een antwoord correct is met typefouten-tolerantie
 */
export const controleerAntwoord = (
  gegeven: string,
  verwacht: string,
  tolerantie: number = 2
): boolean => {
  const normaalgegeven = normaliseerAntwoord(gegeven)
  const normaalverwacht = normaliseerAntwoord(verwacht)

  if (normaalgegeven === normaalverwacht) return true

  // Maximale typefouten op basis van lengte
  const maxFouten = Math.max(1, Math.floor(normaalverwacht.length * 0.3))
  const afstand = berekenLevenshteinAfstand(normaalgegeven, normaalverwacht)

  return afstand <= maxFouten
}

/**
 * Controleert of gegeven antwoord in een lijst van geldige antwoorden staat
 */
export const controleerMultiAntwoord = (
  gegeven: string,
  valideAntwoorden: string[],
  tolerantie: number = 2
): boolean => {
  return valideAntwoorden.some((antwoord) =>
    controleerAntwoord(gegeven, antwoord, tolerantie)
  )
}

/**
 * Genereert willekeurige meerkeuzeopties
 */
export const genererMeerkeuzeopties = (
  correct: string,
  beschikbare: string[],
  aantal: number = 4
): string[] => {
  const gefilterd = beschikbare.filter((item) => normaliseerAntwoord(item) !== normaliseerAntwoord(correct))
  const opties: string[] = [correct]

  while (opties.length < aantal && gefilterd.length > 0) {
    const index = Math.floor(Math.random() * gefilterd.length)
    opties.push(gefilterd[index])
    gefilterd.splice(index, 1)
  }

  // Schudden
  return opties.sort(() => Math.random() - 0.5)
}

/**
 * Berekent moeilijkheidsgraad op basis van correctiesnelheid
 */
export const bepaalMoeilijkheid = (percentageCorrect: number): number => {
  if (percentageCorrect >= 90) return 1
  if (percentageCorrect >= 75) return 2
  if (percentageCorrect >= 50) return 3
  if (percentageCorrect >= 25) return 4
  return 5
}

/**
 * Spaced repetition: bepaalt wanneer een item volgende keer getoond moet worden
 */
export const berekenVolgendeTest = (
  correcte: number,
  foute: number,
  lastTesting?: Date
): Date => {
  const nu = new Date()
  const ratio = correcte / Math.max(1, correcte + foute)

  let daguiten = 1
  if (ratio >= 0.9) daguiten = 7
  else if (ratio >= 0.7) daguiten = 3
  else if (ratio >= 0.5) daguiten = 1

  return new Date(nu.getTime() + daguiten * 24 * 60 * 60 * 1000)
}
