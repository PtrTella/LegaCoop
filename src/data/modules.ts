import { Module } from '../types';

export const MODULES: Module[] = [
  {
    id: 0,
    title: "Fase 0: Contesto ed Ecosistema",
    description: "Mappa bisogni reali e risorse del tuo territorio.",
    objective: "Verificare che l'idea nasca da un bisogno reale ed esplorare l'ecosistema cooperativo.",
    task: "Mappatura dei bisogni e Scheda Idea Cooperativa.",
    lessons: [
      {
        id: "0-1",
        title: "Perché una Cooperativa?",
        type: 'video',
        videoUrl: "https://picsum.photos/seed/coop0/400/700",
        content: "Valuta se la forma cooperativa è più coerente di una Srl classica per il tuo impatto sociale.",
        keywords: {
          "Mutuo Soccorso": "Soddisfare un bisogno comune proteggendo i soci.",
          "Ecosistema": "L'ambiente sociale in cui l'impresa crea valore."
        }
      }
    ],
    flashcards: [
      { question: "Cos'è lo scopo mutualistico?", answer: "L'intento di fornire ai soci beni, servizi o lavoro a condizioni migliori rispetto al mercato." }
    ]
  },
  {
    id: 1,
    title: "Fase 1: Mindset & Team",
    description: "Definisci ruoli, competenze e patto dei soci.",
    objective: "Trasformare un gruppo informale in un team imprenditoriale allineato.",
    task: "Test competenze e definizione del Patto tra Soci.",
    lessons: [],
    flashcards: [
      { question: "Cos'è la Skill Matrix?", answer: "Una griglia per valutare oggettivamente le competenze presenti nel team e i gap da colmare." },
      { question: "Cosa stabilisce il Patto tra soci?", answer: "Definisce gli impegni (ore, risorse), i ruoli e i meccanismi per gestire eventuali conflitti." },
      { question: "Cos'è il Bootstrapping?", answer: "L'avvio dell'impresa usando risorse minime autofinanziate, senza investitori esterni." }
    ]
  },
  {
    id: 2,
    title: "Fase 2: Validazione Idea",
    description: "Dalla teoria al mercato: testa, misura, impara.",
    objective: "Testare se il problema esiste davvero e la soluzione è desiderata (Lean Startup).",
    task: "Interviste ai clienti e lancio dell'MVP.",
    lessons: [],
    flashcards: [
      { question: "Cos'è un MVP?", answer: "Minimum Viable Product: la versione più basilare del tuo servizio per validare l'ipotesi sul mercato reale." },
      { question: "Pivotare. Che significa?", answer: "Cambiare strategicamente rotta quando i dati indicano che l'idea originale non funziona." }
    ]
  },
  {
    id: 3,
    title: "Fase 3: Strategia & Mercato",
    description: "Misura l'opportunità e posizionati.",
    objective: "Definire il posizionamento esatto e misurare la dimensione economica dell'opportunità (TAM-SAM-SOM).",
    task: "Analisi di Mercato (TAM-SAM-SOM)",
    lessons: [],
    flashcards: [
      { question: "Cos'è il TAM (Total Addressable Market)?", answer: "La domanda totale per un prodotto o servizio. Risponde alla domanda: Se il 100% del mercato comprasse da me, quanto guadagnerei?" },
      { question: "Cos'è il SAM (Serviceable Available Market)?", answer: "La fetta di TAM raggiungibile con il mio attuale modello di business e geografia." },
      { question: "Cos'è il SOM (Serviceable Obtainable Market)?", answer: "La fetta di SAM che posso realisticamente conquistare nel breve/medio termine considerata la concorrenza." }
    ]
  },
  {
    id: 4,
    title: "Fase 4: Piano Finanziario",
    description: "Costi, cassa e sostenibilità economica.",
    objective: "Tradurre la strategia in numeri: Cash Flow, Break-even e previsioni.",
    task: "Costruisci il tuo Rendiconto Finanziario.",
    lessons: [],
    flashcards: [
      { question: "Cos'è il Burn Rate?", answer: "La velocità con cui bruci cassa ogni mese prima di generare ricavi netti." },
      { question: "Cosa si intende per Runway?", answer: "I mesi di autonomia finanziaria rimasti alla cooperativa prima di finire la liquidità." }
    ]
  },
  {
    id: 5,
    title: "Fase 5: Governance",
    description: "Verso il notaio: Regolamenti e Statuto.",
    objective: "Formalizzare legalmente la cooperativa e gestire gli organi sociali.",
    task: "Bozza dello statuto e definizione ruoli politici.",
    lessons: [],
    flashcards: [
      { question: "Cosa sono i Ristorni?", answer: "La restituzione ai soci di parte degli utili in proporzione agli scambi mutualistici effettuati." }
    ]
  }
];
