import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { getTheme } from './theme';
import Home from './pages/Home';

const App = () => {
  const [mode, setMode] = useState('light');
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box>
          <Routes>
            <Route path="/" element={<Home mode={mode} setMode={setMode} />} />
          </Routes>
          <Box sx={{ textAlign: 'center', py: 2, color: 'text.secondary', fontSize: 14 }}>
            &copy; {new Date().getFullYear()} Narinder Kumar Persona Chat. All rights reserved.
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;