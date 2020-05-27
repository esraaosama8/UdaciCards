import React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { addCardToDeck } from '../utils/api'
import { white, green } from '../utils/colors'

class NewCard extends React.Component {
    state = {
        question: '',
        answer: '',
        correctAnswer: ''
    }

    submitCard() {
        const { question, answer, correctAnswer } = this.state
        const deck = this.props.deckId
        const { addNewCard, goBack } = this.props
        addCardToDeck(deck,{ question, answer, correctAnswer })
        addNewCard({ question, answer, deck, correctAnswer })
        this.setState({
            question: '',
            answer: '',
            correctAnswer: ''
        })
        alert("Card Added Successfully!")
        this.props.navigation.navigate('DeckList')
    }

    render() {

        const { question, answer, correctAnswer } = this.state

        return (

            <KeyboardAwareScrollView>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                    <View style={styles.container}>
                        <Text style={styles.title}>What's the new question?</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(question) => this.setState({ question })}
                            value={question}
                        />
                        <Text style={styles.title}>What's the answer?</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(answer) => { this.setState({ answer }) }}
                            value={answer} />

                        <Text style={styles.title}>Please enter only 'Correct' or 'Incorrect' </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(correctAnswer) => this.setState({ correctAnswer })}
                            value={correctAnswer} />

                        <TouchableOpacity style={styles.submitButton} onPress={this.submitCard.bind(this)}>
                            <Text style={styles.buttonText}> Submit</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({
    buttonText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    submitButton: {
        borderWidth: 8.5,
        borderColor: "#d6d7da",
        padding: 10,
        backgroundColor: green,
        borderRadius: 7,
        overflow: "hidden"
    },
    title: {
        fontSize: 20,
        color: '#333',
        padding: 10,
        marginBottom: -20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: 350,
        fontSize: 15,
        height: 44,
        borderWidth: 1,
        borderColor: '#757575',
        borderRadius: 8,
        margin: 40,
        borderRadius: 7,
    },
    addCardTitle: {
        fontSize: 23,
        color: '#333',
        fontWeight: 'bold'

    },
    submit: {
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        padding: 10,
        borderRadius: 7,
        overflow: 'hidden'

    }
})


function mapStateToProps(decks, { route }) {
    const { deckId } = route.params;
    return {
        decks,
        deckId
    }
}

function mapDispatchToProps(dispatch, { navigation }) {
    return {
        addNewCard: ({ question, answer, deck, correctAnswer }) => {
            dispatch(addCard({ question, answer, deck, correctAnswer }))
        },
        goBack: () => navigation.goBack(),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewCard)


