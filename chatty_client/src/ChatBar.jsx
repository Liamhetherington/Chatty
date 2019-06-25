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

  onKeyPress = event => {
    console.log("fsafdsafdsafas");
    this.props.onKeyPress(event);
    if (event.key == "Enter") {
      this.setState({
        content: ""
      });
    }
  };

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          defaultValue={this.props.currentUser}
          value={this.props.value}
          onBlur={this.props.onChange}
        />
        <input
          className="chatbar-message"
          value={this.state.content}
          onChange={this.onContent}
          onKeyPress={this.onKeyPress}
        />
      </footer>
    );
  }
}

export default ChatBar;
