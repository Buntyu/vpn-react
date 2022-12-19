import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Container, Grid, Input, Link, Select, MenuItem } from "@mui/material";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import PaidIcon from '@mui/icons-material/Paid';
import { PayWithStripe, SubscribeWithStripe } from "../services/account.service";
import { useState } from 'react';

const Payment = ({ accountId, accountManager }) => {
  return(
  <>
    { accountManager !== ""
      ? <GotoAccountManagement accountManager={accountManager} />
      : <PaymentAccordian accountId={accountId} />
    }
  </>
  )
}

const GotoAccountManagement = ({ accountManager }) => {
  return(
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>Active Subscription</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Grid
        container
        spacing={4}
        justify="center">
          <Grid item xs={12} sm={6} md={4}>
            <Link href={accountManager}>Manage My Subscription</Link>
          </Grid>
      </Grid>
    </AccordionDetails>
  </Accordion>
  )
}

const PaymentAccordian = ({ accountId }) => {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
      <Typography>Make Paymemt</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Grid
        container
        spacing={4}
        justify="center">
          <Grid item xs={12} sm={6} md={4}>
            <PaymentCardStripe />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PaymentCardCash />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PaymentCardCrypto />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PaymentCardStripeSubscribe />
          </Grid>
      </Grid>
    </AccordionDetails>

      </Accordion>
    )

}

const PaymentCardStripe = ({ accountId }) => {
  const [plan, setPlan] = useState(30);

  function PayWithStripeRedirect(){
    PayWithStripe(accountId,plan)
    .then(jsonObj => {
      if(jsonObj["redirect"]){
        window.location = jsonObj["url"]
      }
    })
    .catch(err => {
      console.log("Payment.PaymentCardStripe has err: ", err)
    })
  }

  const handlePlanChange = (event) => {
    setPlan(event.target.value);
  };

  return (
    <Card sx={{ maxWidth:275, backgroundColor:'divider' }}>
      <CardHeader title="Pay with Stripe" />
      <CardMedia>
      <Grid
        container
        spacing={4}
        justifyContent="center">
          <Grid item xs={6} sm={4} >
           <CreditCardIcon variant="outlined" align="center" sx={{ fontSize: 60 }}/>
           </Grid>
      </Grid>
      </CardMedia>
      <CardContent>
        <Typography variant="body2">
          Redirect to stripe checkout to complete transaction, Time will be credited when we are notified by stripe
        </Typography>
      </CardContent>
      <CardActions>
        <Select
        labelId="pay-stripe-select-plan"
        id="pay-stripe-select-plan"
        value={plan}
        label="Plan"
        onChange={handlePlanChange}
        >
          <MenuItem value={30}>Month</MenuItem>
          <MenuItem value={365}>Year</MenuItem>
        </Select>
        <Button size="small" type="submit" onClick={PayWithStripeRedirect}>Pay Now</Button>
        <Button size="small" color="secondary">Stripe Info</Button>
      </CardActions>
    </Card>
  )
}

const PaymentCardStripeSubscribe = ({ accountId }) => {
  function SubscribeWithStripeRedirect(){
    SubscribeWithStripe(accountId)
    .then(jsonObj => {
      if(jsonObj["redirect"]){
        window.location = jsonObj["url"]
      }
    })
    .catch(err => {
      console.log("Payment.PaymentCardStripe has err: ", err)
    })
  }

  return (
    <Card sx={{ maxWidth:275, backgroundColor:'divider' }}>
      <CardHeader title="Subscribe with Stripe" />
      <CardMedia>
      <Grid
        container
        spacing={4}
        justifyContent="center">
          <Grid item xs={6} sm={4} >
           <CreditCardIcon variant="outlined" align="center" sx={{ fontSize: 60 }}/>
           </Grid>
      </Grid>
      </CardMedia>
      <CardContent>
        <Typography variant="body2">
          Redirect to stripe checkout to complete subscription, Time will be credited when we are notified by stripe
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" type="submit" onClick={SubscribeWithStripeRedirect}>Pay Now</Button>
        <Button size="small" color="secondary">Stripe Info</Button>
      </CardActions>
    </Card>
  )
}


const PaymentCardCash = ({ accountId }) => {
  return (
    <Card sx={{ maxWidth:275, backgroundColor:'divider' }}>
      <CardHeader title="Pay with Cash" />
      <CardMedia>
      <Grid
        container
        spacing={4}
        justifyContent="center">
          <Grid item xs={6} sm={4} >
         <AttachMoneyIcon variant="outlined" align="center" sx={{ fontSize: 60 }}/>
         </Grid>
      </Grid>
      </CardMedia>
      <CardContent>
        <Typography variant="body2">
          Pay with Cash by mail
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" type="submit">Pay Now</Button>
        <Button size="small" color="secondary">Cash Info</Button>
      </CardActions>
    </Card>
  )
}

const PaymentCardCrypto = ({ accountId }) => {
  return (
    <Card sx={{ maxWidth:275, backgroundColor:'divider' }}>
      <CardHeader title="Pay with Crypto" />
      <CardMedia>
      <Grid
        container
        spacing={4}
        justifyContent="center">
          <Grid item xs={6} sm={4} >
         <PaidIcon variant="outlined" align="center" sx={{ fontSize: 60 }}/>
         </Grid>
      </Grid>
      </CardMedia>
      <CardContent>
        <Typography variant="body2">
          Pay with Crypto currency 
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" type="submit">Pay Now</Button>
        <Button size="small" color="secondary">Crypto Info</Button>
      </CardActions>
    </Card>
  )
}

export default Payment;