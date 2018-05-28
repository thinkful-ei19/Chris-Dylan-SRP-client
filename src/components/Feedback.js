import React, { Component } from 'react';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    return (
      <div>
        <p>Your guess: {this.props.currentGuess}</p>
        <p>Correct answer: {this.props.currentCorrectAnswer}</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentGuess: state.guessReducer.currentGuess.guess,
  currentCorrectAnswer: state.questionReducer.currentCorrectAnswer
});

export default connect(mapStateToProps)(Feedback);
