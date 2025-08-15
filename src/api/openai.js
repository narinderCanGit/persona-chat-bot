export async function getPersonaResponse(personaId, userMessage, history = []) {
  const response = await fetch("http://localhost:8000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ personaId, message: userMessage, history }),
  });
  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return data.reply;
}
