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
      const { question, answer, deck, correctAnswer } = action.card
      return {
        ...state,
        [deck]: {
          ...state[deck],
          questions: [...state[deck].questions, { question, answer, correctAnswer }]

        }
      }
      
    case REMOVE_DECK: {
      return {
        ...state,
        decks: state.decks.filter(deck => deck.id !== action.id)
      }
    }
    default:
      return state
  }
}

export default Decks 