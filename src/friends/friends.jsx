import React, { useState } from 'react';
import './friendsStyle.css';
import { useNavigate } from 'react-router-dom';

export function Friends() {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([
    { name: "Bob's Vault", imgSrc: 'https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg' },
    { name: "Bob's Vault", imgSrc: 'https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg' },
    { name: "Bob's Vault", imgSrc: 'https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg' },
    { name: "Bob's Vault", imgSrc: 'https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg' },
    { name: "Bob's Vault", imgSrc: 'https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg' },
    { name: "Bob's Vault", imgSrc: 'https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg' },
    { name: "Bob's Vault", imgSrc: 'https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg' },
    { name: "Bob's Vault", imgSrc: 'https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg' },
    { name: "Bob's Vault", imgSrc: 'https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg' },
    { name: "Bob's Vault", imgSrc: 'https://ih1.redbubble.net/image.1082756148.9909/fposter,small,wall_texture,square_product,600x600.u1.jpg' },
  ]);
  const [newFriend, setNewFriend] = useState('');

  const handleVaultClick = () => {
    navigate('/vault');
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
            <button key={index} onClick={handleVaultClick}>
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