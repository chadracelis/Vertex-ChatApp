import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/Styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Styles from './Styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NotificationImportant from '@material-ui/icons/NotificationImportant';


class Chatlist extends Component {

  newChat = () => {
    this.props._newChatBtn();
  }

  selectChat = (index) => {
    this.props._selectChat(index);
  }

  userIsSender = (chat) => chat.messages[chat.messages.length -1].sender === this.props._email;

  render() { 
    const { classes } = this.props;
    if(this.props._chats.length > 0) {
      return (
        <main className={classes.root}>
          <Button 
            className={classes.newChatBtn} 
            variant='contained' 
            fullWidth 
            onClick={this.newChat}
          >
           New Message
          </Button>
          <List>
            {
              this.props._chats.map((_chat, _index) => {
                return (
                  <div key={_index}>
                    <ListItem 
                      className={classes.listItem} 
                      onClick={() => this.selectChat(_index)}
                      selected={this.props._selectedChat === _index}
                      alignItems='flex-start'
                    >
                      <ListItemAvatar>
                        <Avatar alt='Remy Sharp' className={classes.avatar}>
                          {_chat.users.filter(_user => _user !== this.props.userEmail)[0].split('')[0].toUpperCase()} 
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary={_chat.users.filter(_user => _user !== this.props._email)[0]}
                        secondary={
                          <React.Fragment>
                            <Typography component='span' color='textPrimary'>
                              {_chat.messages[_chat.messages.length -1].message.substring(0, 30) + "..."}
                            </Typography>
                          </React.Fragment>
                        }
                      >
                      </ListItemText>
                      {
                        _chat.receiverHadRead === false && !this.userIsSender(_chat) ?
                          <ListItemIcon>
                            <NotificationImportant className={classes.unreadMessage}>
                            </NotificationImportant>
                          </ListItemIcon>
                          : null
                      }
                    </ListItem>
                    <Divider>
                      
                    </Divider>
                  </div>
                );
              })
            }
          </List>
        </main>
      );
    } else {
      return (
        <main className={classes.root}>
          <Button 
            className={classes.newChatBtn} 
            variant='contained' 
            fullWidth 
            onClick={this.newChat}
          >  New Message
          </Button>
        </main>
      )
    }
  }
}
 
export default withStyles(Styles)(Chatlist);



