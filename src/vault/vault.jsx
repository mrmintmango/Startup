import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './vaultStyle.css';

export function Vault() {
  const navigate = useNavigate();
  const location = useLocation();
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
  
  const [newVideoGame, setNewVideoGame] = useState('');
  const [newBoardGame, setNewBoardGame] = useState('');
  const [newCardGame, setNewCardGame] = useState('');
  const [friendName, setFriendName] = useState(localStorage.getItem('user'));

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const friend = params.get('friend');
    if (friend) {
      setFriendName(friend);
    }
  }, [location.search]);

  const handleInfoClick = (game) => {
    navigate(`/info?name=${game.name}`);
  };

  const handleNewVideoGameChange = (event) => {
    setNewVideoGame(event.target.value);
  };

  const handleNewBoardGameChange = (event) => {
    setNewBoardGame(event.target.value);
  };

  const handleNewCardGameChange = (event) => {
    setNewCardGame(event.target.value);
  };

  const handleAddVideoGame = () => {
    if (newVideoGame.trim() !== '') {
      setVideoGames([...videoGames, { name: newVideoGame, imgSrc: 'https://via.placeholder.com/150' }]);
      setNewVideoGame('');
    }
  };

  const handleAddBoardGame = () => {
    if (newBoardGame.trim() !== '') {
      setBoardGames([...boardGames, { name: newBoardGame, imgSrc: 'https://via.placeholder.com/150' }]);
      setNewBoardGame('');
    }
  };

  const handleAddCardGame = () => {
    if (newCardGame.trim() !== '') {
      setCardGames([...cardGames, { name: newCardGame, imgSrc: 'https://via.placeholder.com/150' }]);
      setNewCardGame('');
    }
  };

  return (
    <main className="container-fluid bg-secondary text-center">
      <div>
        <h3 className="titleWords"> {friendName}'s Vault</h3>
        <h2 className='scrollTitle'> Video Games </h2>
        <div className="scrollmenu">
          {videoGames.map((game, index) => (
            <button key={index} onClick={() => handleInfoClick(game)}>
              <img alt={game.name} src={game.imgSrc} /><br />{game.name}
            </button>
          ))}
        </div>
        <label htmlFor="videoGameSearch"> Add new game: </label>
        <input type="search" id="videoGameSearch" name="varSearch1" value={newVideoGame} onChange={handleNewVideoGameChange} />
        <button onClick={handleAddVideoGame}>Submit</button>
        <div>
          <br />
          <br />
        </div>

        <h2 className='scrollTitle'> Board Games </h2>
        <div className="scrollmenu">
          {boardGames.map((game, index) => (
            <button key={index} onClick={() => handleInfoClick(game)}>
              <img alt={game.name} src={game.imgSrc} /><br />{game.name}
            </button>
          ))}
        </div>
        <label htmlFor="boardGameSearch"> Add new game: </label>
        <input type="search" id="boardGameSearch" name="varSearch2" value={newBoardGame} onChange={handleNewBoardGameChange} />
        <button onClick={handleAddBoardGame}>Submit</button>
        <div>
          <br />
          <br />
        </div>

        <h2 className='scrollTitle'> Card Games </h2>
        <div className="scrollmenu">
          {cardGames.map((game, index) => (
            <button key={index} onClick={() => handleInfoClick(game)}>
              <img alt={game.name} src={game.imgSrc} /><br />{game.name}
            </button>
          ))}
        </div>
        <label htmlFor="cardGameSearch"> Add new game: </label>
        <input type="search" id="cardGameSearch" name="varSearch3" value={newCardGame} onChange={handleNewCardGameChange} />
        <button onClick={handleAddCardGame}>Submit</button>
      </div>
      <div>
        <br />
        <br />
      </div>
    </main>
  );
}