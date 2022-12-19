import React from 'react';
import Dialog from '@mui/material/Dialog';
import DeviceForm from './DeviceForm';

const NewDeviceDialog = ({ open, handleClose, accountId}) => {
  return (
    // props received from App.js
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DeviceForm handleClose={handleClose} accountId={accountId} />
    </Dialog>
  );
};

export default NewDeviceDialog;