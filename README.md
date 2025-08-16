# Persona Chat Bot

Deployment url - https://persona-chat-bot-two.vercel.app/

## Overview
LLM Persona Chat is a web application that utilizes large language models (LLMs) to create an interactive chat experience with the persona of Narinder Kumar. The application captures the unique tone and style of Narinder, allowing users to engage in conversations that reflect his communication style.

## Features
- **Persona Card**: Visually rich card with profile image and description for Narinder Kumar.
- **WhatsApp-like Chat Window**: Modern, animated chat interface inspired by WhatsApp, with support for message history and smooth transitions.
- **Persona-Specific Prompts**: Uses a detailed, curated prompt to ensure authentic responses in Narinder's style.
- **Chat History Memory**: The backend sends the full chat history to the LLM, so the persona can remember and refer to previous messages.
- **Responsive UI**: Built with Material-UI (MUI) for a polished, mobile-friendly experience.
- **Easy Chat Restart**: Start a new chat with Narinder at any time.

## Project Structure
```
llm-persona-chat
├── public
│   └── index.html
├── src
│   ├── api
│   │   └── openai.js
│   ├── components
│   │   ├── ChatWindow.jsx
│   │   ├── PersonaCard.jsx
│   │   └── PersonaSwitcher.jsx
│   ├── data
│   │   ├── hiteshToneDataset.js
│   │   └── piyushToneDataset.js
│   ├── llm
│   │   └── persona.js
│   ├── pages
│   │   └── Home.jsx
│   ├── theme.js
│   ├── App.jsx
│   └── main.jsx
├── server.js
├── package.json
└── README.md
```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/narinderCanGit/persona-chat-bot
   cd llm-persona-chat
   ```

2. **Install Dependencies**
   Make sure you have Node.js (v18+) installed. Then run:
   ```bash
   pnpm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=sk-...
   PORT=8000
   ```

4. **Run the Backend**
   ```bash
   node server.js
   ```
   The backend will start on `http://localhost:8000`.

5. **Run the Frontend**
   In a new terminal, start the Vite development server:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

## Usage
- On load, you'll see a persona card for Narinder Kumar.
- Click "Chat Now" to open a WhatsApp-style chat window.
- Type your message and interact; the persona will respond in Narinder's unique tone and style, with memory of your conversation.
- You can close the chat and start a new one at any time.

## Contribution
Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## Acknowledgments
- Powered by OpenAI's GPT models.

## Notes
- The frontend uses [Vite](https://vitejs.dev/) for fast development and builds.
