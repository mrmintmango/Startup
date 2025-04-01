const WebSocket = require('ws');

const MessageEvent = {
    user: 'user',
    message: 'message',
    image: 'image', // Optional, for image messages
};

class MessageNotifier {
    constructor() {
        this.clients = new Map(); // Map to store WebSocket connections for each user
    }

    // Add a new WebSocket connection for a user
    addClient(userId, ws) {
        if (!this.clients.has(userId)) {
            this.clients.set(userId, []);
        }
        this.clients.get(userId).push(ws);

        // Handle WebSocket close event
        ws.on('close', () => {
            this.removeClient(userId, ws);
        });
    }

    // Remove a WebSocket connection for a user
    removeClient(userId, ws) {
        if (this.clients.has(userId)) {
            const userClients = this.clients.get(userId).filter(client => client !== ws);
            if (userClients.length > 0) {
                this.clients.set(userId, userClients);
            } else {
                this.clients.delete(userId);
            }
        }
    }

    // Broadcast a message to a user's friends
    broadcastToFriends(userId, message) {
        const friends = this.getFriends(userId); // Fetch the user's friends from the database
        friends.forEach(friendId => {
            if (this.clients.has(friendId)) {
                this.clients.get(friendId).forEach(ws => {
                    ws.send(JSON.stringify(message));
                });
            }
        });
    }

    // Mock function to get a user's friends (replace with actual database query)
    getFriends(userId) {
        // Replace this with a database query to fetch the user's friends
        return ['friend1', 'friend2', 'friend3']; // Example friend IDs
    }
}

module.exports = { MessageNotifier, MessageEvent };

