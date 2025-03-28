import React, { useState, useEffect } from 'react';
import './friendsStyle.css';
import { useNavigate } from 'react-router-dom';

export function Friends() {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to store error messages

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch('/api/auth/friends', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFriends(data.friends); // Assuming the backend returns { friends: [...] }
        } else {
          console.error('Failed to fetch friends list');
        }
      } catch (error) {
        console.error('Error fetching friends list:', error);
      }
    };

    fetchFriends();
  }, []);

  const handleFriendClick = (friendName) => {
    // Navigate to the friend's vault or start a new message thread
    navigate(`/vault?friend=${friendName}`);
  };

  const handleNewFriendChange = (event) => {
    setNewFriend(event.target.value);
    setErrorMessage(''); // Clear any previous error message when typing
  };

  const handleAddFriend = async () => {
    if (newFriend.trim() !== '') {
      // Generate a random integer between 1 and 1000
      const randomId = Math.floor(Math.random() * 1000) + 1;
      let imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomId}.png`;
      const newFriendObj = {
        name: newFriend,
        imgSrc: imgSrc,
      };

      try {
        const response = await fetch('/api/auth/friends', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newFriendObj),
        });

        if (response.ok) {
          // Fetch the updated friends list from the backend
          const updatedFriendsResponse = await fetch('/api/auth/friends', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (updatedFriendsResponse.ok) {
            const updatedData = await updatedFriendsResponse.json();
            setFriends(updatedData.friends); // Update the friends list in the frontend
          }

          setNewFriend('');
        } else if (response.status === 404) {
          // If the backend returns a 404 status, show an error message
          setErrorMessage('User not found. Please check the username and try again.');
        } else {
          console.error('Failed to add friend');
          setErrorMessage('An error occurred while adding the friend. Please try again.');
        }
      } catch (error) {
        console.error('Error adding friend:', error);
        setErrorMessage('An error occurred while adding the friend. Please try again.');
      }
    }
  };

  return (
    <main className="friendmain">
      <div>
        <h3>Your Friends:</h3>
        <div className="scrollmenu">
          {friends.map((friend, index) => (
            <button key={index} onClick={() => handleFriendClick(friend.name)}>
              <img src={friend.imgSrc || 'https://via.placeholder.com/150'} alt={friend.name} /><br />{friend.name}
            </button>
          ))}
        </div>

        <div>
          <p>Add Friend:</p>
          <div className="center">
            <input
              type="search"
              id="search"
              name="varSearch"
              value={newFriend}
              onChange={handleNewFriendChange}
            />
            <button type="button" onClick={handleAddFriend}>Add</button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
        </div>
      </div>
    </main>
  );
}