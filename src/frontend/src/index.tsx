<<<<<<< HEAD
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "./styles/globalStyle";
import theme from "./styles/theme";
import { CookiesProvider } from "react-cookie";
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
>>>>>>> 15ec666afa6c7d7599d0c8422b632e9266e55f81

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
<<<<<<< HEAD
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CookiesProvider>
        <BrowserRouter>
          <GlobalStyle />
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </BrowserRouter>
      </CookiesProvider>
    </ThemeProvider>
  </QueryClientProvider>
=======
  <React.StrictMode>
    <App />
  </React.StrictMode>
>>>>>>> 15ec666afa6c7d7599d0c8422b632e9266e55f81
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
