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
  const [accessToken, setAccessToken] = useState('');

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

  useEffect(() => {
    const fetchAccessToken = async () => {
      const clientId = 'avi12gowsh9c41zvjyi4yu8s4hnn63'; // Insert your Client ID here
      const clientSecret = 'jrspvgpwqs08b70jlxbsotx3w5nc2a'; // Insert your Client Secret here

      const response = await fetch('https://id.twitch.tv/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'client_credentials',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.access_token);
      } else {
        const body = await response.json();
        console.error(`⚠ Error: ${body.message}`);
      }
    };

    fetchAccessToken();
  }, []);

  const handleInfoClick = (game, type) => {
    navigate(`/info?name=${game.name}&type=${type}`);
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
      // IGDB API call to search for an image matching the name of the game
      const igdbResponse = await fetch('/api/igdb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access-token': accessToken,
        },
        body: JSON.stringify({
          search: newVideoGame,
          fields: 'name,cover.url',
        }),
      });

      let imgSrc = 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$'; // Default image
      if (igdbResponse.ok) {
        const igdbData = await igdbResponse.json();
        if (igdbData.length > 0 && igdbData[0].cover) {
          imgSrc = igdbData[0].cover.url.replace('t_thumb', 't_cover_big'); // Use a larger image size
        }
      } else {
        console.error('Failed to fetch image from IGDB');
      }

      const newGame = {
        name: newVideoGame,
        imgSrc: imgSrc,
        favorite: false,
        rating: 0,
        review: '',
        memoriesImg: imgSrc,
        memoriesText: '',
      };

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
      const newGame = {
        name: newBoardGame,
        imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$',
        favorite: false,
        rating: 0,
        review: '',
        memoriesImg: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$',
        memoriesText: '',
      };
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
      const newGame = {
        name: newCardGame,
        imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$',
        favorite: false,
        rating: 0,
        review: '',
        memoriesImg: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$',
        memoriesText: '',
      };
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
            <button key={index} onClick={() => handleInfoClick(game, 'Video')}>
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
            <button key={index} onClick={() => handleInfoClick(game, 'Board')}>
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
            <button key={index} onClick={() => handleInfoClick(game, 'Card')}>
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