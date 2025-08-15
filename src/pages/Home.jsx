import React, { useState } from 'react';
import { Box, Grid, Fade, Typography } from '@mui/material';
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
            {!selectedPersona && (
                <Fade in timeout={800}>
                    <div style={{ marginBottom: 40, width: '100%', textAlign: 'center' }}>
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
                                        : '#b2c2e0',
                                fontWeight: 500,
                                fontFamily: 'Poppins, Montserrat, sans-serif',
                                mb: 1,
                            }}
                        >
                            Select a persona to get insights, advice, and a dash of personality in every reply.
                        </Typography>
                    </div>
                </Fade>
            )}
            {!selectedPersona && (
                <Fade in timeout={600} unmountOnExit>
                    <Grid container spacing={4} justifyContent="center">
                        {personas.map((persona, idx) => (
                            <Grid item key={persona.id}>
                                <Fade in timeout={600 + idx * 200}>
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
            )}
            {selectedPersona && (
                <Fade in timeout={600} unmountOnExit>
                    <Box
                        sx={{
                            width: '100vw',
                            height: '100vh',
                            minHeight: '100vh',
                            minWidth: '100vw',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            zIndex: 1200,
                            background: mode === 'dark'
                                ? 'linear-gradient(135deg, #141e30 0%, #243b55 100%)'
                                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: 0,
                            overflow: 'hidden',
                            boxShadow: 'none',
                        }}
                    >
                        <ChatWindow
                            personaId={selectedPersona}
                            onClose={handleCloseChat}
                            sx={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 4,
                                overflow: 'hidden',
                                position: 'relative',
                                boxShadow: (theme) =>
                                    theme.palette.mode === 'dark'
                                        ? '0 4px 16px rgba(0,0,0,0.3)'
                                        : '0 4px 16px rgba(0,0,0,0.1)',
                            }}
                        />
                    </Box>
                </Fade>
            )}
        </Box>
    );
};

export default Home;