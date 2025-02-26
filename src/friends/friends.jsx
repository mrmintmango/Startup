import React, { useState } from 'react';
import './friendsStyle.css';
import { useNavigate } from 'react-router-dom';

export function Friends() {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([
    { name: "Bob", imgSrc: 'https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg' },
    { name: "Joe", imgSrc: 'https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg' },
    { name: "Jim", imgSrc: 'https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg' },
    { name: "Rik", imgSrc: 'https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg' },
    { name: "Mat", imgSrc: 'https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg' },
    { name: "Pam", imgSrc: 'https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg' },
    { name: "Bub", imgSrc: 'https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg' },
    { name: "Cad", imgSrc: 'https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg' },
    { name: "Rub", imgSrc: 'https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg' },
    { name: "Mae", imgSrc: 'https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg' },
  ]);
  const [newFriend, setNewFriend] = useState('');

  const handleVaultClick = (friendName) => {
    navigate(`/vault?friend=${friendName}`);
  };

  const handleNewFriendChange = (event) => {
    setNewFriend(event.target.value);
  };

  const handleAddFriend = () => {
    if (newFriend.trim() !== '') {
      setFriends([...friends, { name: newFriend, imgSrc: 'https://via.placeholder.com/150' }]);
      setNewFriend('');
    }
  };

  return (
    <main className="friendmain">
      <div>
        <h3>Check out your friends vaults!</h3>
        <div className='scrollmenu'>
          {friends.map((friend, index) => (
            <button key={index} onClick={() => handleVaultClick(friend.name)}>
              <img src={friend.imgSrc} alt={friend.name} /><br />{friend.name}
            </button>
          ))}
        </div>

        <div>
          <p>add Friend:</p>
          <div className="center">
            <input type="search" id="search" name="varSearch" value={newFriend} onChange={handleNewFriendChange} />
            <button type="button" onClick={handleAddFriend}>Add</button>
          </div>
        </div>
      </div>
    </main>
  );
}