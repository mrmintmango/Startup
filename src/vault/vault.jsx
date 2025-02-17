import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Info } from './Info/info';

export function Vault() {
  return (
    <main className="container-fluid bg-secondary text-center">
      <div>
        <h3 className="titleWords"> Your Vault</h3>
        <h2 className='scrollTitle'> Video Games </h2>
        <div className="scrollmenu">
          <button><NavLink to='info'>Info</NavLink></button>
          <button><img alt="mario kart" src="https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$"/><br/>Mario Kart</button>
          <button><img alt="mario kart" src="https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$"/><br/>Mario Kart</button>
          <button><img alt="mario kart" src="https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$"/><br/>Mario Kart</button>
          <button><img alt="mario kart" src="https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$"/><br/>Mario Kart</button>
          <button><img alt="mario kart" src="https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$"/><br/>Mario Kart</button>
          <button><img alt="mario kart" src="https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$"/><br/>Mario Kart</button>
          <button><img alt="mario kart" src="https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$"/><br/>Mario Kart</button>
          <button><img alt="mario kart" src="https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$"/><br/>Mario Kart</button>
          <button><img alt="mario kart" src="https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$"/><br/>Mario Kart</button>
        </div>
        <label for="search"> Add new game: </label>
        <input type="search" id="search" name="varSearch" />
        <h2 className='scrollTitle'> Board Games </h2>
        <div className="scrollmenu">
          <button><img alt="mario kart" src="https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$"/><br/>Mario Kart</button>
          <button><img alt="mario kart" src="https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$"/><br/>Mario Kart</button>
          <button><img alt="mario kart" src="https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$"/><br/>Mario Kart</button>
          <button><img alt="mario kart" src="https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$"/><br/>Mario Kart</button>
          <button><img alt="mario kart" src="https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$"/><br/>Mario Kart</button>
          <button><img alt="mario kart" src="https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$"/><br/>Mario Kart</button>
          <button><img alt="mario kart" src="https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$"/><br/>Mario Kart</button>
          <button><img alt="mario kart" src="https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$"/><br/>Mario Kart</button>
          <button><img alt="mario kart" src="https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$"/><br/>Mario Kart</button>
        </div>
        <label for="search"> Add new game: </label>
        <input type="search" id="search" name="varSearch" />
        <h2 className='scrollTitle'> Card Games </h2>
        <div className="scrollmenu">
          <button><img alt="mario kart" src="https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$"/><br/>Mario Kart</button>
          <button><img alt="mario kart" src="https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$"/><br/>Mario Kart</button>
          <button><img alt="mario kart" src="https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$"/><br/>Mario Kart</button>
          <button><img alt="mario kart" src="https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$"/><br/>Mario Kart</button>
          <button><img alt="mario kart" src="https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$"/><br/>Mario Kart</button>
          <button><img alt="mario kart" src="https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$"/><br/>Mario Kart</button>
          <button><img alt="mario kart" src="https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$"/><br/>Mario Kart</button>
          <button><img alt="mario kart" src="https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$"/><br/>Mario Kart</button>
          <button><img alt="mario kart" src="https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$"/><br/>Mario Kart</button>
        </div>
        <label for="search"> Add new game: </label>
        <input type="search" id="search" name="varSearch" />
      </div>
    </main>
  );
}