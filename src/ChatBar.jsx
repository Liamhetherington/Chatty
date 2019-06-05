import React, { Component } from "react";

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };

    this.onContent = this.onContent.bind(this);
  }

  onContent(event) {
    this.setState({
      content: event.target.value
    });
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          defaultValue={this.props.currentUser}
        />
        <input
          className="chatbar-message"
          value={this.state.content}
          onChange={this.onContent}
          onKeyPress={this.props.onKeyPress}
        />
      </footer>
    );
  }
}

export default ChatBar;
