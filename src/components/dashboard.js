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

    if (this.props.noData === true) {
      return (
        <div className="dashboard">
        <div className="dashboard-username">
          Hello, {this.props.username}
        </div>
        <div>
          <h2>There is no data! You need to add more questions to this deck.</h2>
        </div>
        <AddItemForm />
      </div>
      )
    } else {
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
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  console.log(state)
  return {
    username: currentUser.username,
    hasAnswered: state.guessReducer.isCorrect,
    noData: state.questionReducer.noData
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
