import React from 'react';
import './gameInfoStyle.css';
import { StarRating } from './StarRating';
import { Vault } from './vault';
import { useNavigate } from 'react-router-dom';

export function Info() {
  const navigate = useNavigate();

  const handleInfoClick = () => {
    navigate('/vault');
  };
  return (
    <main>
      <button onClick={handleInfoClick}>Back to Vault</button><p className="gameInfoTitle">Game Title</p>
      <div className="grid-container">
        <div className="item1"><p> Favorite? <input type="checkbox"/> </p></div>
        <div className="item2"><img height={500} alt="gta" src="https://media.gamestop.com/i/gamestop/10161249?$pdp2x$"/></div>
        <div className="item3">
          <p>Rating:</p>
        </div>
      <div className="item4">
        <label for="textarea">Review: <br/></label>
        <textarea id="textarea" name="varTextarea"></textarea>
      </div>
      <div className="item6">
        <p> Memories: </p>
        <div><input type="file" id="file" name="varFile" accept="image/*" multiple /></div>
        <div className="memories-container">
            <img height={300} alt="gta" src="https://media.gamestop.com/i/gamestop/10106497_10106499_10115457_10115461_10115462_10161249_10161250_SCR17/Grand-Theft-Auto-V---PlayStation-4?$screen2x$"/>
            <textarea id="textarea" name="varTextarea"></textarea>
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