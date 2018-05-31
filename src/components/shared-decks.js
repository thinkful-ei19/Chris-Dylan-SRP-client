import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import AddDeckForm from './add-deck-form';
import { getDeckNames, fetchDeckNames, deleteDeck, makePublicDeck, copyDeck } from '../actions/decks';
import { Redirect } from 'react-router-dom';
import { API_BASE_URL } from '../config';

export class SharedDecks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      decks: []
    };
  }

  dispatchCopyDeck(deckId) {
    this.props.dispatch(copyDeck(this.props.authToken, deckId, this.props.userId));
  }

  componentDidMount() {
    if (this.props.currentTab === 'dashboard') {
      return <Redirect to='/dashboard' />;
    }
    if (this.props.currentTab === 'decks') {
      return <Redirect to='/decks' />;
    }
    this.props.dispatch(getDeckNames(this.props.authToken, this.props.userId));
    return fetch(`${API_BASE_URL}/decks`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${this.props.authToken}` }
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res.statusText);
        }
        return res.json();
      })
      .then(decks => {
        let decksArr = [];
        decks.forEach((deck) => {
          if (deck.public === true) {
            decksArr.push(deck);
          }
        });
        return decksArr;
      })
      .then((decks) => {
        this.setState({
          decks: decks
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (this.props.currentTab === 'dashboard') {
      return <Redirect to='/dashboard' />;
    }
    if (this.props.currentTab === 'decks') {
      return <Redirect to='/decks' />;
    }

    const buildList = this.state.decks.map((deck) => {
      return (
        <li className="shared-decks__item" key={deck.id}>
          <p className="shared-decks__name">{deck.name}</p>
          <button className="shared-decks__button" value={deck.id}
            onClick={(event) => { this.dispatchCopyDeck(event.target.value); }}
          >Copy Deck</button>
        </li>
      );
    });

    return (
      <div className="shared-decks">
        <ul className="shared-decks__list">
          {buildList}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authToken: state.auth.authToken,
    userId: state.auth.currentUser.id,
    currentTab: state.auth.currentTab
  };
};

export default requiresLogin()(connect(mapStateToProps)(SharedDecks));