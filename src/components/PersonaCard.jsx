import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Avatar, Box } from '@mui/material';

const PersonaCard = ({ id, name, description, image, onChatClick }) => (
  <Card
    variant="outlined"
    sx={{
      margin: 2,
      width: 340,
      height: 340,
      boxShadow: 8,
      borderRadius: 2,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      transition: 'transform 0.25s, box-shadow 0.25s',
      '&:hover': {
        transform: 'scale(1.05) translateY(-10px)',
        boxShadow: 16,
        borderColor: 'primary.main',
      },
      background: (theme) =>
        theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #232526 0%, #2c5364 100%)'
          : 'linear-gradient(135deg, #e0eafc 0%, #a1c4fd 100%)',
    }}
  >
    <CardContent>
      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        <Avatar src={image} alt={name} sx={{ width: 80, height: 80, mb: 2, border: '3px solid #25d366' }} />
        <Typography variant="h5" sx={{ fontWeight: 700, textAlign: 'center' }}>{name}</Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', fontSize: 16 }}>
        {description}
      </Typography>
    </CardContent>
    <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onChatClick(id)}
        sx={{
          fontWeight: 600,
          letterSpacing: 1,
          borderRadius: 2,
          px: 4,
          py: 1,
          background: 'linear-gradient(90deg, #25d366 0%, #075e54 100%)',
        }}
      >
        Chat Now
      </Button>
    </CardActions>
  </Card>
);

export default PersonaCard;
