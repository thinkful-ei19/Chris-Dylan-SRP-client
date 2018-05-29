import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import Question from './Question';
import Options from './options'
import AnswerForm from './AnswerForm';
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
        <Question />
        <AnswerForm />
        <Options />
        {feedback}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: currentUser.username,
    hasAnswered: state.guessReducer.isCorrect
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
