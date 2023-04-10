import React from 'react';
import ReactDOM from 'react-dom';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import './config/axiosInterceptor'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './index.css';
import {BrowserRouter} from "react-router-dom";
import UserProvider from "./contexts/userContext";
import reportWebVitals from './reportWebVitals';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <CssVarsProvider>
{/*// @ts-ignore*/}
      <BrowserRouter>
        <UserProvider>
          <App />
        </UserProvider>
      </BrowserRouter>
    </CssVarsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
