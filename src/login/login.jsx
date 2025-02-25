import React from 'react';
import './login.css';
import { NavLink } from 'react-router-dom';

export function Login() {
  const [user, setUser] = React.useState('');
  const [password, setPass] = React.useState('');

  function userText(text) {
    setUser(text.target.value);
  }
  function passText(text) {
    setPass(text.target.value);
  }

  return (
    <main className='mainLogin'>
      <h2 className='titleWords'>the Game Vault</h2>
      <div className="wrapper">
        <p className="login"> Login </p>
        <li>
          <label className='frontText' for="text">Username: </label>
          <input className='inputBox' type="text" placeholder="your name here" onChange={userText}/>
        </li>
        <li>
          <label className='frontText' for="password">Password: </label>
          <input className='inputBox' type="text" placeholder="your name here" onChange={passText}/>
        </li>
        <div className='center'> 
        <button className='buttons' type="button">Register</button><button className='buttons' type="button">Login</button><div></div>
        </div>
      </div> 
    </main>
  );
}