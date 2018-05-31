import {
  SET_AUTH_TOKEN,
  CLEAR_AUTH,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  CHANGE_TAB
} from '../actions/auth';
import { FETCH_DECK_NAMES } from '../actions/decks';

const initialState = {
  authToken: null, // authToken !== null does not mean it has been validated
  currentUser: null,
  loading: false,
  error: null,
  currentTab: 'dashboard'
};

export default function reducer(state = initialState, action) {
  if (action.type === SET_AUTH_TOKEN) {
    return Object.assign({}, state, {
      authToken: action.authToken
    });
  } else if (action.type === CLEAR_AUTH) {
    return Object.assign({}, state, {
      authToken: null,
      currentUser: null
    });
  } else if (action.type === AUTH_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === AUTH_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      currentUser: action.currentUser
    });
  } else if (action.type === AUTH_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === FETCH_DECK_NAMES) {
    let decks = [];
    action.decks.forEach((deck) => {
      decks.push(deck.id)
    })
    let currentUser = state.currentUser;
    currentUser.decks = decks;
    return Object.assign({}, state, {
      currentUser: currentUser
    });
  } else if (action.type === CHANGE_TAB) {
    return Object.assign({}, state, {
      currentTab: action.currentTab
    })
  }

  return state;
}
