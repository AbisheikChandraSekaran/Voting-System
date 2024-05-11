import React, { useState, useEffect } from 'react';
import { Typography, IconButton, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ViewPartyPage = () => {
  const [parties, setParties] = useState([]);

  // Fetch parties from backend when component mounts
  useEffect(() => {
    fetchParties();
  }, []);

  const fetchParties = async () => {
    try {
      const response = await fetch('http://localhost:5000/parties');
      if (response.ok) {
        const data = await response.json();
        setParties(data.parties);
      } else {
        console.error('Failed to fetch parties:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching parties:', error);
    }
  };

  const handleEditParty = (partyId) => {
    // Implement edit functionality
  };

  const handleDeleteParty = async (partyId) => {
    try {
      const response = await fetch(`http://localhost:5000/parties/${partyId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the deleted party from the state
        setParties(parties.filter(party => party._id !== partyId));
        console.log('Party deleted successfully');
      } else {
        console.error('Failed to delete party:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting party:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom style={{ color: '#121481', fontWeight: 'bold' }}>
        Parties Registered
      </Typography>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: '#138808' }}>
            <TableCell style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Party Name</TableCell>
            <TableCell style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Party Leader</TableCell>
            <TableCell style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Party Symbol</TableCell>
            <TableCell style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {parties.map((party) => (
            <TableRow key={party._id}>
              <TableCell>{party.partyName}</TableCell>
              <TableCell>{party.partyLeader}</TableCell>
              <TableCell>{party.partySymbol}</TableCell>
              <TableCell>
              <IconButton onClick={() => handleEditParty(party._id)} style={{ color: '#FF9933' }} 
                  sx={{ '&:hover': { color: 'blue' } }}><EditIcon /></IconButton>
                <IconButton onClick={() => handleDeleteParty(party._id)} style={{ color: '#FF9933' }} 
                  sx={{ '&:hover': { color: 'blue' } }}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewPartyPage;
