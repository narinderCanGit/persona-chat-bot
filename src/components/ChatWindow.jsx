import React, { useState, useRef, useEffect } from 'react';
import { getPersonaResponse } from '../api/openai';
import { TextField, Button, Typography, Box, Avatar, IconButton, CircularProgress, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import TypingIndicator from './TypingIndicator';

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

const ChatWindow = ({ personaId, onClose }) => {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory, loading]);

    const handleInputChange = (event) => setUserInput(event.target.value);

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
                <Tooltip title="Online">
                    <FiberManualRecordIcon sx={{ color: '#25d366', fontSize: 18, mr: 1 }} />
                </Tooltip>
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
                    background: (theme) =>
                        theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, #232526 0%, #0f2027 100%)'
                            : 'linear-gradient(135deg, #e0eafc 0%, #a1c4fd 100%)',
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
                        }}
                    >
                        {chat.message}
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