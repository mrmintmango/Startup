import React, { useState, useEffect } from "react";
import "./friendsStyle.css";
import { useNavigate } from "react-router-dom";
import { ChatEvent, ChatNotifier } from "./chat"; // Import the ChatClient class

//console.log("ChatNotifier", ChatNotifier.connected); // Log the ChatClient instance

export function Friends() {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to store error messages
  const [reviews, setReviews] = React.useState([]); // State to store reviews
  const [newReview, setNewReview] = useState(""); // State for the new review input
  const [games, setGames] = useState([]); // State to store the user's games
  const [selectedGame, setSelectedGame] = useState(null); // State for the selected game
  const [currentUser, setCurrentUser] = useState(""); // State to store the current user's name
  const [connectionStatus, setConnectionStatus] = useState("disconnected"); // State for WebSocket connection status

  function Conversation({ webSocket }) {
    const handlerRef = React.useRef(null); // Use a ref to store the handler

    useEffect(() => {
      // Define the handler
      const handler = (chat) => {
        if (chat.from === "System" && chat.img === ChatEvent.System) {
          setConnectionStatus("connected");
        } else {
          setReviews((prevMessages) => [...prevMessages, chat]);
        }
      };

      // Store the handler in the ref
      handlerRef.current = handler;

      // Add the handler to the WebSocket
      webSocket.addHandler(handler);

      // Cleanup: Remove the handler when the component unmounts
      return () => {
        if (handlerRef.current) {
          webSocket.removeHandler(handlerRef.current);
        }
      };
    }, [webSocket]); // Only run this effect once when `webSocket` changes

    const chatEls = reviews.map((review, index) => (
      <div key={index} className="review-block">
        <p className="username">{review.from}:</p>
        <p>{review.value}</p>
        {review.img && <img src={review.img} alt="Game" />}
      </div>
    ));

    return (
      <main>
        <div id="chat-text">{chatEls}</div>
      </main>
    );
  }

  // function Conversation({ webSocket }) {
  //   useEffect(() => {
  //     webSocket.addHandler((chat) => {
  //       if (chat.from == "System" && chat.img == ChatEvent.System) {
  //         setConnectionStatus("connected");
  //       } else {
  //         setReviews((prevMessages) => [...prevMessages, chat]);
  //       }
  //     });
  //   }, [webSocket]);

  //   const chatEls = reviews.map((review, index) => (
  //     <div key={index} className="review-block">
  //       <p className="username">{review.from}:</p>
  //       <p>{review.value}</p>
  //       <img src={review.img}></img>
  //     </div>
  //   ));

  //   return (
  //     <main>
  //       <div id="chat-text">{chatEls}</div>
  //     </main>
  //   );
  // }

  // React.useEffect(() => {
  //   ChatNotifier.addHandler(handleMessageEvent);

  //   return () => {
  //     ChatNotifier.removeHandler(handleMessageEvent);
  //   };
  // }, []);

  // function handleMessageEvent(review) {
  //   setReviews([...reviews, review]);
  // }

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

    // Check the connection status and update the state accordingly
    if (ChatNotifier.connected) {
      setConnectionStatus("connected");
    } else {
      setConnectionStatus("disconnected");
    }
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
    const img = selectedGame ? selectedGame.imgSrc : null;
    if (newReview.trim() !== "") {
      const review = {
        value: newReview,
        img: img,
        from: currentUser,
      };

      setReviews([...reviews, review]);
      setNewReview("");
      setSelectedGame(null);

      ChatNotifier.broadcastMessage(currentUser, img, newReview); // Send the review to the server
    }
  };

  // function createMessagesArray() {
  //   const messageArray = [];
  //   for (const [i, review] of reviews.entries()) {
  //     messageArray.push(
  //       <div key={i} className="review-block">
  //         <p className="username">{review.from}:</p>
  //         <p>{review.value}</p>
  //         <img src={review.img}></img>
  //       </div>
  //     );
  //   }
  //   return messageArray;
  // }

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

          <Conversation webSocket={ChatNotifier} />
          {/* <div className="review-scrollmenu">{createMessagesArray()}</div> */}
        </div>
      </div>
    </main>
  );
}
