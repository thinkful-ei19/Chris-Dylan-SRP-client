import React, { Component } from 'react';
import { Field, reduxForm, focus, reset } from 'redux-form';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import Input from './input';
import { required, nonEmpty } from '../validators';
import { makeGuess } from '../actions/guess';
import { postCount } from '../actions/guess';

class AnswerForm extends Component {

  onSubmit(value) {

    let correct = false;

    if (value.toLowerCase() === this.props.currentCorrectAnswer.toLowerCase()) {
      correct = true;
    }

    if (correct === true) {
      this.props.dispatch(postCount(this.props.authToken, this.props.userId))
    }

    return this.props.dispatch(makeGuess(this.props.authToken, value, this.props.currentDeck.id, correct, this.props.currentCorrectAnswer))
      .then(this.props.dispatch(reset('answer')));
  }

  render() {
    return (
      <div>
        <span>{this.props.currentCount}</span>
        <form
          className="answer-form"
          onSubmit={this.props.handleSubmit(value => this.onSubmit(value.guess))}>
          <label for="guess">Answer: </label>
          <Field
            component={Input}
            type="text"
            name="guess"
            id="guess"
          // validate={[required, nonEmpty]}
          />
          <button className="answer__button" disabled={this.props.pristine || this.props.submitting}>
            Submit!
          </button>
        </form>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authToken: state.auth.authToken,
    currentDeck: state.deckReducer.currentDeck,
    currentCorrectAnswer: state.questionReducer.currentCorrectAnswer,
    currentQuestionId: state.questionReducer.currentQuestionId,
    currentCount: state.guessReducer.totalCorrect,
    userId: state.auth.currentUser.id
  };
};

const connectedAnswerForm = requiresLogin()(connect(mapStateToProps)(AnswerForm));

export default reduxForm({
  form: 'answer',
  onSubmitFail: (errors, dispatch) => dispatch(focus('answer', 'guess'))
})(connectedAnswerForm);
