import React, { useState, useRef, useEffect } from 'react';
import { getPersonaResponse } from '../api/openai';
import { TextField, Button, Typography, Box, Avatar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import TypingIndicator from './TypingIndicator';

// Persona details for chat header
const personaDetails = {
    hitesh: {
        name: 'Hitesh Choudhary',
        image: 'https://avatars.githubusercontent.com/u/11613311?v=4',
    },
    piyush: {
        name: 'Piyush Garg',
        image: 'https://avatars.githubusercontent.com/u/44976328?v=4',
    },
};

const ChatWindow = ({ personaId, onClose, fontSize = 16 }) => {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    // Scroll to bottom when chat updates
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory, loading]);

    // Handle user input change
    const handleInputChange = (event) => setUserInput(event.target.value);

    // Send user message and get AI reply
    const handleSendMessage = async () => {
        if (!userInput.trim()) return;
        const newHistory = [...chatHistory, { sender: 'user', message: userInput }];
        setChatHistory(newHistory);
        setLoading(true);
        setUserInput('');
        try {
            const aiReply = await getPersonaResponse(personaId, userInput, chatHistory);
            setChatHistory((prev) => [...prev, { sender: 'ai', message: aiReply }]);
        } catch (e) {
            setChatHistory((prev) => [...prev, { sender: 'ai', message: 'Error: ' + e.message }]);
        }
        setLoading(false);
    };

    // Allow sending message with Enter key
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !loading) handleSendMessage();
    };

    const persona = personaDetails[personaId];

    return (
        <Box
            sx={{
                width: 400,
                height: 600,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                boxShadow: 5,
                background: (theme) =>
                    theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, #232526 0%, #414345 100%)'
                        : '#ece5dd',
                position: 'relative',
                fontSize, // base font size for children
            }}
        >
            {/* Header with persona info */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#075e54',
                    color: '#fff',
                    p: 1.2,
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    minHeight: 68,
                    fontSize,
                }}
            >
                <Avatar
                    src={persona.image}
                    alt={persona.name}
                    sx={{
                        width: 48,
                        height: 48,
                        mr: 2,
                        alignSelf: 'flex-start',
                        mt: 0.5,
                    }}
                />
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 48 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                        {persona.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.2 }}>
                        <FiberManualRecordIcon sx={{ color: '#25d366', fontSize: 14, mr: 0.7 }} />
                        <Typography variant="caption" sx={{ color: '#b2dfdb', fontWeight: 500 }}>
                            Online
                        </Typography>
                    </Box>
                </Box>
                <IconButton onClick={onClose} sx={{ color: '#fff', ml: 1, alignSelf: 'flex-start', mt: 0.5 }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            {/* Chat messages area */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    background: (theme) =>
                        theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, #232526 0%, #0f2027 100%)'
                            : 'linear-gradient(135deg, #e0eafc 0%, #a1c4fd 100%)',
                    fontSize,
                }}
            >
                {chatHistory.map((chat, index) => (
                    <Box
                        key={index}
                        sx={{
                            alignSelf: chat.sender === 'user' ? 'flex-end' : 'flex-start',
                            background: chat.sender === 'user'
                                ? (theme) => theme.palette.mode === 'dark' ? '#25d366' : '#dcf8c6'
                                : (theme) => theme.palette.mode === 'dark' ? '#232526' : '#fff',
                            color: chat.sender === 'user'
                                ? '#222'
                                : (theme) => theme.palette.mode === 'dark' ? '#fff' : '#222',
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            maxWidth: '75%',
                            boxShadow: 1,
                            fontSize,
                        }}
                    >
                        {linkifyJSX(chat.message)}
                    </Box>
                ))}
                {loading && (
                    <Box
                        sx={{
                            alignSelf: 'flex-start',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            px: 2,
                            py: 1,
                            background: (theme) =>
                                theme.palette.mode === 'dark' ? '#232526' : '#fff',
                            borderRadius: 2,
                            maxWidth: '60%',
                            boxShadow: 1,
                        }}
                    >
                        <TypingIndicator />
                        <Typography variant="body2" color="text.secondary">
                            Typing...
                        </Typography>
                    </Box>
                )}
                <div ref={chatEndRef} />
            </Box>
            {/* Input area for typing and sending messages */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    background: (theme) => theme.palette.mode === 'dark' ? '#2d3748' : '#f7f7f7',
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12,
                }}
            >
                <TextField
                    variant="outlined"
                    fullWidth
                    multiline
                    minRows={1}
                    maxRows={5}
                    value={userInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message"
                    disabled={loading}
                    sx={{
                        background: (theme) => theme.palette.mode === 'dark' ? '#232526' : '#fff',
                        borderRadius: 1,
                        fontSize,
                        color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#222',
                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                        '& .MuiOutlinedInput-root': { padding: 0 },
                        '& .MuiInputBase-input': {
                            color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#222',
                        },
                        '& textarea': {
                            padding: '12px 14px',
                            fontSize,
                            lineHeight: 1.5,
                            resize: 'none',
                            color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#222',
                        },
                    }}
                    InputProps={{
                        sx: { py: 0 }
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendMessage}
                    disabled={loading || !userInput.trim()}
                    sx={{
                        ml: 2,
                        minWidth: 80,
                        fontSize,
                        background: (theme) => theme.palette.mode === 'dark' ? '#075e54' : undefined,
                        color: (theme) => theme.palette.mode === 'dark' ? '#fff' : undefined,
                        '&:hover': {
                            background: (theme) => theme.palette.mode === 'dark' ? '#128c7e' : undefined,
                        },
                    }}
                >
                    {loading ? '...' : 'Send'}
                </Button>
            </Box>
        </Box>
    );
};

/**
 * Converts URLs in a given text string into clickable <a> links in JSX.
 *
 * Splits the input text by URLs and wraps each detected URL with an anchor tag,
 * opening links in a new tab and applying custom styles.
 */
function linkifyJSX(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) =>
        urlRegex.test(part) ? (
            <a
                key={i}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#3182ce', wordBreak: 'break-all' }}
            >
                {part}
            </a>
        ) : (
            part
        )
    );
}

export default ChatWindow;