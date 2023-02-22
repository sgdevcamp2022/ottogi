<<<<<<< HEAD
import Router from "./routes/router";
import { Cookies, withCookies } from "react-cookie";

export const cookies = new Cookies();
=======
import React from 'react';
import logo from './logo.svg';
import './App.css';
>>>>>>> 15ec666afa6c7d7599d0c8422b632e9266e55f81

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default withCookies(App);
