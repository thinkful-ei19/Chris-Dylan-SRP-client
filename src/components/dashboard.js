import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import Question from './Question';
import Options from './options';
import AnswerForm from './AnswerForm';
import AddItemForm from './add-item-form';
import Feedback from './Feedback';
import { getDeckNames } from '../actions/decks';

export class Dashboard extends React.Component {

  componentDidMount() {

    this.props.dispatch(getDeckNames(this.props.authToken, this.props.userId));
  }

  render() {

    let feedback = <Feedback />;

    if (this.props.hasAnswered === null) {
      feedback = '';
    }

    if (this.props.noData === true) {
      return (
        <div className="dashboard">
          <div className="dashboard-username">
            Hello, {this.props.username}
          </div>
          <h3>{this.props.currentDeckName}</h3>
          <div>
            <h2>There is no data! You need to add more questions to this deck.</h2>
          </div>
          <AddItemForm />
        </div>
      );
    } else {
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
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: currentUser.username,
    userId: currentUser.id,
    hasAnswered: state.guessReducer.isCorrect,
    noData: state.questionReducer.noData,
    currentDeckName: state.deckReducer.currentDeck.name,
    authToken: state.auth.authToken,
    deckNames: state.deckReducer.deckNames
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
