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
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(),
    },
    submit: {
      marginTop: theme.spacing(3),
      backgroundColor: '#00994d',
      color: 'white',
      '&:hover': {
        background: '#00802b', 
      },
    },
    hasAccountHeader: {
      width: '100%',
      color: 'black',
    },
    logInLink: {
      width: '100%',
      textDecoration: 'none',
      fontWeight: 'bolder',
      color: '#00994d'
    },
    errorText: {
      color: 'red',
      textAlign: 'center'
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: '#00994d'
    },
  });
  
  export default Styles;