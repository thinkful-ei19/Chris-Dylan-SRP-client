import React, { Component } from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

class Feedback extends Component {
  render() {

    let correctFeedback = '';

    if (this.props.isCorrect === true) {
      correctFeedback = 'Correct!';
    } else if (this.props.isCorrect === false) {
      correctFeedback = 'Incorrect!';
    }

    return (
      <div>
        <p>{correctFeedback}</p>
        <p>Your guess: {this.props.currentGuess}</p>
        <p>Correct answer: {this.props.previousCorrectAnswer}</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentGuess: state.guessReducer.currentGuess,
  previousCorrectAnswer: state.guessReducer.previousCorrectAnswer,
  isCorrect: state.guessReducer.isCorrect
});

export default requiresLogin()(connect(mapStateToProps)(Feedback));
