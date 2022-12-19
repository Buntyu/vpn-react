import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import { MenuItem } from '@mui/material';
import  Select from '@mui/material/Select';
import { GetServers } from '../services/server.service';
import { useState } from 'react';


const ServerPicker = ({ control, setValue }) => { 
    const [serverList, setServerList] = useState([]);

    useEffect(() => {
        GetServers()
        .then(result => { 
          setServerList(result)
          if(result && result[0]) { setValue(result[0].id) }
        })
        .catch(err=>{
            console.log("GetServers failed with error:" , err)
        })
    }, [])

    const onServerChange = (e) => {
        const chosen_server = serverList.find( server => server.id ===  e.target.value) 
        // console.log("onServerChange server Lookup:" + JSON.stringify(chosen_server))
        setValue("server_name", chosen_server.name)
        setValue("ipv4_address", chosen_server.ipv4_address)
        setValue("server_key", chosen_server.public_key)
        setValue("dns", chosen_server.dns)
        setValue("port", 16628 )
        setValue("server_choice", e.target.value)
    } 

    return <>  
        <Controller
            name="server_choice"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
                <Select
                  label="Server Name"
                  variant="outlined"
                  value={value}
                  onChange={onServerChange}
                  fullWidth
                >
                    {serverList.map((server) => (
                        <MenuItem key={server.id} value={server.id}>
                            {server.name}
                        </MenuItem>
                    ))}
                </Select>
              )}
        />
        <Controller
        name="server_name"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Server Name"
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type="text"
            disabled
            fullWidth
          />
        )}
        rules={{
          required: 'Server Name required',
          pattern: {
            value:
             /^[a-zA-Z0-9-.]{1,63}$/,
            message: 'Enter use a valid server name',
          },
        }}
      />
      <Controller
        name="ipv4_address"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Server IP"
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type="text"
            disabled
            fullWidth
          />
        )}
      />
      <Controller
        name="server_key"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Server Key"
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            disabled
            helperText={error ? error.message : null}
            type="text"
            fullWidth
          />
        )}
        rules={{
          required: 'Server Key required',
          pattern: {
            value:
            /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/,
            message: 'Enter use a valid public key',
          },
        }}
      />
      <Controller
        name="dns"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="DNS IPaddress"
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type="text"
            disabled
            fullWidth
          />
        )}
        rules={{
          required: 'DNS IP Required',
          pattern: {
            value:
            /^([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)$/,
            message: 'Enter use a valid IP for DNS',
          },
        }}
      />
      <Controller
        name="port"
        control={control}
        defaultValue="16628"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Port"
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type="text"
            disabled
            fullWidth
          />
        )}
        rules={{
          required: 'port required',
          pattern: {
            value:
            /^([0-9]+)$/,
            message: 'Enter use a valid port',
          },
        }}
      />
    </>;

}

export default ServerPicker;