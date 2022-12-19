import React from 'react';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import ServerPicker from './Components/ServerPicker';
import ClientKeyEntry from './Components/ClientKeyEntry';
import { AddDevice } from './services/account.service';
import { useClasses
 } from './Components/MaterialUtils';
const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    paddingTop: theme.spacing(4),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
  link: {
    cursor: 'pointer',
  },
});

const DeviceForm = ({ handleClose , accountId}) => {
  const classes = useClasses(styles);
  const { handleSubmit, control, setValue} = useForm();

  const onSubmit = data => {
    AddDevice( accountId, { public_key: data.public_key, vpn_type: data.vpn_type})
      .then( result => {
        let dataclone =  JSON.parse(JSON.stringify(data))
        dataclone["client_ip"] = result.ipv4_address
        dataclone["uuid"] = result.uuid
        // console.log( "onSubmit dataclone is:", dataclone)
        return dataclone}  )
      .then( a_data => { handleClose(a_data)})
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)} noValidate>
      <ServerPicker control={control} setValue={setValue}/>
      <ClientKeyEntry control={control} setValue={setValue} />
      <div>
        <Button type="submit" variant="contained" color="primary">
          Add Device
        </Button>
      </div>
    </form>
  );
};

export default DeviceForm;

