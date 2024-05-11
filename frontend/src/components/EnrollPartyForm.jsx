import React, { useState } from 'react';
import { styled, ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff9933',
    },
    secondary: {
      main: '#138808',
    },
  },
});

const EnrollPartyForm = () => {
  const [partyName, setPartyName] = useState('');
  const [partyLeader, setPartyLeader] = useState('');
  const [partySymbol, setPartySymbol] = useState('');

  const handleEnrollParty = async () => {
    try {
      const response = await fetch('http://localhost:5000/enroll-party', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          partyName,
          partyLeader,
          partySymbol,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Log success message
        // Reset form fields or perform any other action upon successful enrollment
      } else {
        console.error('Failed to enroll party:', response.statusText);
        // Handle error or display error message to user
      }
    } catch (error) {
      console.error('Error enrolling party:', error);
      // Handle error or display error message to user
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Enroll Party
        </Typography>
        <TextField
          label="Party Name"
          variant="outlined"
          fullWidth
          value={partyName}
          onChange={(e) => setPartyName(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Party Leader"
          variant="outlined"
          fullWidth
          value={partyLeader}
          onChange={(e) => setPartyLeader(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Party Symbol"
          variant="outlined"
          fullWidth
          value={partySymbol}
          onChange={(e) => setPartySymbol(e.target.value)}
          margin="normal"
          required
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleEnrollParty}>
            Enroll Party
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default EnrollPartyForm;
