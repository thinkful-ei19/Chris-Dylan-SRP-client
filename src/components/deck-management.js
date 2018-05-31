import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import AddDeckForm from './add-deck-form';
import { getDeckNames, fetchDeckNames, deleteDeck } from '../actions/decks';
import { Redirect } from 'react-router-dom';


export class DeckManagement extends React.Component {

  dispatchDeleteDeck(deckId) {
    if (this.props.decks.length <= 1) {
      alert('Cannot delete last deck, please add another before deleting.');
    } else {
      this.props.dispatch(deleteDeck(this.props.authToken, this.props.userId, deckId));
    }
  }

  componentDidMount() {
    this.props.dispatch(getDeckNames(this.props.authToken, this.props.userId));
  }

  render() {
    if (this.props.currentTab === 'dashboard') {
      return <Redirect to='/dashboard' />;
    }
    const decks = this.props.decks;
    let arr = [];

    try {
      decks.forEach((deck) => {
        arr.push(deck);
      });
    } catch (err) {
      console.log(err);
    }
    const buildJSX = arr.map((deck) => {
      return (
        <li className="deck-list__item" value={deck.id} id={deck.id} key={deck.id}>
          <p className="deck-list__name">{deck.name}</p>
          <button className="deck-list__delete" value={deck.id}
            onClick={(event) => this.dispatchDeleteDeck(event.target.value)}>
            Delete</button>
        </li>
      );
    });
    return (
      <div className="decks">
        <div className="decks__wrap">
          <AddDeckForm />
          <p className="decks__header">Current Decks:</p>
          <ul className="deck-list">
            {buildJSX}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authToken: state.auth.authToken,
    decks: state.deckReducer.deckNames,
    userId: state.auth.currentUser.id,
    currentTab: state.auth.currentTab
  };
};

export default requiresLogin()(connect(mapStateToProps)(DeckManagement));