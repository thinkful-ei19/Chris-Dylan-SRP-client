import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import LoginForm from './login-form';
import RegistrationForm from './registration-form';

export function LandingPage(props) {

  //This below GET request is to wake up the heroku server when a user loads up the landing page.
  //This is so that the heroku server doesn't take forever to allow the user to log in.
  fetch(`${API_BASE_URL}`, {
    method: 'GET', 
    headers: {
        'Accept': 'application/json',
      }
})
.then(res => console.log('Sent artbitrary get request to heroku server to wake it up...', res)).catch(err => {});


  // If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="home">
      <div className="hero">
        <h2 className="hero__header">Welcome to RepeatRepeat</h2>
        <p className="hero__description">RepeatRepeat will help you learn a language fast! Our super-smart algorithm will test you in an order that will optimize your learning!</p>
      </div>
      <div className="forms">
        <div>
          <h2>Log In</h2>
          <LoginForm />
        </div>
        <div>
          <h2>Register</h2>
          <RegistrationForm />
        </div>
        {/* <Link to="/register">Register</Link> */}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
