import React from 'react';
import Dialog from '@mui/material/Dialog';
import { Button } from '@mui/material';
import { GenerateQRCode } from './GenerateQRCode';

const parseConfig = ( data ) => {
  const config =  '[Interface]\n' +
  'PrivateKey = '+data.private_key+'\n' +
  'Address = '+data.client_ip+'\n' +
  'DNS = '+data.dns+'\n' +
  '\n' +
  '[Peer]\n' +
  'PublicKey = '+data.server_key+'\n' +
  'AllowedIPs = 0.0.0.0/0, ::/0\n' +
  'Endpoint = '+ data.ipv4_address +':'+data.port+'\n';
  return config
}

const ConfigDisplayModal = ({ open, handleClose, data }) => {
const configString = parseConfig(data)
const qrcodeSize = 320
const qrcodeType = 'utf8'

  return (
    // props received from App.js
    <Dialog open={open} onClose={handleClose}>
      <GenerateQRCode string={configString} size={qrcodeSize} type={qrcodeType} />
      <div>
        <pre>{configString}</pre>
      </div>
      <Button variant='outlined' onClick={handleClose}>Close</Button>
    </Dialog>
  );
};

export default ConfigDisplayModal;
