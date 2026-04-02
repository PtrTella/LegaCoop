export const analyzeSWOT = async (idea: string) => {
  try {
    const response = await fetch('/api/swot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idea })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || 'Errore dal server API');
    }

    return await response.json();
  } catch (error) {
    console.error("Error generating SWOT (Client):", error);
    throw error;
  }
};

export const askTutor = async (question: string, context?: string) => {
  try {
    const response = await fetch('/api/tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, context })
    });

    if (!response.ok) {
      throw new Error('Errore dal server API');
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Error asking tutor (Client):", error);
    return "Mi dispiace, il server AI non è momentaneamente raggiungibile. Riprova più tardi!";
  }
};
