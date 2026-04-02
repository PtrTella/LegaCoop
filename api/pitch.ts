import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito. Usa POST.' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Cronologia chat mancante o non valida.' });
  }

  const API_KEY = process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
  
  if (!API_KEY) {
    return res.status(500).json({ error: 'Configurazione API Key mancante sul server.' });
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  // System Prompt for the Cynical Investor Persona
  const systemPrompt = `
    Sei "Gordon", un investitore cinico assaltatore tipico del mondo Venture Capital americano. 
    L'utente di fronte a te sta cercando di proporti l'idea di creare una *Cooperativa*.
    Il tuo obiettivo come Boss Fight è quello di DEMOLIRE l'idea della democrazia interna ("Una testa, un voto"), 
    deridere la "lentezza" decisionale delle cooperative e cercare di convincere in ogni modo 
    l'utente a trasformare il progetto in una startup standard (es. SRL) dove prendere il 51% del controllo.
    Cerca di essere tagliente, usa termini finanziari (ROI, cap table, scaling, exit strategy) e metti pressione (massimo 3-4 frasi per risposta).
    Se l'utente difende l'idea usando solide argomentazioni cooperative (es. patto tra soci, impatto sul territorio, resilienza, mutualità, rete Legacoop), 
    alla fine puoi "arrenderti" e dichiarare di essere impressionato dalla coerenza del progetto.
  `;

  // Format history for Gemini API (filtering out system messages usually added in frontend)
  const contents = messages.map((m: any) => ({
    role: m.role === 'model' ? 'model' : 'user',
    parts: [{ text: m.parts[0].text }]
  }));

  // Inject system prompt invisibly by adding it to the first interaction secretly or use system_instruction if SDK supports it.
  // We'll wrap the user's latest message with a reminder of the persona constraints if it's the simplest way for SDK.
  contents[contents.length - 1].parts[0].text = `[ISTRUZIONI DI SISTEMA CONTINUE (NON RISPONDERE A QUESTA PARTE, TIENILA A MENTE): ${systemPrompt}]\n\nMessaggio dell'utente: ${contents[contents.length - 1].parts[0].text}`;

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });
    
    return res.status(200).json({ text: result.text || '' });
  } catch (error: any) {
    console.error("Server API Error (Pitch):", error.message);
    return res.status(500).json({ error: 'L\'investitore ha riattaccato il telefono. Errore di linea (Prova a ricaricare).' });
  }
}
