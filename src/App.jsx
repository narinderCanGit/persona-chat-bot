import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline, IconButton, Box } from '@mui/material';
import { getTheme } from './theme';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Home from './pages/Home';

const App = () => {
  const [mode, setMode] = useState('light');
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
          <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
            <IconButton onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} color="inherit">
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Box>
          <Routes>
            <Route path="/" element={<Home mode={mode} />} />
          </Routes>
          <Box sx={{ textAlign: 'center', py: 2, color: 'text.secondary', fontSize: 14 }}>
            &copy; {new Date().getFullYear()} Narinder Kumar LLM Persona Chat. All rights reserved.
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;