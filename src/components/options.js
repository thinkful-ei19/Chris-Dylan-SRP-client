import React, { Component } from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import AddItemForm from './add-item-form';
import EditItemForm from './edit-item-form';
import { deleteItem } from '../actions/questions';

class Options extends Component {

  render() {
    //Setting component variable to bind this.
    const component = this;
    function deleteCurrentItem() {
      const request = {
        deckId: component.props.currentDeckId,
        questionId: component.props.currentQuestionId
      };
      component.props.dispatch(deleteItem(component.props.authToken, request));
    }
    let dropDownMenu = [];
    try {
      this.props.deckNames.decks.forEach((deck) => {
        dropDownMenu.push(deck);
      });
    } catch (err) {
      //Remain silent, this will happen when the component first loads up.
    }
    const buildMenuJSX = dropDownMenu.map((item) => {
      return (
        <option key={item.id} value={item.id}>{item.name}</option>
      );
    });

    return (
      <div className="options">
        <button onClick={deleteCurrentItem} className="options__delete">Delete Current Item</button>
        <EditItemForm />
        <AddItemForm />
        <select>
          {buildMenuJSX}
        </select>
        <button className="options__new-deck">New Deck</button>
      </div>
    );
  }

}

const mapStateToProps = state => {
  // const { currentUser } = state.auth;
  // console.log(state);
  return {
    authToken: state.auth.authToken,
    currentQuestion: state.questionReducer.currentQuestion,
    currentQuestionId: state.questionReducer.currentQuestionId,
    currentDeckId: state.deckReducer.currentDeck.id,
    userId: state.auth.currentUser.id,
    deckNames: state.deckReducer.deckNames
  };
};

export default requiresLogin()(connect(mapStateToProps)(Options));
