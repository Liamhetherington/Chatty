import React, { Component } from "react";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

const data = {
  currentUser: {
    name: "Bob"
  }, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      username: "Bob",
      content: "Has anyone seen my marbles?"
    },
    {
      username: "Anonymous",
      content:
        "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        name: "Bob"
      }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?"
        },
        {
          username: "Anonymous",
          content:
            "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    const webSocket = new WebSocket("ws://localhost:3001/");
    webSocket.onopen = () => {
      console.log("Connected to server");
    };
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   const newMessage = {
    //     id: 3,
    //     username: "Michelle",
    //     content: "Hello there!"
    //   };
    //   const messages = this.state.messages.concat(newMessage);
    //   this.setState({ messages: messages });
    // }, 3000);
  }

  handleKeyPress(event) {
    if (event.key == "Enter") {
      let newObj = {
        id: 1,
        username: this.state.currentUser.name,
        content: event.target.value
      };
      const oldMessages = this.state.messages;
      const newMessages = [...oldMessages, newObj];
      this.setState({ messages: newMessages });
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar
          type="text"
          currentUser={this.state.currentUser.name}
          onKeyPress={this.handleKeyPress}
        />
      </div>
    );
  }
}
export default App;
