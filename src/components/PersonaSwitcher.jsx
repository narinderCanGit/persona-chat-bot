import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';

const personas = [
  { name: 'Hitesh Choudhary', id: 'hitesh' },
  { name: 'Piyush Garg', id: 'piyush' },
];

const PersonaSwitcher = ({ onPersonaSelect }) => {
  const [selectedPersona, setSelectedPersona] = useState(personas[0].id);

  const handlePersonaChange = (personaId) => {
    setSelectedPersona(personaId);
    onPersonaSelect(personaId);
  };

  return (
    <Box display="flex" justifyContent="center" mb={2}>
      {personas.map((persona) => (
        <Box key={persona.id} mx={1}>
          <Button
            variant={selectedPersona === persona.id ? 'contained' : 'outlined'}
            onClick={() => handlePersonaChange(persona.id)}
          >
            {persona.name}
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default PersonaSwitcher;