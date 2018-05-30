import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentQuestion } from '../actions/questions';
import { fetchCurrentDeck } from '../actions/decks';
import { resetFeedback } from '../actions/guess';
import requiresLogin from './requires-login';

class Question extends Component {

  componentDidMount() {
    this.props.dispatch(resetFeedback());
    this.props.dispatch(fetchCurrentDeck(this.props.authToken, this.props.currentDeck));
    this.props.dispatch(fetchCurrentQuestion(this.props.authToken, this.props.currentDeck));
  }

  render() {
    return (
      <div className="question">
        {this.props.currentQuestion}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;

  let currentDeck = currentUser.decks[0];

  if (currentUser.decks.length > 1) {
    currentDeck = state.deckReducer.currentDeck;
  }

  return {
    authToken: state.auth.authToken,
    currentQuestion: state.questionReducer.currentQuestion,
    currentDeck
    //
  };
};

export default requiresLogin()(connect(mapStateToProps)(Question));
