// Type definitions voor de applicatie
export interface Land {
  id: string;
  naam: string;
  hoofdstad: string;
  continent: string;
  coördinaten: {
    breedtegraad: number;
    lengtegraad: number;
  };
  bevolking?: number;
  vlag?: string;
  alternatieveNamen?: string[];
}

export interface Provincie {
  id: string;
  naam: string;
  hoofdstad: string;
  bevolking?: number;
  oppervlakte?: number;
  alternatieveNamen?: string[];
}

export interface Rivier {
  id: string;
  naam: string;
  continent: string;
  lengteKm?: number;
  landen: string[];
  alternatieveNamen?: string[];
}

export interface Gebergte {
  id: string;
  naam: string;
  continent: string;
  hoogstePixelMeter?: number;
  landen: string[];
  alternatieveNamen?: string[];
}

export interface Zee {
  id: string;
  naam: string;
  oppervlakte?: number;
  continenten: string[];
  alternatieveNamen?: string[];
}

export interface Oceaan {
  id: string;
  naam: string;
  oppervlakte?: number;
  diepteGemiddeld?: number;
  alternatieveNamen?: string[];
}

export interface Prestatie {
  id: string;
  titel: string;
  beschrijving: string;
  icoon: string;
  voorwaarde: string;
  categorie: string;
}

export interface Voortgang {
  landId: string;
  correcte: number;
  foute: number;
  laatsteTest?: Date;
  moeilijkheidsgraad: number;
}

export interface QuizVraag {
  id: string;
  type: 'invullen' | 'meerkeuze' | 'kaart' | 'flashcard';
  categorie: string;
  vraag: string;
  antwoord: string;
  alternatieveAntwoorden?: string[];
  opties?: string[];
  moeilijkheid: number;
}

export interface QuizResultaat {
  vraagId: string;
  antwoordGebruiker: string;
  correct: boolean;
  tijd: number;
  moeilijkheid: number;
}

export interface StatistiekeGebruiker {
  totaalVragen: number;
  correcteAntwoorden: number;
  percentageCorrect: number;
  reeks: number;
  besteScore: number;
  gemiddeldeTijd: number;
  categoriën: {
    [key: string]: {
      totaal: number;
      correct: number;
      voortgang: number;
    };
  };
  prestatiesOnvergrendeld: string[];
}

export interface OefenSessie {
  id: string;
  categorie: string;
  type: string;
  startTijd: Date;
  eindTijd?: Date;
  resultaten: QuizResultaat[];
  score: number;
}
