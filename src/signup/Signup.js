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

class Signup extends Component {

  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      signupError: null
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  formIsValid = () => this.state.password === this.state.confirmPassword;

  handleSubmit = e => {
    e.preventDefault();
    if(!this.formIsValid()) {
        this.setState({ signupError: 'Password does not match'});
        return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(authRes => {
        const userObj = {
            email: authRes.user.email
        };
        firebase
          .firestore()
          .collection('users')
          .doc(this.state.email)
          .set(userObj)
          .then(() => {
              this.props.history.push('/');
          }, dbError => {
              console.log(dbError);
              this.setState({ signupError: 'Failed to add user'})
          });
      }, authError => {
          console.log(authError);
          this.setState({ signUpError: 'Failed to add user'});
      });
    console.log(this.state);
  }

  render() { 
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography components='h1' variant='h4'>
              Sign Up
            </Typography>
            <form className={classes.form} onSubmit={(e) => this.handleSubmit(e)}>
              <FormControl required fullWidth margin='normal'>
                <InputLabel htmlFor='signup-email-input'>Enter Your Email</InputLabel>
                <Input 
                  autoComplete='email' 
                  autoFocus 
                  id='email' 
                  onChange={this.handleChange}
                />
              </FormControl>
              <FormControl required fullWidth margin='normal'>
                <InputLabel htmlFor='signup-password-input'>Create a Password</InputLabel>
                <Input 
                  type='password'
                  id='password'
                  onChange={this.handleChange}
                />
              </FormControl>
              <FormControl required fullWidth margin='normal'>
                <InputLabel htmlFor='signup-confirm-password-input'>Confirm Password</InputLabel>
                <Input 
                  type='password'
                  id='confirmPassword'
                  onChange={this.handleChange}
                />
              </FormControl>
              <Button className={classes.submit} type='submit' fullWidth variant='contained'>
                Submit
              </Button>
            </form>
            <p></p>

            {
              this.state.signupError ? 
                <Typography className={classes.errorText} component='h5' variant='h6'>
                  {this.state.signupError}
                </Typography> 
              :
                null
            }

            <Typography className={classes.hasAccountHeader} component='h6' variant='h6'>
              <p>
                Already have an account? &nbsp;
                <Link className={classes.logInLink} to='./login'>Log In</Link>
              </p>
            </Typography>
          
          </Paper>
        </CssBaseline>
      </main>
    );
  }
}
 
export default withStyles(Styles)(Signup);