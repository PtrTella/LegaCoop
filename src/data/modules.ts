import { Module } from '../types';

export const MODULES: Module[] = [
  {
    id: 0,
    title: "Fase 0: Contesto & Ecosistema",
    description: "Mappa bisogni e risorse del tuo territorio.",
    objective: "Demistificare la startup tradizionale e mappare l'ecosistema.",
    task: "Completa il quiz sull'ecosistema cooperativo.",
    lessons: [
      {
        id: "0-1",
        title: "L'Ecosistema Cooperativo",
        type: 'video',
        videoUrl: "https://picsum.photos/seed/coop0/400/700",
        content: "Una cooperativa non nasce nel vuoto. È parte di un Ecosistema fatto di persone, bisogni e territori. La Burocrazia è lo strumento che garantisce la democrazia interna.",
        keywords: {
          "Burocrazia": "L'insieme di regole che proteggono i soci. È la garanzia che ogni testa valga un voto!",
          "Ecosistema": "L'ambiente sociale ed economico in cui la tua impresa cresce e scambia valore."
        }
      }
    ],
    flashcards: [
      { question: "Cos'è l'intercooperazione?", answer: "La collaborazione tra diverse cooperative per rafforzare il movimento." },
      { question: "Chi sono gli stakeholder?", answer: "Tutti i soggetti interessati o influenzati dall'attività della cooperativa." }
    ]
  },
  {
    id: 1,
    title: "Fase 1: Team & Governance",
    description: "Definisci ruoli e valori del tuo gruppo.",
    objective: "Definire ruoli, competenze e governance interna.",
    task: "Supera il simulatore di governance.",
    lessons: [
      {
        id: "1-1",
        title: "Il Potere del Voto",
        type: 'roleplay',
        videoUrl: "https://picsum.photos/seed/coop1/400/700",
        content: "In una cooperativa, il potere è distribuito equamente. Ma cosa succede quando arriva un investitore esterno?",
        keywords: {
          "Governance": "Il sistema di regole e processi con cui l'impresa viene diretta e controllata."
        }
      }
    ],
    flashcards: [
      { question: "Principio 'Una testa, un voto'?", answer: "Ogni socio ha diritto a un solo voto, indipendentemente dal capitale versato." }
    ]
  },
  {
    id: 2,
    title: "Fase 2: Valutazione Idea",
    description: "Valida la tua idea rispetto ai bisogni reali.",
    objective: "Validare l'idea cooperativa rispetto ai bisogni reali.",
    task: "Compila il primo blocco del Lean Canvas.",
    lessons: [
      {
        id: "2-1",
        title: "Validazione Sociale",
        type: 'video',
        videoUrl: "https://picsum.photos/seed/coop2/400/700",
        content: "Il Lean Canvas ti aiuta a visualizzare il tuo modello di business in modo rapido.",
        keywords: {
          "Lean Canvas": "Uno schema in 9 blocchi per mappare la tua idea di business."
        }
      }
    ],
    flashcards: []
  },
  {
    id: 3,
    title: "Fase 3: Strategia & Mercato",
    description: "Definisci posizionamento e target.",
    objective: "Definire posizionamento, target e offerta.",
    task: "Analisi SWOT assistita dall'AI.",
    lessons: [],
    flashcards: []
  },
  {
    id: 4,
    title: "Fase 4: Piano Finanziario",
    description: "Comprendi costi e sostenibilità.",
    objective: "Comprendere ricavi, costi e fabbisogno finanziario.",
    task: "Bilancia del Potere: inserimento quote soci.",
    lessons: [],
    flashcards: []
  },
  {
    id: 5,
    title: "Fase 5: Formalizzazione",
    description: "Comprendi la forma giuridica e lo statuto.",
    objective: "Comprendere la forma giuridica e gli organi sociali.",
    task: "Role-play sulla gestione crisi.",
    lessons: [],
    flashcards: []
  }
];
