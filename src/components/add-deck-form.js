import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus, reset } from 'redux-form';
import Input from './input';
import { addDeck } from '../actions/decks';
import { required, nonEmpty } from '../validators';


class AddDeckForm extends React.Component {
  onSubmit(values) {
    this.props.dispatch(reset('add-deck-form'));
    this.props.dispatch(addDeck(this.props.authToken, this.props.userId, values.deckName));
  }

  render() {
    return (
      <form className="options__add-item-form login-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <label className="options__add-item-form__label" htmlFor="deckName">Deck Name</label>
        <Field
          component={Input}
          type="text"
          name="deckName"
          id="deckName"
          validate={[required, nonEmpty]}
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
  try {
    return ({
      authToken: state.auth.authToken,
      userId: state.auth.currentUser.id
    });
  } catch (err) {
    return ({
      authToken: null,
      userId: null
    });
  }
};

export default reduxForm({
  form: 'add-deck-form',
  onSubmitFail: (errors, dispatch) => dispatch(focus('add-item-form', 'deckName'))
})(connect(mapStateToProps)(AddDeckForm));
