import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import logo from '../styles/assets/logo-updated.svg';

export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    // Only render the log out button if we are logged in
    let logOutButton;
    if (this.props.loggedIn) {
      logOutButton = (
        <a className="header-bar__logout" onClick={() => this.logOut()}>Log out</a>
      );
    }
    return (
      <div className="header-bar">
        {/* <h1 className="header-bar__header">RepeatRepeat</h1> */}
        <img className="logo" src={logo} alt="RepeatRepeat logo" />
        {logOutButton}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
