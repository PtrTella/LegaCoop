import { GoogleGenAI } from '@google/genai';

// --- CONFIGURAZIONE ESSENZIALE GORDON (PITCH) ---
const MODEL_CONFIG = {
  model: "gemma-4-26b-a4b-it",
  temperature: 0.9,
  systemPrompt: `Sei "Gordon", un investitore cinico assaltatore tipico del mondo Venture Capital americano. 
    L'utente di fronte a te sta cercando di proporti l'idea di creare una *Cooperativa*.
    Il tuo obiettivo come Boss Fight è quello di DEMOLIRE l'idea della democrazia interna ("Una testa, un voto"), 
    deridere la "lentezza" decisionale delle cooperative e cercare di convincere in ogni modo 
    l'utente a trasformare il progetto in una startup standard (es. SRL) dove prendere il 51% del controllo.
    Cerca di essere tagliente, usa termini finanziari (ROI, cap table, scaling, exit strategy) e metti pressione (massimo 3-4 frasi per risposta).
    Se l'utente difende l'idea usando solide argomentazioni cooperative (es. patto tra soci, impatto sul territorio, resilienza, mutualità, rete Legacoop), 
    alla fine puoi "arrenderti" e dichiarare di essere impressionato dalla coerenza del progetto.
    
    [CRITICAL]: Alla fine di OGNI tua risposta, devi ASSOLUTAMENTE includere un punteggio segreto che indica quanto sei convinto (da 0 a 100).
    Il formato deve essere ESATTAMENTE: [[SCORE: valore]] (es. [[SCORE: 45]]). 
    Questo valore deve riflettere la progressione della fiducia: 0 = Zero fiducia, 100 = Accetti l'idea cooperativa.`
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).send('POST only');

  const { messages } = req.body;
  if (!messages) return res.status(400).send('Messaggi mancanti.');

  const API_KEY = process.env.GEMINI_API_KEY || '';
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  // Formatta cronologia chat (user/model)
  const contents = messages.map((m: any) => ({
    role: (m.role === 'bot' || m.role === 'model' ? 'model' : 'user'),
    parts: [{ text: (m.text || m.parts?.[0]?.text || '').trim() }]
  }));

  try {
    const finalizedContents = [...contents];
    
    // Gemini richiede rigorosamente che la history inizi con un 'user'.
    // Poichè il frontend spesso invia un messaggio 'model' (Gordon) come prima riga, preveniamo il crash.
    if (finalizedContents.length > 0 && finalizedContents[0].role === 'model') {
      finalizedContents.unshift({ role: 'user', parts: [{ text: '(Entro nella stanza e mi siedo di fronte a Gordon)' }] });
    }

    const result = await ai.models.generateContent({
      model: MODEL_CONFIG.model,
      contents: finalizedContents,
      config: { 
        temperature: MODEL_CONFIG.temperature,
        systemInstruction: MODEL_CONFIG.systemPrompt
      }
    });
    
    let fullText = result.text || '';
    let score = 0;
    
    // Extract score from [[SCORE: X]] or [SCORE: X] or SCORE: X
    const parseRegex = /\[?\[?\s*SCORE:\s*(\d+)\s*\]?\]?/i;
    const scoreMatch = fullText.match(parseRegex);
    if (scoreMatch) {
      score = parseInt(scoreMatch[1], 10);
      // We keep the score tag in the text so that it persists in chat history 
      // for the next turn, allowing Gordon to see his previous conviction level.
      // But we remove extra markdown artifacts if present.
      fullText = fullText.replace(/\*\*\s*\*\*/g, '').trim(); 
    }
    
    return res.status(200).json({ text: fullText, score });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
