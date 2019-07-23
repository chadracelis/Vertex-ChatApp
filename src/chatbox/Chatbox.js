import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import Styles from './Styles';
import { withStyles } from '@material-ui/core/styles';

class Chatbox extends Component {

  constructor() {
    super();
    this.state = {
      chatText: ''
    }
  }

  handleType = e => {
    e.keyCode === 13 ? 
    // checks if user clicked enter button (13)
      this.handleSubmit() : 
      this.setState({ chatText: e.target.value })
  }

  handleClick = () => this.props.messageRead();

  handleSubmit = () => {
    console.log('message submitted');
    if(this.messageValid(this.state.chatText)) {
      this.props.handleSubmit(this.state.chatText);
      document.getElementById('chat-text-box').value='';
    }
  }

  messageValid = (txt) => txt && txt.replace(/\s/g, '').length;
  // condition to make sure text is not an empty string or its not all empty spaces, 

  render() { 
    const { classes } = this.props;
    return (
      <div className={classes.chatboxContainer}>
        <TextField 
          className={classes.chatTextBox}
          placeholder='Type your message...'
          onKeyUp={(e) => this.handleType(e)}
          id='chat-text-box'
          onFocus={this.handleClick}
        >
        </TextField>
        <Send className={classes.sendBtn} onClick={this.handleSubmit}>
        </Send>
      </div>
    );
  }
}
 
export default withStyles(Styles)(Chatbox);

