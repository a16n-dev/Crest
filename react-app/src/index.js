import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ThemeProvider, CssBaseline, createMuiTheme} from '@material-ui/core'
import Theme from './theme/theme'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}> 
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

