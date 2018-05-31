import { MAKE_GUESS_REQUEST, MAKE_GUESS_SUCCESS, MAKE_GUESS_ERROR, RESET_FEEDBACK, INCREMENT_TOTAL_CORRECT  } from '../actions/guess';

const initialState = {
  currentGuess: '',
  isCorrect: null,
  loading: false,
  error: null,
  totalCorrect: 0,
  sessionTotalCorrect: -1
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
  } else if (action.type === INCREMENT_TOTAL_CORRECT) {
    const incrementSessionCount = state.sessionTotalCorrect + 1;
    return Object.assign({}, state, {
      totalCorrect: action.totalCorrect,
      sessionTotalCorrect: incrementSessionCount
    });
  }
  return state;
}