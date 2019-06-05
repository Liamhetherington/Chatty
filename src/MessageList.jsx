import React, { Component } from "react";
import Message from "./Message.jsx";

class MessageList extends Component {
  render() {
    const eachMessage = this.props.messages.map((messages, index) => (
      <Message
        key={index}
        username={messages.username}
        content={messages.content}
      />
    ));
    return (
      <main className="messages">
        {eachMessage}
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    );
  }
}

export default MessageList;
