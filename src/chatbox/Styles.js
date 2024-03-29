const Styles = theme => ({

  sendBtn: {
    color: '#00994d',
    cursor: 'pointer',
    '&:hover': {
      color: '#00802b',
    }
  },

  chatboxContainer: {
    position: 'absolute',
    bottom: '15px',
    left: '315px',
    boxSizing: 'border-box',
    overflow: 'auto',
    width: 'calc(100% - 300px - 50px)'
  },

  chatTextBox: {
    width: 'calc(100% - 25px)'
  }

});

export default Styles;