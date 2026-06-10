import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { StatistiekeGebruiker, OefenSessie, Voortgang } from '@/types'

interface AppStore {
  // Modus
  donkerModus: boolean
  toggleDonkerModus: () => void
  
  // Geluid
  geluidIngeschakeld: boolean
  toggleGeluid: () => void
  
  // Statistieken
  statistieken: StatistiekeGebruiker
  updateStatistieken: (update: Partial<StatistiekeGebruiker>) => void
  
  // Voortgang per onderwerp
  voortgang: Record<string, Voortgang>
  updateVoortgang: (itemId: string, update: Partial<Voortgang>) => void
  
  // Sessies
  sessies: OefenSessie[]
  voegSessieToe: (sessie: OefenSessie) => void
  
  // Prestatiesvergrendeling
  prestatiesVergrendeld: Set<string>
  vergrendelPrestatie: (prestatieId: string) => void
}

const initialStatistieken: StatistiekeGebruiker = {
  totaalVragen: 0,
  correcteAntwoorden: 0,
  percentageCorrect: 0,
  reeks: 0,
  besteScore: 0,
  gemiddeldeTijd: 0,
  categoriën: {},
  prestatiesOnvergrendeld: [],
}

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      donkerModus: false,
      toggleDonkerModus: () => set((state) => ({ donkerModus: !state.donkerModus })),
      
      geluidIngeschakeld: true,
      toggleGeluid: () => set((state) => ({ geluidIngeschakeld: !state.geluidIngeschakeld })),
      
      statistieken: initialStatistieken,
      updateStatistieken: (update) => set((state) => ({
        statistieken: { ...state.statistieken, ...update }
      })),
      
      voortgang: {},
      updateVoortgang: (itemId, update) => set((state) => ({
        voortgang: {
          ...state.voortgang,
          [itemId]: { ...state.voortgang[itemId], ...update }
        }
      })),
      
      sessies: [],
      voegSessieToe: (sessie) => set((state) => ({
        sessies: [...state.sessies, sessie]
      })),
      
      prestatiesVergrendeld: new Set(),
      vergrendelPrestatie: (prestatieId) => set((state) => {
        const nieuwVergrendeld = new Set(state.prestatiesVergrendeld)
        nieuwVergrendeld.add(prestatieId)
        return { prestatiesVergrendeld: nieuwVergrendeld }
      }),
    }),
    {
      name: 'parate-kennis-store',
    }
  )
)
