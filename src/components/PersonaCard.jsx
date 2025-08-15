import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Avatar, Box } from '@mui/material';

const PersonaCard = ({ name, description, image, onChatClick }) => {
    return (
        <Card variant="outlined" sx={{ margin: 2, width: 320, boxShadow: 3 }}>
            <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                    <Avatar src={image} alt={name} sx={{ width: 56, height: 56, marginRight: 2 }} />
                    <Typography variant="h6">{name}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button fullWidth variant="contained" onClick={onChatClick}>
                    Chat Now
                </Button>
            </CardActions>
        </Card>
    );
};

export default PersonaCard;
