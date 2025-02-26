import React from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

export function Login({setUser}) {
  const [userText, setUserText] = React.useState('');
  const [passText, setPassText] = React.useState('');
  const navigate = useNavigate();

  function userTextChange(event) {
    setUserText(event.target.value);
  }
  function passTextChange(event) {
    setPassText(event.target.value);
  }

  function registerUser() {
    localStorage.setItem('user', userText);
    localStorage.setItem('password', passText);
    setUser(userText)
  }

  function loginUser() {
    if (localStorage.getItem('user') === userText && localStorage.getItem('password') === passText) {
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
          <input className='inputBox' type="text" placeholder="your name here" onChange={userTextChange}/>
        </li>
        <li>
          <label className='frontText' htmlFor="password">Password: </label>
          <input className='inputBox' type="password" placeholder="your password here" onChange={passTextChange}/>
        </li>
        <div className='center'> 
          <button className='buttons' type="button" onClick={registerUser}>Register</button>
          <button className='buttons' type="button" onClick={loginUser}>Login</button>
        </div>
      </div> 
    </main>
  );
}