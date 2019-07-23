import React from 'react';
import { FormControl, InputLabel, Input, Button, Paper, withStyles, CssBaseline, Typography } from '@material-ui/core';
import Styles from './Styles';
const firebase = require("firebase");

class NewChat extends React.Component {

  constructor() {
    super();
    this.state = {
      username: null,
      message: null
    };
  }

  componentWillMount() {
    if(!firebase.auth().currentUser)
      this.props.history.push('/login');
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  submitNewChat = async (e) => {
    e.preventDefault();
    const userExists = await this.userExists();
    if(userExists) {
      const chatExists = await this.chatExists();
      chatExists ? this.goToChat() : this.createChat();
    }
  }

  createChat = () => {
    this.props.newChatSubmit({
      sendTo: this.state.username,
      message: this.state.message
    });
  }

  goToChat = () => this.props.goToChat(this.buildDocKey(), this.state.message);

  buildDocKey = () => [firebase.auth().currentUser.email, this.state.username].sort().join(':');

  chatExists = async () => {
    const docKey = this.buildDocKey();
    const chat = await 
      firebase
        .firestore()
        .collection('chats')
        .doc(docKey)
        .get();
    console.log(chat.exists);
    return chat.exists;
  }

  userExists = async () => {
    const usersSnapshot = await 
      firebase
        .firestore()
        .collection('users')
        .get();
    const exists = usersSnapshot
      .docs
        .map(_doc => _doc.data().email)
        .includes(this.state.username);
    this.setState({ serverError: !exists });
    return exists;
  }

  render() {
    const { classes } = this.props;
    return(
      <main className={classes.main}>
        <CssBaseline/>
        <Paper className={classes.paper}>
          <Typography component="h5" variant="h5">Send a message</Typography>
          <p></p>
          <form className={classes.form} onSubmit={(e) => this.submitNewChat(e)}>
            <FormControl fullWidth>
              <InputLabel htmlFor='new-chat-username'>
                  Enter your friend's email
              </InputLabel>
              <Input 
                required 
                className={classes.input}
                autoFocus 
                onChange={this.handleChange} 
                id='username'
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor='new-chat-message'>
                  Enter your message
              </InputLabel>
              <Input 
                required 
                className={classes.input}
                onChange={this.handleChange} 
                id='message'
              />
            </FormControl>
            <Button 
              fullWidth 
              variant='contained' 
              className={classes.submit} 
              type='submit'
            > Send
            </Button>
          </form>
          {
            this.state.serverError ? 
            <Typography component='h5' variant='h6' className={classes.errorText}>
              Unable to locate the user
            </Typography> :
            null
          }
        </Paper>
      </main>
    );
  }
}

export default withStyles(Styles)(NewChat);