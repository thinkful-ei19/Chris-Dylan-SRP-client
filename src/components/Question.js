import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentQuestion } from '../actions/questions';
import requiresLogin from './requires-login';

class Question extends Component {

  componentDidMount() {
    this.props.dispatch(fetchCurrentQuestion(this.props.authToken));
  }

  render() {
    return (
      <div>
        {this.props.currentQuestion}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    authToken: currentUser,
    currentQuestion: state.questionReducer.currentQuestion
  };
};

export default requiresLogin()(connect(mapStateToProps)(Question));
