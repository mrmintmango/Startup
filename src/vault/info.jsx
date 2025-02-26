import React, { useState } from 'react';
import './gameInfoStyle.css';
import { StarRating } from './StarRating';
import { useNavigate } from 'react-router-dom';

export function Info() {
  const navigate = useNavigate();
//  const location = useLocation();
  const handleSave = () => {
    localStorage.setItem(gameDetails.name, JSON.stringify(gameDetails));
    navigate('/vault');
  };

  const [gameDetails, setGameDetails] = useState({
    name: '',
    imgSrc: '',
    favorite: false,
    rating: 0,
    review: '',
    memories: []
  });

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const gameName = params.get('name');
  //   const storedGameDetails = JSON.parse(localStorage.getItem(gameName));
  //   if (storedGameDetails) {
  //     setGameDetails(storedGameDetails);
  //   }
  // }, [location.search]);

  const handleFavoriteChange = () => {
    setGameDetails({ ...gameDetails, favorite: !gameDetails.favorite });
  };

  const handleRatingChange = (rating) => {
    setGameDetails({ ...gameDetails, rating });
  };

  const handleReviewChange = (event) => {
    setGameDetails({ ...gameDetails, review: event.target.value });
  };

  const [rating, setRating] = useState(0);
  const [selectedImage, setSelectedImage] = useState('https://media.gamestop.com/i/gamestop/10106497_10106499_10115457_10115461_10115462_10161249_10161250_SCR17/Grand-Theft-Auto-V---PlayStation-4?$screen2x$');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main>
      <button onClick={handleSave}>Back to Vault</button>
      <p className="gameInfoTitle">Game Title</p>
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
            {gameDetails.memories.map((memory, index) => (
              <img key={index} height={300} alt="memory" src={memory} />
            ))}
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