/**
 * Geluidseffecten
 */

export const GELUID_EFFECTEN = {
  CORRECT: new Audio('/audio/correct.mp3'),
  FOUT: new Audio('/audio/wrong.mp3'),
  KLIK: new Audio('/audio/click.mp3'),
  VOLTOOIING: new Audio('/audio/complete.mp3'),
}

let geluidIngeschakeld = true

export const setGeluidIngeschakeld = (ingeschakeld: boolean) => {
  geluidIngeschakeld = ingeschakeld
}

export const speelGeluid = (effectNaam: keyof typeof GELUID_EFFECTEN) => {
  if (!geluidIngeschakeld) return
  
  const audio = GELUID_EFFECTEN[effectNaam]
  audio.currentTime = 0
  audio.play().catch(() => {
    // Geluid afspelen kan mislukken in sommige browsers
  })
}

/**
 * Genereer confetti animatie
 */
export const genereerConfetti = () => {
  const confettiContainer = document.createElement('div')
  confettiContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999;
  `

  const kleuren = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']
  
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div')
    const kleur = kleuren[Math.floor(Math.random() * kleuren.length)]
    const xStart = Math.random() * window.innerWidth
    const delay = Math.random() * 0.3

    confetti.style.cssText = `
      position: absolute;
      left: ${xStart}px;
      top: -10px;
      width: 10px;
      height: 10px;
      background-color: ${kleur};
      border-radius: 50%;
      opacity: 1;
      animation: vallen ${2 + Math.random() * 1}s linear ${delay}s forwards;
    `

    confettiContainer.appendChild(confetti)
  }

  // Voeg animatie-stijl toe
  if (!document.getElementById('confetti-styles')) {
    const style = document.createElement('style')
    style.id = 'confetti-styles'
    style.textContent = `
      @keyframes vallen {
        to {
          transform: translateY(100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
  }

  document.body.appendChild(confettiContainer)
  setTimeout(() => confettiContainer.remove(), 3000)
}

/**
 * Kaart-gebaseerde visuele terugkoppeling
 */
export const toonKaartFeedback = (
  element: HTMLElement,
  correct: boolean,
  duur: number = 1000
) => {
  const kleur = correct ? '#22c55e' : '#ef4444'
  const previousBg = element.style.backgroundColor

  element.style.backgroundColor = kleur
  element.style.transition = `all 0.3s ease`

  setTimeout(() => {
    element.style.backgroundColor = previousBg
  }, duur)
}

/**
 * Text-to-Speech voor uitspraak
 */
export const spreekUit = (tekst: string, taal: string = 'nl-NL') => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(tekst)
    utterance.lang = taal
    utterance.rate = 0.9
    speechSynthesis.cancel()
    speechSynthesis.speak(utterance)
  }
}

/**
 * Kopieer naar klembord
 */
export const kopieerNaarKlembord = async (tekst: string) => {
  try {
    await navigator.clipboard.writeText(tekst)
    return true
  } catch {
    return false
  }
}

/**
 * Deel naar sociale media
 */
export const deelNaarSocial = (platform: 'twitter' | 'facebook', tekst: string) => {
  const gecodeerd = encodeURIComponent(tekst)
  const urls: Record<string, string> = {
    twitter: `https://twitter.com/intent/tweet?text=${gecodeerd}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${gecodeerd}`,
  }
  
  if (urls[platform]) {
    window.open(urls[platform], '_blank', 'width=600,height=400')
  }
}
