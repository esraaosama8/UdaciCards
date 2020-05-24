import React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { saveDeck } from '../utils/api'
import { white, green } from '../utils/colors'

class NewDeck extends React.Component {

  state = {
    deckName: ''
  }

  submitDeck = () => {
    const { deckName } = this.state;
    const { addNewDeck } = this.props;
    saveDeck(deckName)
    addNewDeck(deckName)
    this.props.navigation.navigate('DeckDetails', {
      deckId: deckName
    })
    this.setState({ 
      deckName: '' 
    })
  }

  render() {

    return (
      
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.Os == "ios" ? "padding" : "height"} >
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>

          <View style={styles.container}>
            <Text style={styles.title}>Enter the new deck's name</Text>
            <TextInput style={[styles.textinput]}
              onChangeText={(deckName) => this.setState({ deckName })}
              value={this.state.text}
            />

            <TouchableOpacity style={styles.submitButton} onPress={this.submitDeck}>
              <Text style={styles.buttonText}> Submit</Text>
            </TouchableOpacity>
          </View>

        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
    borderWidth: 4,
    borderColor: "#d6d7da",
    padding: 10,
    backgroundColor: green,
    borderRadius: 4,
    overflow: "hidden"
  },
  textinput: {
    padding: 10,
    fontSize: 20,
    width: 350,
    height: 44,
    borderWidth: 1,
    borderColor: '#757575',
    borderRadius: 8,
    margin: 40,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 23,
    color: '#333',
    fontWeight: 'bold'
  },
})

function mapDispatchToProps(dispatch) {
  return {
    addNewDeck: (decks) => {
      dispatch(addDeck(decks))
    }
  }
}

export default connect(null, mapDispatchToProps)(NewDeck)