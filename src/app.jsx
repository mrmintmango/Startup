import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Info } from './vault/info';
import { Friends } from './friends/friends';
import { Vault } from './vault/vault';

export default function App() {
  const [user, setUser] = React.useState(localStorage.getItem('user') || null);
  //const [password, setPass] = React.useState(localStorage.getItem('password') || null);

    return (
      <BrowserRouter>
        <div className="body bg-dark text-light">
            <ul className="navigation">
                <li><NavLink to=''>Login</NavLink></li>
                {user && <li><NavLink to='vault'>Vault</NavLink></li>}
                {user && <li><NavLink to='friends'>Friends</NavLink></li>}
                <p className="userName">{user}</p>
            </ul>

            <Routes>
            <Route path='/' element={<Login setUser={setUser}/>} exact />
            <Route path='/vault' element={<Vault />} />
            <Route path='/info' element={<Info />} />
            <Route path='/friends' element={<Friends />} />
            <Route path='*' element={<NotFound />} />
            </Routes>

            <footer>
            <div></div>
            <p>created by Ruben Matos</p><a href="https://github.com/mrmintmango/Startup"> my Github! </a>
            </footer>
        </div>;
      </BrowserRouter>
    );
  }

  function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
  }