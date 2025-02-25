import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './vaultStyle.css';

export function Vault() {
  const navigate = useNavigate();
  const [videoGames, setVideoGames] = useState([
    { name: 'Mario Kart', imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$' },
    { name: 'Mario Kart', imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$' },
    { name: 'Mario Kart', imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$' },
    { name: 'Mario Kart', imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$' },
    { name: 'Mario Kart', imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$' },
    { name: 'Mario Kart', imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$' },
    { name: 'Mario Kart', imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$' },
    { name: 'Mario Kart', imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$' },
  ]);
  const [boardGames, setBoardGames] = useState([
    { name: 'Mario Kart', imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$' },
    { name: 'Mario Kart', imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$' },
    { name: 'Mario Kart', imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$' },
    { name: 'Mario Kart', imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$' },
    { name: 'Mario Kart', imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$' },
    { name: 'Mario Kart', imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$' },
    { name: 'Mario Kart', imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$' },
    { name: 'Mario Kart', imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$' },
  ]);
  const [cardGames, setCardGames] = useState([
    { name: 'Mario Kart', imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$' }, 
    { name: 'Mario Kart', imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$' },
    { name: 'Mario Kart', imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$' },
    { name: 'Mario Kart', imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$' },
    { name: 'Mario Kart', imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$' },
    { name: 'Mario Kart', imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$' },
    { name: 'Mario Kart', imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$' },
    { name: 'Mario Kart', imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$' },
  ]);
  
  const [newGame, setNewGame] = useState('');

  const handleInfoClick = () => {
    navigate('/info');
  };

  const handleNewGameChange = (event) => {
    setNewGame(event.target.value);
  };

  const handleAddGame = () => {
    if (newGame.trim() !== '') {
      setGames([...games, { name: newGame, imgSrc: 'https://via.placeholder.com/150' }]);
      setNewGame('');
    }
  };

  return (
    <main className="container-fluid bg-secondary text-center">
      <div>
        <h3 className="titleWords"> Your Vault</h3>
        <h2 className='scrollTitle'> Video Games </h2>
        <div className="scrollmenu">
          {videoGames.map((game, index) => (
            <button key={index} onClick={handleInfoClick}>
              <img alt={game.name} src={game.imgSrc} /><br />{game.name}
            </button>
          ))}
        </div>
        <label htmlFor="search"> Add new game: </label>
        <input type="search" id="search" name="varSearch" value={newGame} onChange={handleNewGameChange} />
        <button onClick={handleAddGame}>Submit</button>
        <div>
          <br />
          <br />
        </div>
        <h2 className='scrollTitle'> Board Games </h2>
        <div className="scrollmenu">
          {boardGames.map((game, index) => (
            <button key={index} onClick={handleInfoClick}>
              <img alt={game.name} src={game.imgSrc} /><br />{game.name}
            </button>
          ))}
        </div>
        <label htmlFor="search"> Add new game: </label>
        <input type="search" id="search" name="varSearch" value={newGame} onChange={handleNewGameChange} />
        <button onClick={handleAddGame}>Submit</button>
        <div>
          <br />
          <br />
        </div>
        <h2 className='scrollTitle'> Card Games </h2>
        <div className="scrollmenu">
          {cardGames.map((game, index) => (
            <button key={index} onClick={handleInfoClick}>
              <img alt={game.name} src={game.imgSrc} /><br />{game.name}
            </button>
          ))}
        </div>
        <label htmlFor="search"> Add new game: </label>
        <input type="search" id="search" name="varSearch" value={newGame} onChange={handleNewGameChange} />
        <button onClick={handleAddGame}>Submit</button>
      </div>
      <div>
        <br />
        <br />
      </div>
    </main>
  );
}