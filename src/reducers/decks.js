import { FETCH_CURRENT_DECK_REQUEST, FETCH_CURRENT_DECK_SUCCESS, FETCH_CURRENT_DECK_ERROR, FETCH_DECK_NAMES, CHANGE_DECK } from '../actions/decks';

const initialState = {
  currentDeck: '',
  loading: false,
  error: null,
  deckNames: ''
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
  } else if (action.type === FETCH_DECK_NAMES) {
    return Object.assign({}, state, {
      deckNames: action.decks
    });
  } else if (action.type === CHANGE_DECK) {
    return Object.assign({}, state, {
      currentDeck: action.deck
    })
  }
  return state;
}