import { MAKE_GUESS } from '../actions/guess';

const initialState = {
  currentGuess: ''
};

export default function guessReducer(state = initialState, action) {
  if (action.type === MAKE_GUESS) {
    return Object.assign({}, state, { currentGuess: action.currentGuess });
  }
  return state;
}