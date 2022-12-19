import { Button, Chip, Alert, Grid, Typography } from "@mui/material";
import React from "react";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const AccountInfo = ({ handleLogout, accountId, timeout, status }) => {
  const statusColor = status === "Inactive" ? 'error' : 'success'
    return (
        <>
         <Grid container spacing={2} >
           <Grid item xs={2}>
            <Typography variant="h4">Account</Typography>
           </Grid>
           <Grid item xs={4}>
             <Chip label={status} size="small" color={statusColor}/>
           </Grid>
           <Grid item xs={4} />
           <Grid item xs={12}>
             <Typography variant="h4">{accountId}</Typography>
           </Grid>
           <Grid item xs={8}>
              {  status === "Inactive"
              ? <Typography variant="body1">Last Valid on { new Date(timeout * 1000).toDateString() }</Typography>
              : <Typography>Valid through { new Date(timeout * 1000).toDateString() }</Typography>
              }
           </Grid>
           <Grid item xs={4}>
             <Button
               color="primary"
               variant="contained"
               onClick={handleLogout}
               endIcon={<ExitToAppIcon />} >
               Logout
              </Button>
           </Grid>
         </Grid>
        
        { status === "Inactive" &&
        <Alert severity="warning">Account is Inactive, Keys can be managed but tunnels cannot be established until a payment is made</Alert>
        }
        </>
    )

}

export default AccountInfo;