import React from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Info } from './Info/info';
import { Friends } from './friends/friends';
import { Time } from './time/time';
import { Vault } from './vault/vault';

export default function App() {
    return (
      <BrowserRouter>
        <div className="body bg-dark text-light">
            <ul class="navigation">
                <li><a href="index.html">Logout</a></li>
                <li><a href="vaultPage.html">Vault</a></li>
                <li class="active"><a href="gameTime.html">GameTime</a></li>
                <li><a href="friends.html">Friends</a></li>
            </ul>       

            <main>App componenets go here</main>

            <footer>
            <div></div>
            <p>created by Ruben Matos</p>
            <a href="https://github.com/mrmintmango/Startup"> my Github! </a>
            </footer>
        </div>;
      </BrowserRouter>
    );
  }