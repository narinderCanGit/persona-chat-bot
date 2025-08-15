import React, { useState } from 'react';
import { Box, Grid, Fade, Typography } from '@mui/material';
import PersonaCard from '../components/PersonaCard';
import ChatWindow from '../components/ChatWindow';

const personas = [
    {
        id: 'hitesh',
        name: 'Hitesh Choudhary',
        image: 'https://avatars.githubusercontent.com/u/11613311?v=4',
        description: 'Educator, founder of Chai Aur Code, passionate about simplifying tech for everyone.',
    },
    {
        id: 'piyush',
        name: 'Piyush Garg',
        image: 'https://avatars.githubusercontent.com/u/13762004?v=4',
        description: 'Software engineer and educator, known for analytical and structured teaching.',
    },
];

const Home = () => {
    const [selectedPersona, setSelectedPersona] = useState(null);

    const handleChatClick = (personaId) => {
        setSelectedPersona(personaId);
    };

    const handleCloseChat = () => {
        setSelectedPersona(null);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, letterSpacing: 1 }}>
                Welcome to LLM Persona Chat
            </Typography>
            <Fade in={!selectedPersona} timeout={600} unmountOnExit>
                <Grid container spacing={3} justifyContent="center">
                    {personas.map((persona, idx) => (
                        <Grid item key={persona.id}>
                            <Fade in={!selectedPersona} timeout={600 + idx * 200}>
                                <div>
                                    <PersonaCard
                                        name={persona.name}
                                        description={persona.description}
                                        image={persona.image}
                                        onChatClick={() => handleChatClick(persona.id)}
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
                        <ChatWindow personaId={selectedPersona} onClose={handleCloseChat} />
                    )}
                </Box>
            </Fade>
        </Box>
    );
};

export default Home;