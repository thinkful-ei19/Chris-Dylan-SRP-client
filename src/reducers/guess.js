import { MAKE_GUESS_REQUEST, MAKE_GUESS_SUCCESS, MAKE_GUESS_ERROR, RESET_FEEDBACK } from '../actions/guess';

const initialState = {
  currentGuess: '',
  isCorrect: null,
  loading: false,
  error: null
};

export default function guessReducer(state = initialState, action) {
  if (action.type === MAKE_GUESS_REQUEST) {
    return Object.assign({}, state, { loading: true });
  } else if (action.type === MAKE_GUESS_SUCCESS) {
    return Object.assign({}, state, {
      currentGuess: action.currentGuess,
      isCorrect: action.isCorrect,
      previousCorrectAnswer: action.previousCorrectAnswer,
      loading: false
    });
  } else if (action.type === MAKE_GUESS_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === RESET_FEEDBACK) {
    return Object.assign({}, state, {
      currentGuess: '',
      isCorrect: null
    });
  }
  return state;
}