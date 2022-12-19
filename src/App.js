import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import ModalDialog from './Components/login/modalDialog';
import Account from './Account';
import authService from './services/auth.service';
import { Container, CssBaseline, StyledEngineProvider } from '@mui/material';
import { darkTheme, useClasses } from './Components/MaterialUtils';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core';
import { ThemeProvider } from '@emotion/react';
import authHeader from './services/auth-header';
import Header from './Components/Header';
import Footer from './Components/Footer';

function App() {
  const classes = useClasses({});

  const [open, setOpen] = useState( () => authHeader() ? false : true)
  const [accountId, setAccountId] = useState("")



   // function to handle modal open
   const handleOpen = () => {
    setAccountId("");
    authService.logout()
    setOpen(true);
  };

  // function to handle modal close
  const handleClose = (data,reason) => {
    // console.log("App.handleClose",data)
    if( reason && reason == "backdropClick")
      return;
    setAccountId(data.account)
    setOpen(false);
  };

  return (
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={darkTheme}>
        <ThemeProvider theme={darkTheme}>
        <Header />
        <CssBaseline />
        <Container maxWidth="md">
        <ModalDialog open={open} handleClose={handleClose} />
          {  ! open   &&
             <Account handleLogout={handleOpen} accountId={accountId}/>
          }
          
          </Container>
        </ThemeProvider></MuiThemeProvider>
        <Footer />
      </StyledEngineProvider>
  );
}


export default App;
