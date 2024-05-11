import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const EditPartyForm = ({ party, onUpdate, onClose }) => {
  const [partyName, setPartyName] = useState(party.partyName);
  const [partyLeader, setPartyLeader] = useState(party.partyLeader);
  const [partySymbol, setPartySymbol] = useState(party.partySymbol);

  const handleUpdateParty = () => {
    onUpdate(party._id, { partyName, partyLeader, partySymbol });
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Edit Party</DialogTitle>
      <DialogContent>
        <TextField
          label="Party Name"
          value={partyName}
          onChange={(e) => setPartyName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Party Leader"
          value={partyLeader}
          onChange={(e) => setPartyLeader(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Party Symbol"
          value={partySymbol}
          onChange={(e) => setPartySymbol(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdateParty} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPartyForm;