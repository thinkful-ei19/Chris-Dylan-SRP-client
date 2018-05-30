import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import { editItem } from '../actions/questions';

class EditItemForm extends React.Component {
  onSubmit(values) {
    let item = {
      question: values.question,
      answer: values.answer,
      deckId: this.props.currentDeckId,
      questionId: this.props.currentQuestionId
    }
    this.props.dispatch(editItem(this.props.authToken, item));
  }

  render() {
    return (
      <form className="options__edit-item-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <label className="options__edit-item-form__label" htmlFor="question">Question</label>
        <Field
          component={Input}
          type="text"
          name="question"
          id="question"
        />
        <label className="options__edit-item-form__label" htmlFor="answer">Answer</label>
        <Field
          component={Input}
          type="answer"
          name="answer"
          id="answer"
        />
        <button
          className="options__edit-item-form__button"
          disabled={this.props.pristine || this.props.submitting}>
          Edit Current Item
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return ({
    authToken: state.auth.authToken,
    currentQuestionId: state.questionReducer.currentQuestionId,
    currentDeckId: state.deckReducer.currentDeck.id
  })
}

export default reduxForm({
  form: 'edit-item-form',
  onSubmitFail: (errors, dispatch) => dispatch(focus('edit-item-form', 'question'))
})(connect(mapStateToProps)(EditItemForm));
