# LLM Persona Chat

## Overview
LLM Persona Chat is a web application that utilizes large language models (LLMs) to create interactive chat experiences with two distinct personas: Hitesh Choudhary and Piyush Garg. The application captures the unique tones and styles of these personalities, allowing users to engage in conversations that reflect their communication styles.

## Features
- **Persona Cards**: Visually rich cards with profile images and descriptions for each persona.
- **WhatsApp-like Chat Window**: Modern, animated chat interface inspired by WhatsApp, with support for message history and smooth transitions.
- **Persona-Specific Prompts**: Each persona uses a detailed, curated prompt (from JS files) to ensure authentic responses.
- **Chat History Memory**: The backend sends the full chat history to the LLM, so the persona can remember and refer to previous messages.
- **Responsive UI**: Built with Material-UI (MUI) for a polished, mobile-friendly experience.
- **Easy Persona Switching**: Start a new chat with any persona at any time.

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
│   └── index.js
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
   In a new terminal, start the React development server:
   ```bash
   npm start
   ```
   Open your browser and navigate to `http://localhost:3000`.

## Usage
- On load, you'll see persona cards for Hitesh Choudhary and Piyush Garg.
- Click "Chat Now" on any card to open a WhatsApp-style chat window.
- Type your message and interact; the persona will respond in their unique tone and style, with memory of your conversation.
- You can close the chat and switch personas at any time.

## Contribution
Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## Acknowledgments
- Special thanks to Hitesh Choudhary and Piyush Garg for their inspiration and contributions to the tech community.
- Powered by OpenAI's GPT models.