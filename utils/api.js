// yarn add @react-native-community/async-storage
// import AsyncStorage from '@react-native-community/async-storage'
import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'UdaciCards:decks';

const Data = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: ' a JavaScript library for building user interfaces',
                correctAnswer: 'correct'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event',
                correctAnswer: 'correct'
            } 
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is JavaScript?',
                answer: ' is a scripting language used to create and control dynamic web content.',
                correctAnswer: 'correct'
            }
        ]
    },
    Redux: {
        title: 'Redux',
        questions: [
            {
                question: 'What is Redux?',
                answer: 'is a closed-source JavaScript library for managing application state',
                correctAnswer: 'incorrect'
            }
        ]
    }
}

export const getData = () => {
    return Data;
}

export function getDecks() {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(results => {
            if (results === null) {

                return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(Data)
                ).then(() => Data);

            }
            return JSON.parse(results)
        })
}

export function saveDeck(title) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({

        [title]: {
            title: title,
            questions: []
        }
    }))
}

export function addCardToDeck(name, card) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(results => JSON.parse(results))
        .then(results => {
            results[name].questions.push(card)
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(results))

            return results
        })
}

export function removeEntry(deckID) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[deckID] = undefined
            delete data[deckID]
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
        })
} 