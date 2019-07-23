const Styles = theme => ({
    root: {
      backgroundColor: '#e6ffee',
      height: 'calc(100% - 35px)',
      position: 'absolute',
      left: '0',
      width: '300px',
      boxShadow: '0px 0px 2px black'
    },

    listItem: {
      cursor: 'pointer',
    },

    newChatBtn: {
      borderRadius: '0px',
      height: '50px',
      backgroundColor: '#00994d',
      color: 'white',
      '&:hover': {
        background: '#00802b', 
      },
    },

    unreadMessage: {
      color: 'red',
      position: 'absolute',
      top: '0',
      right: '5px'
    },

    avatar: {
      backgroundColor: '#00994d'
    }
  });
  
  export default Styles;