import { FETCH_CURRENT_DECK_REQUEST, FETCH_CURRENT_DECK_SUCCESS, FETCH_CURRENT_DECK_ERROR } from '../actions/decks';

const initialState = {
  currentDeck: '',
  loading: false,
  error: null
};

export default function deckReducer(state = initialState, action) {
  if (action.type === FETCH_CURRENT_DECK_REQUEST) {
    return Object.assign({}, state, { loading: true });
  } else if (action.type === FETCH_CURRENT_DECK_SUCCESS) {
    return Object.assign({}, state, {
      currentDeck: action.currentDeck,
      loading: false
    });
  } else if (action.type === FETCH_CURRENT_DECK_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  return state;
}