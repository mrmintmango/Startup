import React, { useState, useEffect } from 'react';
import './gameInfoStyle.css';
import { StarRating } from './StarRating';
import { useNavigate, useLocation } from 'react-router-dom';

export function Info() {
  const navigate = useNavigate();
  const location = useLocation();

  const [gameDetails, setGameDetails] = useState({
    name: '',
    imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$',
    favorite: false,
    rating: 0,
    review: '',
    memoriesImg: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$',
    memoriesText: ''   
  });

  const [gameType, setGameType] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const gameName = params.get('name');
    const type = params.get('type');
    if (gameName && type) {
      setGameType(type);
      const gameDetails = JSON.parse(localStorage.getItem(gameName));
      if (gameDetails) {
        setGameDetails(gameDetails);
      } else {
        setGameDetails({
          name: gameName,
          imgSrc: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$',
          favorite: false,
          rating: 0,
          review: '',
          memoriesImg: 'https://media.gamestop.com/i/gamestop/10141928/Mario-Kart-8?$pdp2x$',
          memoriesText: ''
        });
      }
    }
  }, [location.search]);

  const handleFavoriteChange = () => {
    setGameDetails({ ...gameDetails, favorite: !gameDetails.favorite });
  };

  const handleRatingChange = (rating) => {
    setGameDetails({ ...gameDetails, rating });
  };

  const handleReviewChange = (event) => {
    setGameDetails({ ...gameDetails, review: event.target.value });
  };

  const handleMemoryTextChange = (event) => {
    setGameDetails({ ...gameDetails, memoriesText: event.target.value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setGameDetails({ ...gameDetails, memoriesImg: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBack = () => {
    navigate('/vault');
  };

  async function handleSave() {
    const endpoint = `/api/auth/update${gameType.slice(0, -1)}Game`; // Construct the endpoint based on game type
    const response = await fetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify(gameDetails),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
    if (response.ok) {
      localStorage.setItem(gameDetails.name, JSON.stringify(gameDetails));
      console.log('Game details saved successfully');
    } else {
      const body = await response.json();
      console.error(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <main>
      <button onClick={handleBack}>Back to Vault</button> <button className='saveButton' onClick={handleSave}>Save</button>
      <p className="gameInfoTitle">Game Title = {gameDetails.name}</p>
      <div className="grid-container">
        <div className="item1">
          <p> Favorite? 
            <input type="checkbox" id="favorite" className="heart-checkbox" checked={gameDetails.favorite} onChange={handleFavoriteChange}/>
            <label htmlFor="favorite" className="heart-label"></label>
          </p>
        </div>
        <div className="item2">
          <img height={500} alt={gameDetails.name} src={gameDetails.imgSrc}/>
        </div>
        <div className="item3">
          <p>Rating:</p>
          <StarRating rating={gameDetails.rating} onRatingChange={handleRatingChange} />
        </div>
        <div className="item4">
          <label htmlFor="textarea">Review: <br/></label>
          <textarea id="textarea" value={gameDetails.review} onChange={handleReviewChange}></textarea>
        </div>
        <div className="item6">
          <p> Memories: </p>
          <div>
            <input type="file" id="file" name="varFile" accept="image/*" multiple onChange={handleFileChange} />
          </div>
          <div className="memories-container">
            {gameDetails.memoriesImg && (
              <img height={300} alt="memory pic" src={gameDetails.memoriesImg} />
            )}
            <textarea id="textarea" value={gameDetails.memoriesText} onChange={handleMemoryTextChange}></textarea>
          </div>
        </div>
      </div>
      <div>
        <br/>
        <br/>
        <br/>
      </div>
    </main>
  );
}