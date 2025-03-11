import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

export function Login({ setUser }) {
  const [userText, setUserText] = useState('');
  const [passText, setPassText] = useState('');
  const [displayError, setDisplayError] = useState('');
  const navigate = useNavigate();

  function userTextChange(event) {
    setUserText(event.target.value);
  }
  function passTextChange(event) {
    setPassText(event.target.value);
  }

  async function loginUser() {
    const endpoint = '/api/auth/login';
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ username: userText, password: passText }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('user', userText);
      localStorage.setItem('password', passText);
      setUser(userText);
      navigate('/vault');
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  async function registerUser() {
    const endpoint = '/api/auth/register';
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ username: userText, password: passText }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('user', userText);
      localStorage.setItem('password', passText);
      setUser(userText);
      navigate('/vault');
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  async function logoutUser() {
    const endpoint = '/api/auth/logout';
    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.removeItem('user');
      localStorage.removeItem('password');
      setUser(null);
      navigate('/');
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <main className='mainLogin'>
      <h2 className='titleWords'>the Game Vault</h2>
      <div className="wrapper">
        <p className="login"> Login </p>
        <li>
          <label className='frontText' htmlFor="text">Username: </label>
          <input className='inputBox' type="text" placeholder="your name here" onChange={userTextChange} />
        </li>
        <li>
          <label className='frontText' htmlFor="password">Password: </label>
          <input className='inputBox' type="password" placeholder="your password here" onChange={passTextChange} />
        </li>
        <div className='center'>
          <button className='buttons' type="button" onClick={registerUser}>Register</button>
          <button className='buttons' type="button" onClick={loginUser}>Login</button>
          <button className='buttons' type="button" onClick={logoutUser}>Logout</button>
        </div>
        {displayError && <p className="error">{displayError}</p>}
      </div>
    </main>
  );
}