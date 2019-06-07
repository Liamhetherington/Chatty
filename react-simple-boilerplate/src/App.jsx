import React, { Component } from "react";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

// const data = {
//   currentUser: {
//     name: "Bob"
//   }, // optional. if currentUser is not defined, it means the user is Anonymous
//   messages: [
//     {
//       username: "Bob",
//       content: "Has anyone seen my marbles?"
//     },
//     {
//       username: "Anonymous",
//       content:
//         "No, I think you lost them. You lost your marbles Bob. You lost them for good."
//     }
//   ]
// };
const colours = ["red", "green", "blue", "magenta", "orange"];

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = null;
    this.state = {
      currentUser: {
        name: "Bob",
        color: "#000"
      },
      messages: []
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001/");
    this.socket.onopen = () => {
      console.log("Connected to server");
    };
    this.socket.onmessage = msg => {
      const text = JSON.parse(msg.data);
      // const usersOnline = text.
      const oldMessage = this.state.messages;
      const newMessage = [...oldMessage, text];
      // this.setState({
      //   messages: newMessage,
      //   username: newMessage.username,
      //   numOfUsers: text.count
      // });
      if (text.type == "connection" || text.type == "disconnection") {
        this.setState({
          numOfUsers: text.count
        });
      } else {
        this.setState({
          messages: newMessage,
          username: newMessage.username
        });
      }
      console.log("users: ", text.type);
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

  handleChange(event) {
    const colour = colours[Math.floor(Math.random() * 5)];
    if (event.target.value !== this.state.currentUser.name) {
      const incomingNotification = this.buildNotification(
        event.target.value,
        this.state.currentUser.name
      );
      this.socket.send(JSON.stringify(incomingNotification));
    }
    // let userName = this.state.currentUser;
    // console.log("User name:", userName);
    this.setState({
      currentUser: {
        name: event.target.value,
        color: !this.state.colour ? colour : this.state.colour
      }
    });
  }

  buildNotification(username, oldUsername) {
    const colour = colours[Math.floor(Math.random() * 5)];
    console.log("colour:", colour);
    let newNotification = {
      username: username,
      content: `${oldUsername} changed their name to ${username}.`,
      color: colour
    };
    return {
      type: "postNotification",
      data: newNotification
    };
  }

  handleKeyPress(event) {
    if (event.key == "Enter") {
      const message = this.buildMessage(
        this.state.currentUser.name,
        event.target.value
      );
      this.socket.send(JSON.stringify(message));
    }
  }

  buildMessage(username, content) {
    let post = {
      username: username,
      content: content
    };

    return {
      type: "postMessage",
      data: post
    };
  }

  render() {
    console.log("number of users online: ", this.state.numOfUsers);
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
          <span className="user-count">
            Users online: {this.state.numOfUsers}
          </span>
        </nav>
        <div className="message-container">
          <MessageList
            messages={this.state.messages}
            username={this.state.currentUser.name}
            color={this.state.currentUser.color}
          />
        </div>
        <ChatBar
          type="text"
          currentUser={this.state.currentUser.name}
          onKeyPress={this.handleKeyPress}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
export default App;
