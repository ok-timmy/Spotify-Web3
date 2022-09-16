import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
import { SpotifyProvider } from './Context/SpotifyContext';


ReactDOM.render(
  <React.StrictMode>
    {/* <MoralisProvider appId="4tm2g9vHdPGykGJ900aAih4tff03KAzgxR8xPehO" serverUrl="https://oumyv24uvnxi.usemoralis.com:2053/server"> */}
      <SpotifyProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </SpotifyProvider>
    {/* </MoralisProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
