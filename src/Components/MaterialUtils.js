import React, { useMemo, useState } from 'react';

import PropTypes from 'prop-types';

import { createTheme, adaptV4Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { css, useTheme } from '@emotion/react';
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  {/*
    <div> cannot appear as a descendant of <p>
    https://stackoverflow.com/a/53494821
  */}

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}


const styles =  theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  drawer: {
    fontHeight: '1rem',
    padding: '1rem',
  },
  fineprint: {
    fontSize: '0.8rem',
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
    width: '32em'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240,
    maxWidth: 480,
  },
  fullList: {
    width: 'auto',
  },
  input: {
    "&:invalid": {
      border: "red solid 2px",
    },
  },
  inputfield: {
    width: '32em',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  list: {
    width: 250,
  },
  margin: {
    margin: theme.spacing(1),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
  pre: {
    color: theme.palette.text.primary,
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
  textField: {
    width: '25ch',
  },
  timeField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '30char',
  },
  title: {
    flexGrow: 1,
  },
  warning: {
    fontSize: '0.8rem',
    color: theme.palette.text.primary,
    marginTop: theme.spacing(1),
    // width: '32em'
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
});

// https://material-ui.com/customization/palette/

const darkTheme = createTheme(adaptV4Theme({
  mode: 'dark',
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#0066cc',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      // light: will be calculated from palette.primary.main,
      main: '#cc6600',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    error: {
      // light: will be calculated from palette.primary.main,
      main: '#f44336',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    warning: {
      // light: will be calculated from palette.primary.main,
      main: '#ff9800',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    info: {
      // light: will be calculated from palette.primary.main,
      main: '#2196f3',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    success: {
      // light: will be calculated from palette.primary.main,
      main: '#4caf50',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    type: 'dark',
  },
  spacing: 8,
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
    ].join(','),
  },
}));

const darkAltTheme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#cc6600',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      // light: will be calculated from palette.primary.main,
      main: '#00cc66',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    error: {
      // light: will be calculated from palette.primary.main,
      main: '#f44336',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    warning: {
      // light: will be calculated from palette.primary.main,
      main: '#ff9800',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    info: {
      // light: will be calculated from palette.primary.main,
      main: '#2196f3',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    success: {
      // light: will be calculated from palette.primary.main,
      main: '#4caf50',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    type: 'dark',
  },
  spacing: 8,
});


const lightTheme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff6600',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      // light: will be calculated from palette.primary.main,
      main: '#0099ff',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    type: 'light',
  },
  spacing: 8,
});

function LinearIndeterminate() {
  const classes = useClasses({});

  return (
    <div className={classes.root}>
      <LinearProgress />
    </div>
  )
}

const useClasses = stylesElement => {
  const theme = useTheme();
  return useMemo(() => {
    const rawClasses = typeof stylesElement === 'function'
      ? stylesElement(theme)
      : stylesElement;
    const prepared = {};
    /*
    Object.entries(styles(theme)).forEach(([key, value = {}]) => {
      prepared[key] = css(value);
    });
   */

    Object.entries(rawClasses).forEach(([key, value = {}]) => {
      prepared[key] = css(value);
    });

    return prepared;
  }, [stylesElement, theme]);
};

export { useClasses, darkTheme, darkAltTheme, lightTheme, LinearIndeterminate, TabPanel, a11yProps };
