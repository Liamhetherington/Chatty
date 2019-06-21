import React, { Component } from "react";
import Message from "./Message.jsx";

class MessageList extends Component {
  render() {
    const eachMessage = this.props.messages.map((messages, username, index) => (
      <Message
        key={messages.id}
        username={messages.username}
        content={messages.content}
        color={this.props.color}
      />
    ));
    return <main className="messages">{eachMessage}</main>;
  }
}

export default MessageList;
