import React from "react";
import { Controller } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import GenerateKeyPair from "./GenerateKeyPair";

const ClientKeyEntry = ({ control, setValue }) => {

    const generateKeyPair = () =>{
        const generated = GenerateKeyPair()
        setValue('private_key', generated.private_key);
        setValue('public_key', generated.public_key )
    }

    return <>
    <Button onClick={generateKeyPair} variant="outlined"> Generate KeyPair </Button>
    <Controller
    name="private_key"
    control={control}
    defaultValue=""
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <TextField
        label="Private key"
        variant="outlined"
        value={value}
        onChange={onChange}
        error={!!error}
        helperText={error ? error.message : null}
        type="text"
        fullWidth
      />
    )}
    rules={{
      required: 'Private key required',
      pattern: {
        value:
        /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/,
        message: 'Enter use a valid public key',
      },
    }}
  />
  <Controller
    name="public_key"
    control={control}
    defaultValue=""
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <TextField
        label="Public key"
        variant="outlined"
        value={value}
        onChange={onChange}
        error={!!error}
        helperText={error ? error.message : null}
        type="text"
        fullWidth
      />
    )}
    rules={{
      required: 'Public key required',
      pattern: {
        value:
        /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/,
        message: 'Enter use a valid public key',
      },
    }}
  />
    </>;
}

export default ClientKeyEntry