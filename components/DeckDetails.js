import React from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { purple, white, red, orange, green } from '../utils/colors'

class DeckDetails extends React.Component {

  render() {

    const { decks, deckId } = this.props

    return (
      <View style={[styles.container]}>
        <View style={styles.card} >
          <Text style={styles.titleText}>{decks[deckId].title}</Text>
          <Text style={styles.cardnumText}> {decks[deckId].questions.length} {decks[deckId].questions.length > 1 ? "Cards" : "Card"} </Text>
          <TextButton onPress={() => this.props.navigation.navigate('NewCard', { deckId: deckId, name: decks[deckId].title })}
            styles={styles}
            text="Add Card"
            color={purple} />

          <TextButton onPress={() =>
            decks[deckId].questions.length > 0 ?
              this.props.navigation.navigate('QuizView', { deckId: deckId, name: decks[deckId].title })
              :
              this.props.navigation.navigate('QuizView', { deckId: deckId, name: decks[deckId].title })}
            styles={styles}
            text="Start Quiz"
            color={green} />

        </View>
      </View>
    )
  }
}

function mapStateToProps(decks, { route }) {
  const { deckId } = route.params;
  return {
    decks,
    deckId
  };
}

function mapDispatchToProps(dispatch, { route, navigation }) {
  return {
    goBack: () => navigation.goBack()
  }
}

const styles = StyleSheet.create({
  submitButton: {
    padding: 10,
    borderRadius: 7,
    width: 170,
    height: 45,
    margin: 5,
  },
  text: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
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
  titleText: {
    fontSize: 40,
    color: white,
  },
  cardnumText: {
    fontSize: 30,
    color: white,
    marginBottom: 50,

  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetails)


