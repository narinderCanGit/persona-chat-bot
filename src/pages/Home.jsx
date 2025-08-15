import React, { useState } from 'react';
import { Box, Grid, Fade, Typography, Paper } from '@mui/material';
import PersonaCard from '../components/PersonaCard';
import ChatWindow from '../components/ChatWindow';

const personas = [
    {
        id: 'hitesh',
        name: 'Hitesh Choudhary',
        image: 'https://avatars.githubusercontent.com/u/11613311?v=4',
        description:
            'Educator, founder of Chai Aur Code, passionate about simplifying tech for everyone.',
    },
    {
        id: 'piyush',
        name: 'Piyush Garg',
        image: 'https://avatars.githubusercontent.com/u/44976328?v=4',
        description:
            'Software engineer and educator, known for analytical and structured teaching.',
    },
];

const Home = ({ mode }) => {
    const [selectedPersona, setSelectedPersona] = useState(null);

    const handleChatClick = (personaId) => setSelectedPersona(personaId);
    const handleCloseChat = () => setSelectedPersona(null);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100vw',
                background: mode === 'dark'
                    ? 'linear-gradient(135deg, #141e30 0%, #243b55 100%)'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                pt: { xs: 4, md: 8 },
                pb: 4,
                overflowX: 'hidden',
            }}
        >
            <Fade in timeout={800}>
                <Box
                    sx={{
                        mb: 5,
                        px: { xs: 2, md: 6 },
                        py: { xs: 3, md: 5 },
                        borderRadius: 4,
                        boxShadow: 12,
                        background: (theme) =>
                            theme.palette.mode === 'dark'
                                ? 'linear-gradient(135deg, rgba(44,62,80,0.95) 0%, rgba(52,73,94,0.95) 100%)'
                                : 'linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(230,240,255,0.96) 100%)',
                        maxWidth: 700,
                        width: '100%',
                        textAlign: 'center',
                        backdropFilter: 'blur(2px)',
                        border: (theme) =>
                            theme.palette.mode === 'dark'
                                ? '1.5px solid rgba(255,255,255,0.08)'
                                : '1.5px solid #e0eafc',
                        transition: 'background 0.3s',
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 900,
                            letterSpacing: 2,
                            mb: 2,
                            fontFamily: 'Montserrat, Poppins, sans-serif',
                            color: (theme) =>
                                theme.palette.mode === 'dark'
                                    ? '#e0eafc'
                                    : '#4b2067',
                            textShadow: (theme) =>
                                theme.palette.mode === 'dark'
                                    ? '0 2px 8px #000'
                                    : '0 2px 8px #bdbdbd',
                        }}
                    >
                        👋 Welcome to Your AI Companion
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: (theme) =>
                                theme.palette.mode === 'dark'
                                    ? '#b2c2e0'
                                    : '#5d3fa0',
                            fontWeight: 500,
                            fontFamily: 'Poppins, Montserrat, sans-serif',
                            mb: 1,
                        }}
                    >
                        Select a persona to get insights, advice, and a dash of personality in every reply.
                    </Typography>
                </Box>
            </Fade>
            <Fade in={!selectedPersona} timeout={600} unmountOnExit>
                <Grid container spacing={4} justifyContent="center">
                    {personas.map((persona, idx) => (
                        <Grid item key={persona.id}>
                            <Fade in={!selectedPersona} timeout={600 + idx * 200}>
                                <div>
                                    <PersonaCard
                                        id={persona.id}
                                        name={persona.name}
                                        description={persona.description}
                                        image={persona.image}
                                        onChatClick={setSelectedPersona}
                                    />
                                </div>
                            </Fade>
                        </Grid>
                    ))}
                </Grid>
            </Fade>
            <Fade in={!!selectedPersona} timeout={600} unmountOnExit>
                <Box>
                    {selectedPersona && (
                        <ChatWindow
                            personaId={selectedPersona}
                            onClose={handleCloseChat}
                        />
                    )}
                </Box>
            </Fade>
        </Box>
    );
};

export default Home;