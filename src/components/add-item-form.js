import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import { addItem } from '../actions/questions';

class AddItemForm extends React.Component {
  onSubmit(values) {
    let item = {
      question: values.question,
      answer: values.answer,
      deckId: this.props.currentDeckId
    };
    this.props.dispatch(addItem(this.props.authToken, item));
  }

  render() {
    return (
      <form className="options__add-item-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <label className="options__add-item-form__label" htmlFor="question">Question</label>
        <Field
          component={Input}
          type="text"
          name="question"
          id="question"
        />
        <label className="options__add-item-form__label" htmlFor="answer">Answer</label>
        <Field
          component={Input}
          type="answer"
          name="answer"
          id="answer"
        />
        <button
          className="options__add-item-form__button"
          disabled={this.props.pristine || this.props.submitting}>
          Add Item
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
  });
};

export default reduxForm({
  form: 'add-item-form',
  onSubmitFail: (errors, dispatch) => dispatch(focus('add-item-form', 'question'))
})(connect(mapStateToProps)(AddItemForm));
