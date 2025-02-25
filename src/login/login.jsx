import React from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [user, setUser] = React.useState('');
  const [password, setPass] = React.useState('');
  const navigate = useNavigate();

  function userText(text) {
    setUser(text.target.value);
  }
  function passText(text) {
    setPass(text.target.value);
  }

  function registerUser() {
    localStorage.setItem('user', user);
    localStorage.setItem('password', password);
  }

  function loginUser() {
    if (localStorage.getItem('user') === user && localStorage.getItem('password') === password) {
      navigate('/vault');
    } else {
      alert('Invalid username or password');
    }
  }

  return (
    <main className='mainLogin'>
      <h2 className='titleWords'>the Game Vault</h2>
      <div className="wrapper">
        <p className="login"> Login </p>
        <li>
          <label className='frontText' htmlFor="text">Username: </label>
          <input className='inputBox' type="text" placeholder="your name here" onChange={userText}/>
        </li>
        <li>
          <label className='frontText' htmlFor="password">Password: </label>
          <input className='inputBox' type="password" placeholder="your password here" onChange={passText}/>
        </li>
        <div className='center'> 
          <button className='buttons' type="button" onClick={registerUser}>Register</button>
          <button className='buttons' type="button" onClick={loginUser}>Login</button>
        </div>
      </div> 
    </main>
  );
}