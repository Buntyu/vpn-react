import React from 'react';
import Dialog from '@mui/material/Dialog';
import Form from './Form';
import { DialogTitle } from '@mui/material';

const ModalDialog = ({ open, handleClose }) => {
  return (
    // props received from App.js
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Vpn Login</DialogTitle>
      <Form handleClose={handleClose} />
    </Dialog>
  );
};

export default ModalDialog;