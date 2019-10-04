import React, { Component } from "react";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'

const colours = ["red", "green", "blue", "magenta", "orange"];

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = null;
    this.state = {
      currentUser: {
        name: "Liam",
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
      const oldMessage = this.state.messages;
      const newMessage = [...oldMessage, text];
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
    };
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
      content: `${oldUsername} changed their name to ${username}.`
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
            <FontAwesomeIcon icon={faComments}></FontAwesomeIcon>
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
