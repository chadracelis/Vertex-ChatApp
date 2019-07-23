const Styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

  paper: {
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing()}px`,
    position: 'absolute',
    width: '350px',
    top: '100px',
    left: 'calc(50% + 150px - 175px)',
  },

  input: {
  },

  form: {
    width: '100%',
    marginTop: theme.spacing(),
    backgroundColor: 'white',
    color: '#00994d',
  },
  
  submit: {
    marginTop: theme.spacing(3),
    backgroundColor: '#00994d',
      color: 'white',
      '&:hover': {
        backgroundColor: '#00802b', 
      },
  },
  errorText: {
    color: 'red',
    textAlign: 'center'
  }
});

export default Styles;