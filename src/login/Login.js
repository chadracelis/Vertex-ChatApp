import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Styles from './Styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const firebase = require("firebase");


class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      loginError: false
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value 
    })
  }

  handleSubmit = async e => {
    e.preventDefault();
    await firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
          this.props.history.push('/');
          }, err => {
            this.setState({ loginError: true });
            console.log('Error logging in: ', err);
          });
    console.log(this.state);
  }

  render() { 
      const { classes } = this.props;
      return (
        <main className={classes.main}>
          <CssBaseline/>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h4'>
              Login
            </Typography>
            <form className={classes.form} onSubmit={(e) => this.handleSubmit(e)}>
              <FormControl required fullWidth margin='normal'>
                <InputLabel htmlFor='login-email-input'>Enter your email</InputLabel>
                <Input 
                  autoComplete='email' 
                  autoFocus 
                  id='email'
                  onChange={this.handleChange} 
                />
              </FormControl>
              <FormControl required fullWidth margin='normal'>
                <InputLabel htmlFor='login-password-input'>Enter your password</InputLabel>
                <Input 
                  className={classes.input}
                  type='password'
                  id='password'
                  onChange={this.handleChange} 
                />
                <Button className={classes.submit} type='submit' fullWidth variant='contained'> 
                  Login
                </Button>
              </FormControl>
            </form>
            <p></p>

            {
              this.state.loginError ? 
                <Typography className={classes.errorText} component='h5' variant='h6'>
                  Incorrect login information
                </Typography> 
              :
                null
            }

            <Typography className={classes.noAccountHeader} component='h6' variant='h6'>
              <p>
                Don't have an account? &nbsp;
                <Link className={classes.signUpLink} to='/signup'>Signup here</Link>
              </p>
            </Typography>
          </Paper>
        </main>
      );
  }
}
 
export default withStyles(Styles)(Login);

