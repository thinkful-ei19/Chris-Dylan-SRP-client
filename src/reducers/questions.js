import { FETCH_CURRENT_QUESTION_REQUEST, FETCH_CURRENT_QUESTION_SUCCESS, FETCH_CURRENT_QUESTION_ERROR } from '../actions/questions';

const initialState = {
  currentQuestion: '',
  currentCorrectAnswer: '',
  currentQuestionId: '',
  loading: false,
  error: null
};

export default function questionReducer(state = initialState, action) {

  if (action.type === FETCH_CURRENT_QUESTION_REQUEST) {
    return Object.assign({}, state, { loading: true });
  } else if (action.type === FETCH_CURRENT_QUESTION_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      currentQuestion: action.currentQuestion,
      currentCorrectAnswer: action.currentCorrectAnswer,
      currentQuestionId: action.questionId
    });
  } else if (action.type === FETCH_CURRENT_QUESTION_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }

  return state;
}