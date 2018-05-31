import React from 'react';
import { connect } from 'react-redux';
import { clearAuth, changeTab } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import logo from '../styles/assets/logo-updated.svg';

export class HeaderBar extends React.Component {

  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  changeTab(tab) {
    this.props.dispatch(changeTab(tab))
  }

  render() {
    // Only render the log out button if we are logged in
    let logOutButton;
    let deckManager;
    let dashboard;
    if (this.props.loggedIn) {
      dashboard = (
        <a className="header-bar__dashboard" onClick={() => this.changeTab('dashboard')}>Study</a>        
      )
      deckManager = (
        <a className="header-bar__deck-manager" onClick={() => this.changeTab('decks')}>Decks</a>
      )
      logOutButton = (
        <a className="header-bar__logout" onClick={() => this.logOut()}>Log out</a>
      );
    }
    return (
      <div className="header-bar">
        {/* <h1 className="header-bar__header">RepeatRepeat</h1> */}
        <img className="logo" src={logo} alt="RepeatRepeat logo" />
        {dashboard}
        {deckManager}
        {logOutButton}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
