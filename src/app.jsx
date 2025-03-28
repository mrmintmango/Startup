import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Info } from './vault/info';
import { Friends } from './friends/friends';
import { Vault } from './vault/vault';
import { PrivateRoute } from './PrivateRoute';

export default function App() {
  const [user, setUser] = React.useState(localStorage.getItem('user') || null);

  return (
    <BrowserRouter>
      <div className="body bg-dark text-light">
        <ul className="navigation">
          <li><NavLink to=''>Login</NavLink></li>
          {user && <li><NavLink to='vault'>Vault</NavLink></li>}
          {user && <li><NavLink to='friends'>Friends</NavLink></li>}
          {user && <p className="userName">{user}</p>}
        </ul>

        <div className="page-wrapper">
          <Routes>
            <Route path='/' element={<Login setUser={setUser}/>} exact />
            <Route path='/vault' element={
              <PrivateRoute user={user}>
                <Vault />
              </PrivateRoute>
            } />
            <Route path='/info' element={<Info />} />
            <Route path='/friends' element={
              <PrivateRoute user={user}>
                <Friends />
              </PrivateRoute>
            } />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>

        <footer>
          <div></div>
          <p>created by Ruben Matos</p><a href="https://github.com/mrmintmango/Startup"> my Github! </a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}