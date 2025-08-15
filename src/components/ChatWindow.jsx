import React, { useState, useRef, useEffect } from 'react';
import { getPersonaResponse } from '../api/openai';
import { TextField, Button, Typography, Box, Avatar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const personaDetails = {
    hitesh: {
        name: 'Hitesh Choudhary',
        image: 'https://avatars.githubusercontent.com/u/11613311?v=4',
    },
    piyush: {
        name: 'Piyush Garg',
        image: 'https://avatars.githubusercontent.com/u/13762004?v=4',
    },
};

const ChatWindow = ({ personaId, onClose }) => {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleSendMessage = async () => {
        if (!userInput.trim()) return;

        // Prepare the new history including the user's message
        const newHistory = [...chatHistory, { sender: 'user', message: userInput }];

        setChatHistory(newHistory);
        setLoading(true);
        setUserInput('');

        try {
            // Pass the history so far (excluding the AI's reply, which isn't known yet)
            const aiReply = await getPersonaResponse(personaId, userInput, chatHistory);
            setChatHistory((prev) => [...prev, { sender: 'ai', message: aiReply }]);
        } catch (e) {
            setChatHistory((prev) => [...prev, { sender: 'ai', message: 'Error: ' + e.message }]);
        }

        setLoading(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !loading) {
            handleSendMessage();
        }
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
                background: '#ece5dd',
                position: 'relative',
            }}
        >
            {/* Header */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                background: '#075e54',
                color: '#fff',
                p: 2,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
            }}>
                <Avatar src={persona.image} alt={persona.name} sx={{ mr: 2 }} />
                <Typography variant="h6" sx={{ flexGrow: 1 }}>{persona.name}</Typography>
                <IconButton onClick={onClose} sx={{ color: '#fff' }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            {/* Chat Area */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    background: '#ece5dd',
                }}
            >
                {chatHistory.map((chat, index) => (
                    <Box
                        key={index}
                        sx={{
                            alignSelf: chat.sender === 'user' ? 'flex-end' : 'flex-start',
                            background: chat.sender === 'user' ? '#dcf8c6' : '#fff',
                            color: '#222',
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            maxWidth: '75%',
                            boxShadow: 1,
                        }}
                    >
                        {chat.message}
                    </Box>
                ))}
                <div ref={chatEndRef} />
            </Box>
            {/* Input Area */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                background: '#f7f7f7',
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
            }}>
                <TextField
                    variant="outlined"
                    fullWidth
                    value={userInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message"
                    disabled={loading}
                    sx={{ background: '#fff', borderRadius: 2 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendMessage}
                    disabled={loading || !userInput.trim()}
                    sx={{ ml: 2, minWidth: 80 }}
                >
                    {loading ? '...' : 'Send'}
                </Button>
            </Box>
        </Box>
    );
};

export default ChatWindow;