import { RECEIVE_DECKS, ADD_DECK, ADD_CARD_TO_DECK, REMOVE_DECK } from '../actions'

function Decks(state = {}, action) {
  switch (action.type) {

    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }

    case ADD_DECK:
      const newDeck = {
        [action.deck]: {
          title: action.deck,
          questions: []
        }
      }
      return {
        ...state,
        ...newDeck
      }

    case ADD_CARD_TO_DECK:
      const { question, answer, deck } = action.card
      return {
        ...state,
        [deck]: {
          ...state[deck],
          questions: [...state[deck].questions, { question, answer }]

        }
      }

    case REMOVE_DECK: {
      const newState = Object.assign({}, state)
      delete newState[action.id];
      return newState;
    }

    default:
      return state
  }
}

export default Decks 