import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import Question from './Question';
import Options from './options'
import AnswerForm from './AnswerForm';
import AddItemForm from './add-item-form';
import Feedback from './Feedback';

export class Dashboard extends React.Component {

  render() {

    let feedback = <Feedback />;

    if (this.props.hasAnswered === null) {
      feedback = '';
    }
    return (
      <div className="dashboard">
        <div className="dashboard-username">
          Hello, {this.props.username}
        </div>
        <h3 className="dashboard-deckname">{this.props.currentDeckName}</h3>
        <div className="main-question">
          <Question />
          <AnswerForm />
          <Options />
          {feedback}
        </div>
      </div>
    );
    }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  console.log(state)
  return {
    username: currentUser.username,
    userId: currentUser.id,
    hasAnswered: state.guessReducer.isCorrect,
    currentDeckName: state.deckReducer.currentDeck.name,
    authToken: state.auth.authToken,
    deckNames: state.deckReducer.deckNames
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
