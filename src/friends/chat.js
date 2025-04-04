const ChatEvent = {
  System: "system",
};

class ChatMessage {
  constructor(from, img, value) {
    this.from = from;
    this.img = img;
    this.value = value;
  }
}

class ChatEventNotifier {
  events = [];
  handlers = [];

  constructor() {
    let port = window.location.port;
    const protocol = window.location.protocol === "http:" ? "ws" : "wss";
    this.socket = new WebSocket(
      `${protocol}://${window.location.hostname}:${port}/ws`
    );
    this.socket.onopen = (event) => {
      this.receiveMessage(
        new ChatMessage("System", ChatEvent.System, { msg: "connected" })
      );
    };
    this.socket.onclose = (event) => {
      this.receiveMessage(
        new ChatMessage("System", ChatEvent.System, { msg: "disconnected" })
      );
    };
    this.socket.onmessage = async (msg) => {
      try {
        const event = JSON.parse(await msg.data.text());
        this.receiveMessage(event);
      } catch {}
    };
  }

  connected() {
    return this.socket.readyState === WebSocket.OPEN;
  }

  broadcastMessage(from, img = "", value) {
    const event = new ChatMessage(from, img, value);
    this.socket.send(JSON.stringify(event));
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers.filter((h) => h !== handler);
  }

  receiveMessage(event) {
    this.events.push(event);

    this.events.forEach((e) => {
      this.handlers.forEach((handler) => {
        handler(e);
      });
    });
  }
}

const ChatNotifier = new ChatEventNotifier();
export { ChatEvent, ChatNotifier };

// class ChatClient {
//   observers = [];
//   connected = false;

//   constructor() {
//     // if (ChatClient.instance) {
//     //   return ChatClient.instance; // Return the existing instance if it already exists
//     // }

//     let port = window.location.port;
//     const protocol = window.location.protocol === "http:" ? "ws" : "wss";
//     this.socket = new WebSocket(
//       `${protocol}://${window.location.hostname}:${port}/ws`
//     );

//     // Display that we have opened the WebSocket
//     this.socket.onopen = () => {
//       this.notifyObservers("system", "websocket", "connected");
//       this.connected = true;
//     };

//     // Display messages we receive from our friends
//     this.socket.onmessage = async (event) => {
//       const text = await event.data.text();
//       const chat = JSON.parse(text);
//       this.notifyObservers("received", chat.name, chat.msg);
//     };

//     // If the WebSocket is closed then disable the interface
//     this.socket.onclose = () => {
//       this.notifyObservers("system", "websocket", "disconnected");
//       this.connected = false;
//     };
//   }

//   // Send a message over the WebSocket
//   sendMessage(name, msg) {
//     this.notifyObservers("sent", "me", msg);
//     this.socket.send(JSON.stringify({ name, msg }));
//   }

//   addObserver(observer) {
//     this.observers.push(observer);
//   }

//   notifyObservers(event, from, msg) {
//     this.observers.forEach((h) => h({ event, from, msg }));
//   }
// }

// const ChatNotifier = new ChatClient();
// export { ChatNotifier };
