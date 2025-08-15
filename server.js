import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";
import { personas } from "./src/llm/persona.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/chat", async (req, res) => {
  const { personaId, message, history } = req.body;

  const persona = personas[personaId];
  if (!persona) return res.status(400).json({ error: "Invalid persona" });

  // Build messages array: system prompt + chat history + new user message
  const messages = [
    { role: "system", content: persona.prompt },
    ...(Array.isArray(history)
      ? history.map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.message,
        }))
      : []),
    { role: "user", content: message },
  ];

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages,
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, (err) => {
  if (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
  console.log(`Server running on port ${PORT}`);
});
