import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import Question from './Question';
import Options from './options';
import AnswerForm from './AnswerForm';
import AddItemForm from './add-item-form';
import Feedback from './Feedback';
import {Redirect} from 'react-router-dom';

export class Dashboard extends React.Component {

  render() {
    if (this.props.currentTab === 'decks') {
      return <Redirect to='/decks' />
    }

    let feedback = <Feedback />;

    if (this.props.hasAnswered === null) {
      feedback = '';
    }
    return (
      <div className="dashboard">
        <div className="main-question">
          <div>
            <div className="dashboard-username">
              Hello, {this.props.username}
            </div>
            <h3 className="dashboard-deckname">{this.props.currentDeckName}</h3>
            <Question />
            <AnswerForm />
            {feedback}
          </div>
          <Options />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: currentUser.username,
    userId: currentUser.id,
    hasAnswered: state.guessReducer.isCorrect,
    currentDeckName: state.deckReducer.currentDeck.name,
    authToken: state.auth.authToken,
    deckNames: state.deckReducer.deckNames,
    currentTab: state.auth.currentTab
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
