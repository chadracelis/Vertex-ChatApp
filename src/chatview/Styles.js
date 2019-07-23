const Styles = theme => ({

  content: {
    height: 'calc(100vh - 100px)',
    overflow: 'auto',
    padding: '25px',
    marginLeft: '300px',
    boxSizing: 'border-box',
    overflowY: 'scroll',
    top: '122px',
    width: 'calc(100% - 300px)',
    position: 'absolute',
  },

  userSent: {
    float: 'left',
    clear: 'both',
    padding: '20px',
    boxSizing: 'border-box',
    wordWrap: 'break-word',
    marginTop: '20px',
    backgroundColor: '#00cc7a',
    color: 'white',
    width: '300px',
    borderRadius: '10px',
    boxShadow: '0px 0px 2px black'
  },

  friendSent: {
    float: 'right',
    clear: 'both',
    padding: '20px',
    boxSizing: 'border-box',
    wordWrap: 'break-word',
    marginTop: '10px',
    backgroundColor: '#00b36b',
    color: 'white',
    width: '300px',
    borderRadius: '10px',
    boxShadow: '0px 0px 2px black'
  },

  chatHeader: {
    width: 'calc(100% - 301px)',
    height: '50px',
    backgroundColor: '#00b359',
    marginLeft: '301px',
    fontSize: '18px',
    textAlign: 'center',
    color: 'white',
    paddingTop: '12px',
    boxSizing: 'border-box',
    boxShadow: '0px 0px 2px black'
  }

});

export default Styles;