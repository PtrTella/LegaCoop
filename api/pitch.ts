import { GoogleGenAI } from '@google/genai';
import path from 'path';

// --- CONFIGURAZIONE ESSENZIALE GORDON (PITCH) ---
const MODEL_CONFIG = {
  model: "gemini-2.5-flash",
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
    Questo valore deve riflettere la progressione della fiducia: 0 = Zero fiducia, 100 = Accetti l'idea cooperativa.`,
  resources: [""]
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).send('POST only');

  const { messages } = req.body;
  if (!messages) return res.status(400).send('Messaggi mancanti.');

  const API_KEY = process.env.GEMINI_API_KEY || '';
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  // Upload Manuale sulla File API (Ogni 48 ore)
  if (!global.fileUriPitch) {
      try {
        const uploadResult = await ai.files.upload({
        file: path.join(process.cwd(), MODEL_CONFIG.resources[0]),
          config: { mimeType: "application/pdf" }
        });
        global.fileUriPitch = uploadResult.uri;
        global.fileMimeTypePitch = uploadResult.mimeType;
    } catch (e) { console.warn("Errore File API:", e); }
  }

  const fileData = global.fileUriPitch ? { fileUri: global.fileUriPitch, mimeType: global.fileMimeTypePitch } : null;

  // Formatta cronologia chat (user/model)
  const contents = messages.map((m: any) => ({
    role: (m.role === 'bot' || m.role === 'model' ? 'model' : 'user'),
    parts: [{ text: (m.text || m.parts?.[0]?.text || '').trim() }]
  }));

  try {
    const result = await ai.models.generateContent({
      model: MODEL_CONFIG.model,
      contents: [
        ...(fileData ? [{ role: "user", parts: [{ fileData }] }] : []),
        { role: "user", parts: [{ text: `[SYSTEM_ALERT]: ${MODEL_CONFIG.systemPrompt}` }] },
        ...contents
      ],
      config: { temperature: MODEL_CONFIG.temperature }
    });
    
    let fullText = result.text || '';
    let score = 0;
    
    // Extract score from [[SCORE: X]]
    const scoreMatch = fullText.match(/\[\[SCORE:\s*(\d+)\]\]/);
    if (scoreMatch) {
      score = parseInt(scoreMatch[1], 10);
      // Clean the text from the meta-tag
      fullText = fullText.replace(/\[\[SCORE:\s*\d+\]\]/, '').trim();
    }
    
    return res.status(200).json({ text: fullText, score });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
