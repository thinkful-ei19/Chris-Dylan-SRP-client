import React, { Component } from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import { required, nonEmpty } from '../validators';
import { makeGuess } from '../actions/guess';

class AnswerForm extends Component {

  onSubmit(value) {
    return this.props.dispatch(makeGuess(value));
  }

  render() {
    return (
      <div>
        <form
          className="answer-form"
          onSubmit={this.props.handleSubmit(value =>
            this.onSubmit(value)
          )}>
          <Field
            component={Input}
            type="text"
            name="guess"
            id="guess"
            validate={[required, nonEmpty]}
          />
          <button disabled={this.props.pristine || this.props.submitting}>
            Submit!
          </button>
        </form>

      </div>
    );
  }
}

export default reduxForm({
  form: 'answer',
  onSubmitFail: (errors, dispatch) => dispatch(focus('answer', 'guess'))
})(AnswerForm);
