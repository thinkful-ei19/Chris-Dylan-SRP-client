import React, { Component } from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import AddItemForm from './add-item-form';
import EditItemForm from './edit-item-form';
import {deleteItem} from '../actions/questions'

class Options extends Component {

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
        
        return (
            <div className="options">
                <button onClick={deleteCurrentItem} className="options__delete">Delete Current Item</button>       
                <EditItemForm/>
                <AddItemForm/>
            </div>
        )
    }

}

const mapStateToProps = state => {
    console.log(state)
    const { currentUser } = state.auth;
    return {
      authToken: state.auth.authToken,
      currentQuestion: state.questionReducer.currentQuestion,
      currentQuestionId: state.questionReducer.currentQuestionId,
      currentDeckId: state.deckReducer.currentDeck.id
    };
  };
  
  export default requiresLogin()(connect(mapStateToProps)(Options));
  