import React, { Component } from 'react';
import { Field, reduxForm, focus, reset } from 'redux-form';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import Input from './input';
import { required, nonEmpty } from '../validators';
import { makeGuess } from '../actions/guess';

class AnswerForm extends Component {

  onSubmit(value) {

    let correct = false;

    if (value.toLowerCase() === this.props.currentCorrectAnswer.toLowerCase()) {
      correct = true;
    }

    return this.props.dispatch(makeGuess(this.props.authToken, value, this.props.currentDeck.id, correct, this.props.currentCorrectAnswer))
      .then(this.props.dispatch(reset('answer')));
  }

  render() {
    return (
      <div>
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
    currentCorrectAnswer: state.questionReducer.currentCorrectAnswer
  };
};

const connectedAnswerForm = requiresLogin()(connect(mapStateToProps)(AnswerForm));

export default reduxForm({
  form: 'answer',
  onSubmitFail: (errors, dispatch) => dispatch(focus('answer', 'guess'))
})(connectedAnswerForm);
