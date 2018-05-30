import React, { Component } from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import AddItemForm from './add-item-form';
import EditItemForm from './edit-item-form';
import AddDeckForm from './add-deck-form';
import {deleteItem} from '../actions/questions';
import {changeDeck, fetchCurrentDeck} from '../actions/decks';

class Options extends Component {

    dispatchChangeDeck(deckId) {
        this.props.dispatch(fetchCurrentDeck(this.props.authToken, deckId))
    }

    render() {
        //Setting component variable to bind this.
        const component = this;
        function deleteCurrentItem() {
            const request = {
                deckId: component.props.currentDeckId,
                questionId: component.props.currentQuestionId
            }
            component.props.dispatch(deleteItem(component.props.authToken, request))
        }
        let dropDownMenu = [];
        
        try {
            this.props.deckNames.forEach((deck) => {
                dropDownMenu.push(deck)
            })
        } catch(err) {
            //Remain silent, this will happen when the component first loads up.
        }
        const buildMenuJSX = dropDownMenu.map((item) => {
            return (
                <option key={item.id} value={item.id}>{item.name}</option>
            )
        })

        return (
            <div className="options">
                <button onClick={deleteCurrentItem} className="options__delete">Delete Current Item</button>       
                <EditItemForm/>
                <AddItemForm/>                
                <select onChange={(event) => {this.dispatchChangeDeck(event.target.value)}}>
                    {buildMenuJSX}                    
                </select>
                <AddDeckForm/>
            </div>
        )
    }

}

const mapStateToProps = state => {
    
    const { currentUser } = state.auth;
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
  