import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import AddDeckForm from './add-deck-form';
import { getDeckNames, fetchDeckNames, deleteDeck, makePublicDeck } from '../actions/decks';
import { Redirect } from 'react-router-dom';


export class DeckManagement extends React.Component {

  dispatchDeleteDeck(deckId) {
    if (this.props.decks.length <= 1) {
      alert('Cannot delete last deck, please add another before deleting.');
    } else {
      this.props.dispatch(deleteDeck(this.props.authToken, this.props.userId, deckId));
    }
  }

  dispatchPublishDeck(deckId, status) {
    let request;
    if (status == "true") {
        request = {public: false}
    } else {
        request = {public: true}
    }
    this.props.dispatch(makePublicDeck(this.props.authToken, request, deckId, this.props.userId));
  }

  componentDidMount() {
    this.props.dispatch(getDeckNames(this.props.authToken, this.props.userId));
  }

  render() {
    if (this.props.currentTab === 'dashboard') {
        return <Redirect to='/dashboard' />;
    }
    if (this.props.currentTab === 'shared-decks') {
        return <Redirect to='/shared-decks' />;
    }
    const decks = this.props.decks;
    let arr = [];
    try {
      decks.forEach((deck) => {
        arr.push(deck);
      });
      arr = arr.sort((a,b) => {
          return a.name.charCodeAt(0) > b.name.charCodeAt(0)
      })
    } catch (err) {}
    for (let i=0; i<arr.length; i++) {
        let publicString;
        let statusString
        if (arr[i].public === true) {
            publicString = 'Make Private';
            statusString = 'true'
        } else {
            publicString = 'Make Public';
            statusString = 'false'
        }
        arr[i] = {
            name: arr[i].name,
            id: arr[i].id,
            public: publicString,
            status: statusString
        }
    }
    const buildJSX = arr.map((deck) => {
      return (
        <li className="deck-list__item" value={deck.id} id={deck.id} key={deck.id}>
          <p className="deck-list__name">{deck.name}</p>
          <button className="deck-list__delete" value={deck.id}
            onClick={(event) => this.dispatchDeleteDeck(event.target.value)}>
            Delete</button>
            <button className="deck-list__publish" value={deck.id} name={deck.status}
            onClick={(event) => this.dispatchPublishDeck(event.target.value, event.target.name)
            }>
            {deck.public}</button>
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