import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, Controller } from 'react-hook-form';
import authService from '../../services/auth.service';
import { useClasses } from '../MaterialUtils';

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

const Form = ({ handleClose}) => {
  const classes = useClasses(styles);
  const { handleSubmit, control } = useForm();

  const onSignup = data => {
    authService.register()
    .then((account) => {
      handleClose({account: account.uuid})
    })
  }

  const onSubmit = data => {
    handleClose(data)
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Controller
        name="account"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Account Id"
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
          required: 'account required',
          pattern: {
            value:
            /^[a-fA-F0-9\-]+$$/,
            message: 'Enter use a valid account',
          },
        }}
      />
      <div>
        <Button 
          variant="contained"
          color="primary"
          onClick={onSignup} 
        >
          Sign up
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Sign In
        </Button>
      </div>
    </form>
  );
};

export default Form;

