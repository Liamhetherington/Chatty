import React, { Component } from "react";
import Message from "./Message.jsx";
import Notification from "./Notification.jsx";

class MessageList extends Component {
  render() {
    console.log("hgjhgfjdasdasdhgdjghdjhg");

    const eachMessage = this.props.messages.map((message, username, index) => {
      console.log(message.type);
      if (message.type === "incomingNotification") {
        return <Notification key={message.id} content={message.content} />;
      } else if (message.type === "incomingMessage") {
        return (
          <Message
            key={message.id}
            username={message.username}
            content={message.content}
          />
        );
      }
    });
    return <main className="messages">{eachMessage}</main>;
  }
}

export default MessageList;
