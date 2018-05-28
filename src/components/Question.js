import React, { Component } from 'react';

class Question extends Component {
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
    currentQuestion: currentUser.currentQuestion
  };
};

export default Question;
