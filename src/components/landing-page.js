import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import LoginForm from './login-form';

export function LandingPage(props) {
  // If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="home">
      <div className="hero">
        <h2 className="hero__header">Welcome to RepeatRepeat</h2>
        <p className="hero__description">RepeatRepeat is a web application that helps you learn a language fast! Simply sign up or log in below and start learning. Once you log in, you'll be sent to your dashboard. There, you'll go through a series of questions to learn basic French! Our super-smart algorithm will test you in an order that will optimize your learning! You'll also have the ability to create your own decks with your own questions.</p>
      </div>
      <div className="forms">
        <h2>Log In</h2>
        <LoginForm />
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
