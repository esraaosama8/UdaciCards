import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDecks, removeEntry } from '../utils/api'
import { receiveDecks } from '../actions'
import { white, orange } from '../utils/colors'
import { AppLoading } from 'expo'

class DeckList extends Component {

  state = {
    loading: false,
  }

  componentDidMount() {
    const { dispatch } = this.props
    getDecks().then((decks) => 
    dispatch(decks)).then(() =>
      this.setState(() => ({
        loading: true
      })))
  }

  renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() =>

        this.props.navigation.navigate('DeckDetails', {
          deckId: item.id, name: item.title

        })}
        style={styles.button}
      >
        <Text style={styles.cardText}> {item.title}</Text>
        <Text style={styles.cardText}>{item.questions.length}</Text>

      </TouchableOpacity>
    </View>
  )

  render() {
    const { decks } = this.props

    const { loading } = this.state

    if (loading === false) {
      return <AppLoading />
    }

    return (
      <SafeAreaView style={styles.cardContainer}>
        <FlatList
          data={decks}
          renderItem={this.renderItem}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    padding: 8,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    backgroundColor: orange,
    margin: 8,
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
  cardText: {
    fontSize: 25,
    color: white,
  },
})


function mapStateToProps(decks) {
  const data = Object.keys(decks).map(key => {
    return {
      id: key,
      key,
      title: decks[key].title,
      questions: decks[key].questions
    }
  })
  return {
    decks: data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: (decks) => {
      dispatch(receiveDecks(decks))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DeckList)