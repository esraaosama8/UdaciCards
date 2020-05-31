import React from 'react'
import { StyleSheet, View, Text, Animated, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white, orange, red, green } from '../utils/colors'
import TextButton from './TextButton'
import {
    clearLocalNotification,
    setLocalNotification
  } from "../utils/helpers"

class QuizView extends React.Component {
    state = {
        numberOfQuestions: 0,
        showQuestion: false,
        correct: 0,
        incorrect: 0,
    }

    goBack = () => {
        const { goBack } = this.props
        goBack();
    }

    handleFlip = () => {
        const { showQuestion } = this.state
        {
            !showQuestion ? this.setState({ showQuestion: true }) : this.setState({ showQuestion: false })
        }
    }

    tryAgain = () => {
        this.setState({
            showQuestion: false,
            numberOfQuestions: 0,
            correct: 0,
            incorrect: 0
        })
    }

    handleSubmit = (answer) => {
        const { numberOfQuestions, correct } = this.state;
        const questionsNumber = numberOfQuestions

        if (answer === 'correct') {
            this.setState({
                correct: correct + 1
            })
        }

        this.setState({
            numberOfQuestions: questionsNumber + 1
        })

        clearLocalNotification()
            .then(setLocalNotification)
    }


    render() {

        const { decks, deckId } = this.props
        const { numberOfQuestions, showQuestion, correct, incorrect } = this.state
        const currentQuestions = numberOfQuestions + 1

        if (numberOfQuestions === decks[deckId].questions.length && decks[deckId].questions.length >= 1) {
            return (
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Text style={styles.text}> You got {correct} correct out of {decks[deckId].questions.length} !  </Text>
                        <TextButton onPress={() => this.tryAgain()}
                            styles={styles}
                            text="Try Again"
                            color={green} />
                        <TextButton onPress={() => this.goBack()}
                            styles={styles}
                            text="Back"
                            color={red} />
                    </View>
                </View>
            )
        }
        if (decks[deckId].questions.length === 0) {
            return (
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Text style={styles.text}> NO CARDS ARE ADDED!  </Text>
                        <TextButton onPress={() => this.goBack()}
                            styles={styles}
                            text="Back"
                            color={red} />
                    </View>
                </View>
            )
        }

        return (

            <View style={[styles.container]}>
                <View style={styles.card} >
                    <Text style={styles.text}>{currentQuestions}/ {decks[deckId].questions.length}</Text>

                    {!showQuestion ?
                        <Text style={styles.questionText}>{decks[deckId].questions[numberOfQuestions].question}</Text>
                        :
                        <Text style={styles.questionText}>{decks[deckId].questions[numberOfQuestions].answer}</Text>

                    }

                    {!showQuestion ?
                        <TouchableOpacity onPress={this.handleFlip.bind(this)} >
                            <Text style={styles.flipButton}>Show Answer</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={this.handleFlip.bind(this)}>
                            <Text style={styles.flipButton}>Show Question</Text>
                        </TouchableOpacity>
                    }
                    
                    <Text style={styles.text}>Did you get the question                      "Correct" or "Incorrect" ?</Text>

                    <TextButton onPress={() => this.handleSubmit('correct')}
                        styles={styles}
                        text="Correct"
                        color={green} />
                    <TextButton onPress={() => this.handleSubmit('incorrect')}
                        styles={styles}
                        text="Incorrect"
                        color={red} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: orange,
        borderRadius: 10,
        height: 150,
        shadowRadius: 4,
        shadowOpacity: 1,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        }
    },
    container: {
        flex: 1,
        padding: 8,
        alignSelf: 'stretch'
    },
    text: {
        color: white,
        fontSize: 18,
        textAlign: 'center',
        margin: 1,
        paddingBottom: 10,
    },
    titleText: {
        fontSize: 40,
        color: white,
    },
    submitButton: {
        padding: 10,
        borderRadius: 7,
        width: 170,
        height: 45,
        margin: 5,
    },
    buttonText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',

    },
    questionText: {
        fontSize: 35,
        fontWeight: 'bold',
        padding: 20,
    },
    flipButton: {
        color: green,
        fontSize: 22,
        textAlign: 'center',
        margin: 20,
    }
})

function mapStateToProps(decks, { route }) {
    const { deckId } = route.params;
    return {
        decks,
        deckId
    }
}

function mapDispatchToProps(dispatch, { route, navigation }) {
    return {
        goBack: () => navigation.goBack(),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizView)

