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
                <li><NavLink to=''>Logout</NavLink></li>
                <li><NavLink to='vault'>Vault</NavLink></li>
                <li><NavLink to='time'>GameTime</NavLink></li>
                <li><NavLink to='friends'>Friends</NavLink></li>
            </ul>       

            <main>App componenets go here</main>

            <Routes>
            <Route path='/' element={<Login />} exact />
            <Route path='/vault' element={<Vault />} />
            <Route path='/time' element={<Time />} />
            <Route path='/info' element={<Info />} />
            <Route path='/friends' element={<Friends />} />
            <Route path='*' element={<NotFound />} />
            </Routes>

            <footer>
            <div></div>
            <p>created by Ruben Matos</p>
            <a href="https://github.com/mrmintmango/Startup"> my Github! </a>
            </footer>
        </div>;
      </BrowserRouter>
    );
  }

  function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
  }