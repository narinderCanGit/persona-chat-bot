import React, { useState } from 'react';
import { Box, Grid, Fade, Typography, IconButton, Menu, MenuItem, ToggleButtonGroup, ToggleButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import TextFieldsIcon from '@mui/icons-material/TextFields';
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

const FONT_SIZES = {
    small: 12,
    medium: 16,
    large: 24,
};

const Home = ({ mode, setMode }) => {
    const [selectedPersona, setSelectedPersona] = useState(null);
    const [fontSize, setFontSize] = useState('medium');
    const [anchorEl, setAnchorEl] = useState(null);

    const handleCloseChat = () => setSelectedPersona(null);

    // Theme toggle
    const handleThemeToggle = () => setMode(mode === 'light' ? 'dark' : 'light');

    // Font size menu
    const handleFontMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleFontMenuClose = () => setAnchorEl(null);
    const handleFontSizeChange = (event, newSize) => {
        if (newSize) setFontSize(newSize);
        handleFontMenuClose();
    };

    // Provide font size as a number for sx
    const fontPx = FONT_SIZES[fontSize];

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
            {/* Top bar with theme and font size controls */}
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 2000,
                    px: 3,
                    py: 2,
                    background: 'transparent',
                    gap: 2,
                }}
            >
                <IconButton onClick={handleThemeToggle} color="inherit">
                    {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
                <IconButton onClick={handleFontMenuOpen} color="inherit">
                    <TextFieldsIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleFontMenuClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <ToggleButtonGroup
                        value={fontSize}
                        exclusive
                        onChange={handleFontSizeChange}
                        orientation="vertical"
                        size="small"
                        sx={{ mx: 1, my: 1 }}
                    >
                        <ToggleButton value="small">Small</ToggleButton>
                        <ToggleButton value="medium">Medium</ToggleButton>
                        <ToggleButton value="large">Large</ToggleButton>
                    </ToggleButtonGroup>
                </Menu>
            </Box>

            {/* Welcome and persona selection */}
            {!selectedPersona && (
                <Fade in timeout={800}>
                    <div style={{ marginBottom: 40, width: '100%', textAlign: 'center', marginTop: 80 }}>
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
                                        : '0 2px 8px #fff, 0 4px 16px #bdbdbd', // Add a strong white shadow for light mode
                                fontSize: fontPx + 10,
                                background: (theme) =>
                                    theme.palette.mode === 'light' ? 'rgba(255,255,255,0.7)' : 'transparent', // subtle background for light mode
                                borderRadius: 2,
                                px: 2,
                                py: 1,
                                display: 'inline-block',
                            }}
                        >
                            Welcome to Your AI Companion
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
                                fontSize: fontPx,
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
                                            fontSize={fontPx}
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
                            fontSize={fontPx}
                        />
                    </Box>
                </Fade>
            )}
        </Box>
    );
};

export default Home;