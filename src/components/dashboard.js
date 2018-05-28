import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import Question from './Question';
import AnswerForm from './AnswerForm';
import Feedback from './Feedback';

export class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <div className="dashboard-username">
          Username: {this.props.username}
        </div>
        <Question />
        <AnswerForm />
        <Feedback />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: currentUser.username
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
