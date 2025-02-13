import React from 'react';
import './login.css';
import { NavLink } from 'react-router-dom';

export function Login() {
  return (
    <main>
      <h2 className='titleWords'>the Game Vault</h2>
      <div className="wrapper">
        <p className="login"> Login </p>
        <li>
          <label className='frontText' for="text">Username: </label>
          <input className='inputBox' type="text" id="text" name="varText" placeholder="your name here" required pattern="[Aa].*" />
        </li>
        <li>
          <label className='frontText' for="password">Password: </label>
          <input className='inputBox' type="password" id="password" placeholder="your password here" name="varPassword" />
        </li>
        <div className='center'> 
        <button className='buttons' type="button" onclick="location.href='vaultPage.html'">Register</button><button className='buttons' type="button" onclick="location.href='vaultPage.html'">Login</button><div></div>
        </div>
      </div> 
    </main>
  );
}