import React, { Component } from "react";
import Chatlist from "../chatlist/Chatlist";
import Chatview from "../chatview/Chatview";
import Chatbox from "../chatbox/Chatbox";
import NewChat from "../newChat/NewChat";
import Navbar from "../navbar/Navbar";

const firebase = require("firebase");

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      selectedChat: null,
      newChatForm: false,
      email: null,
      friends: [],
      chats: []
    };
  }

  componentWillMount = () => {
    firebase.auth().onAuthStateChanged(async _user => {
      if (!_user) {
        this.props.history.push("/login");
      } else {
        await firebase
          .firestore()
          .collection("chats")
          .where("users", "array-contains", _user.email)
          // fetch data of logged in user inside 'users' and in an array that contains user's email
          .onSnapshot(async result => {
            const chats = result.docs.map(_doc => _doc.data());
            await this.setState({
              email: _user.email,
              chats: chats
            });
          });
      }
    });
  };

  newChatBtn = () => {
    this.setState({
      newChatForm: true,
      selectChat: null
    });
  };

  selectChat = async chatIndex => {
    await this.setState({
      selectedChat: chatIndex,
      newChatForm: false
    });
    this.messageRead();
  };

  buildDocKey = friend => [this.state.email, friend].sort().join(":");
  // this.state.email = current logged in user, while friend is the receiver

  messageRead = () => {
    const chatIndex = this.state.selectedChat;
    const docKey = this.buildDocKey(
      this.state.chats[chatIndex].users.filter(
        _user => _user !== this.state.email
      )[0]
    );
    if (this.clickedChat(chatIndex)) {
      firebase
        .firestore()
        .collection("chats")
        .doc(docKey)
        .update({ receiverHadRead: true });
    } else {
      console.log("Clicked message where user is sender");
    }
  };

  submitMessage = msg => {
    const chatIndex = this.state.selectedChat;
    const docKey = this.buildDocKey(
      this.state.chats[chatIndex].users.filter(
        _user => _user !== this.state.email
      )[0]
    );
    firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: this.state.email,
          message: msg,
          timestamp: Date.now()
        }),
        receiverHadRead: false
      });
    console.log(this.state);
  };

  clickedChat = chatIndex =>
    this.state.chats[chatIndex].messages[
      this.state.chats[chatIndex].messages.length - 1
    ].sender !== this.state.email;

  goToChat = async (docKey, msg) => {
    const usersInChat = docKey.split(":");
    const chat = this.state.chats.find(_chat =>
      usersInChat.every(_user => _chat.users.includes(_user))
    );
    this.setState({ newChatForm: false });
    await this.selectChat(this.state.chats.indexOf(chat));
    this.submitMessage(msg);
  };

  newChatSubmit = async chatObj => {
    const docKey = this.buildDocKey(chatObj.sendTo);
    await firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .set({
        messages: [
          {
            message: chatObj.message,
            sender: this.state.email
          }
        ],
        users: [this.state.email, chatObj.sendTo],
        receiverHadRead: false
      });
    this.setState({ newChatForm: false });
    this.selectChat(this.state.chats.length - 1);
  };

  render() {
    return (
      <div className="dashboard-container" id="dashboard-container">
        <Navbar _user={this.state.email} />
        <Chatlist
          history={this.props.history}
          _newChatBtn={this.newChatBtn}
          _selectChat={this.selectChat}
          _chats={this.state.chats}
          _email={this.state.email}
          _selectedChat={this.state.selectedChat}
        />
        {this.state.newChatForm ? null : (
          <Chatview
            user={this.state.email}
            chat={this.state.chats[this.state.selectedChat]}
          />
        )}
        {this.state.selectedChat !== null && !this.state.newChatForm ? (
          <Chatbox
            handleSubmit={this.submitMessage}
            messageRead={this.messageRead}
          />
        ) : null}
        {this.state.newChatForm ? (
          <NewChat
            goToChat={this.goToChat}
            newChatSubmit={this.newChatSubmit}
          />
        ) : null}
      </div>
    );
  }
}

export default Dashboard;
