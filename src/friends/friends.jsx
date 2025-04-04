import React, { useState, useEffect } from "react";
import "./friendsStyle.css";
import { useNavigate } from "react-router-dom";
import { ChatEvent, ChatNotifier } from "./chat"; // Import the ChatClient class
//const chatClient = new ChatClient(); // Create an instance of the ChatClient

console.log("ChatNotifier", ChatNotifier.connected); // Log the ChatClient instance

export function Friends() {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to store error messages
  const [reviews, setReviews] = useState([]); // State to store reviews
  const [newReview, setNewReview] = useState(""); // State for the new review input
  const [games, setGames] = useState([]); // State to store the user's games
  const [selectedGame, setSelectedGame] = useState(null); // State for the selected game
  const [currentUser, setCurrentUser] = useState(""); // State to store the current user's name
  const [connectionStatus, setConnectionStatus] = useState("disconnected"); // State for WebSocket connection status

  // React.useEffect(() => {
  //   ChatNotifier.addHandler(handleMessageEvent);
  //   // Check the connection status and update the state accordingly
  //   if (ChatNotifier.connected) {
  //     setConnectionStatus("connected");
  //   } else {
  //     setConnectionStatus("disconnected");
  //   }

  //   return () => {
  //     ChatNotifier.removeHandler(handleMessageEvent);
  //   };
  // });

  function handleMessageEvent(review) {
    setReviews([...reviews, review]);
  }

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("/api/auth/currentUser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data.username); // Assuming the backend returns { username: 'JohnDoe' }
        } else {
          console.error("Failed to fetch current user");
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    const fetchFriends = async () => {
      try {
        const response = await fetch("/api/auth/friends", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFriends(data.friends); // Assuming the backend returns { friends: [...] }
        } else {
          console.error("Failed to fetch friends list");
        }
      } catch (error) {
        console.error("Error fetching friends list:", error);
      }
    };

    const fetchGames = async () => {
      try {
        const response = await fetch("/api/auth/vault", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setGames([
            "none",
            ...data.videoGames,
            ...data.boardGames,
            ...data.cardGames,
          ]); // Combine all game types
        } else {
          console.error("Failed to fetch games");
        }
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchCurrentUser();
    fetchFriends();
    fetchGames();

    ChatNotifier.addHandler(handleMessageEvent);
    // Check the connection status and update the state accordingly
    if (ChatNotifier.connected) {
      setConnectionStatus("connected");
    } else {
      setConnectionStatus("disconnected");
    }

    return () => {
      ChatNotifier.removeHandler(handleMessageEvent);
    };
  }, []);

  const handleFriendClick = (friendName) => {
    //start a new message that is addressed to the friend
    setNewReview(newReview + `@${friendName} `);
  };

  const handleNewFriendChange = (event) => {
    setNewFriend(event.target.value);
    setErrorMessage(""); // Clear any previous error message when typing
  };

  const handleAddFriend = async () => {
    if (newFriend.trim() !== "") {
      // Generate a random integer between 1 and 1000
      const randomId = Math.floor(Math.random() * 1000) + 1;
      let imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomId}.png`;
      const newFriendObj = {
        name: newFriend,
        imgSrc: imgSrc,
      };

      try {
        const response = await fetch("/api/auth/friends", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newFriendObj),
        });

        if (response.ok) {
          // Fetch the updated friends list from the backend
          const updatedFriendsResponse = await fetch("/api/auth/friends", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (updatedFriendsResponse.ok) {
            const updatedData = await updatedFriendsResponse.json();
            setFriends(updatedData.friends); // Update the friends list in the frontend
          }

          setNewFriend("");
        } else if (response.status === 404) {
          // If the backend returns a 404 status, show an error message
          setErrorMessage(
            "User not found. Please check the username and try again."
          );
        } else {
          console.error("Failed to add friend");
          setErrorMessage(
            "An error occurred while adding the friend. Please try again."
          );
        }
      } catch (error) {
        console.error("Error adding friend:", error);
        setErrorMessage(
          "An error occurred while adding the friend. Please try again."
        );
      }
    }
  };

  const handleNewReviewChange = (event) => {
    setNewReview(event.target.value);
  };

  const handleGameSelect = (event) => {
    const gameName = event.target.value;
    const game = games.find((g) => g.name === gameName);
    setSelectedGame(game);
  };

  const handleAddReview = () => {
    if (newReview.trim() !== "") {
      const review = {
        text: newReview,
        game: selectedGame,
        user: currentUser,
      };

      const img = selectedGame ? selectedGame.imgSrc : null; // Get the image source from the selected game
      ChatNotifier.broadcastMessage(currentUser, img, newReview); // Send the review to the server

      setReviews([...reviews, review]);
      setNewReview("");
      setSelectedGame(null);
    }
  };

  return (
    <main className="friendmain">
      <div>
        <h3>Your Friends:</h3>
        <div className="scrollmenu">
          {friends.map((friend, index) => (
            <button key={index} onClick={() => handleFriendClick(friend.name)}>
              <img
                src={friend.imgSrc || "https://via.placeholder.com/150"}
                alt={friend.name}
              />
              <br />
              {friend.name}
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
            <button type="button" onClick={handleAddFriend}>
              Add
            </button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
          {/* Display error message */}
        </div>
      </div>
      <div>
        <h3>The LockBox:</h3>
        <div className="lockbox_menu">
          <div className="review-input">
            <select
              onChange={handleGameSelect}
              value={selectedGame?.name || ""}
            >
              <option value="" disabled>
                Select a game
              </option>
              {games.map((game, index) => (
                <option key={index} value={game.name}>
                  {game.name}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Write a review..."
              value={newReview}
              onChange={handleNewReviewChange}
            ></textarea>
            <div className="post-section">
              <button type="button" onClick={handleAddReview}>
                Post
              </button>
              <span className={`connection-status ${connectionStatus}`}>
                {connectionStatus === "connected"
                  ? "Connected"
                  : "Disconnected"}
              </span>
            </div>
          </div>

          <div className="review-scrollmenu">
            {reviews.map((review, index) => (
              <div key={index} className="review-block">
                <p className="username">{review.user}:</p>
                <p>{review.text}</p>
                {review.game && (
                  <img src={review.game.imgSrc} alt={review.game.name} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
