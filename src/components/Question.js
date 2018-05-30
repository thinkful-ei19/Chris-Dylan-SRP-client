import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentQuestion } from '../actions/questions';
import { getDeckNames, fetchCurrentDeck } from '../actions/decks';
import { resetFeedback } from '../actions/guess';
import requiresLogin from './requires-login';

class Question extends Component {

  componentDidMount() {
    this.props.dispatch(resetFeedback());
    this.props.dispatch(fetchCurrentDeck(this.props.authToken, this.props.currentDeck));
    this.props.dispatch(fetchCurrentQuestion(this.props.authToken, this.props.currentDeck));
    this.props.dispatch(getDeckNames(this.props.authToken, this.props.userId))
    
  }

  render() {
    if (this.props.noData === true) {
      return (
        <div className="question">
          <p>No question to display!</p>
        </div>
      );
    } else {
      return (
        <div className="question">
          {this.props.currentQuestion}
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  let currentDeck = currentUser.decks[0];
  //Disable temporarily, needs to be refactored to allow user to save which deck they are currently using.
  // if (currentUser.decks.length > 1) {
  //   currentDeck = state.deckReducer.currentDeck;
  // }

  return {
    authToken: state.auth.authToken,
    userId: state.auth.currentUser.id,
    currentQuestion: state.questionReducer.currentQuestion,
    currentDeck,
    noData: state.questionReducer.noData,
    //
  };
};

export default requiresLogin()(connect(mapStateToProps)(Question));
