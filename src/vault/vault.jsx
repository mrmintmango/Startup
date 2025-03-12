import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './vaultStyle.css';

export function Vault() {
  const navigate = useNavigate();
  const location = useLocation();
  const [videoGames, setVideoGames] = useState([]);
  const [boardGames, setBoardGames] = useState([]);
  const [cardGames, setCardGames] = useState([]);
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

  useEffect(() => {
    const fetchVault = async () => {
      const response = await fetch('/api/auth/vault', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setVideoGames(data.videoGames);
        setBoardGames(data.boardGames);
        setCardGames(data.cardGames);
      } else {
        const body = await response.json();
        console.error(`⚠ Error: ${body.msg}`);
      }
    };

    fetchVault();
  }, []);

  useEffect(() => {
    localStorage.setItem('videoGames', JSON.stringify(videoGames));
  }, [videoGames]);

  useEffect(() => {
    localStorage.setItem('boardGames', JSON.stringify(boardGames));
  }, [boardGames]);

  useEffect(() => {
    localStorage.setItem('cardGames', JSON.stringify(cardGames));
  }, [cardGames]);

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

  const handleAddVideoGame = async () => {
    if (newVideoGame.trim() !== '') {
      const newGame = { name: newVideoGame, imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$' };
      const response = await fetch('/api/auth/videoGames', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(newGame),
      });
      if (response.ok) {
        setVideoGames([...videoGames, newGame]);
        setNewVideoGame('');
      } else {
        const body = await response.json();
        console.error(`⚠ Error: ${body.msg}`);
      }
    }
  };

  const handleAddBoardGame = async () => {
    if (newBoardGame.trim() !== '') {
      const newGame = { name: newBoardGame, imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$' };
      const response = await fetch('/api/auth/boardGames', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(newGame),
      });
      if (response.ok) {
        setBoardGames([...boardGames, newGame]);
        setNewBoardGame('');
      } else {
        const body = await response.json();
        console.error(`⚠ Error: ${body.msg}`);
      }
    }
  };

  const handleAddCardGame = async () => {
    if (newCardGame.trim() !== '') {
      const newGame = { name: newCardGame, imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$' };
      const response = await fetch('/api/auth/cardGames', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(newGame),
      });
      if (response.ok) {
        setCardGames([...cardGames, newGame]);
        setNewCardGame('');
      } else {
        const body = await response.json();
        console.error(`⚠ Error: ${body.msg}`);
      }
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