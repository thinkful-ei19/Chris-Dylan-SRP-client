import { FETCH_CURRENT_QUESTION_REQUEST, FETCH_CURRENT_QUESTION_SUCCESS, FETCH_CURRENT_QUESTION_ERROR, NO_DATA } from '../actions/questions';

const initialState = {
  currentQuestion: '',
  currentCorrectAnswer: '',
  currentQuestionId: '',
  loading: false,
  error: null,
  noData: false
};

export default function questionReducer(state = initialState, action) {

  if (action.type === FETCH_CURRENT_QUESTION_REQUEST) {
    return Object.assign({}, state, { loading: true });
  } else if (action.type === FETCH_CURRENT_QUESTION_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      currentQuestion: action.currentQuestion,
      currentCorrectAnswer: action.currentCorrectAnswer,
      currentQuestionId: action.questionId,
      noData: false
    });
  } else if (action.type === FETCH_CURRENT_QUESTION_ERROR) {
    if (action.error) {
      return Object.assign({}, state, {
        currentQuestion: 'No questions to display!',
        error: action.error
      })
    }
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === NO_DATA) {
    return Object.assign({}, state, {
      noData: true
    });
  }
  
  return state;
}