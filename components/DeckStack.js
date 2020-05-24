import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import DeckList from "./DeckList"
import DeckDetails from "./DeckDetails"
import NewCard from './NewCard'
import QuizView from './QuizView'
import { white ,purple} from "../utils/colors"

const Stack = createStackNavigator();

const DeckStack = () => {
    return (
        <Stack.Navigator
            screenOptions={
                {
                    headerTintColor: white,
                    headerStyle: {
                        backgroundColor: purple,
                    }
                }
            }
        >
            <Stack.Screen name="DeckList" component={DeckList}
                options={{ title: "All Decks", }}
            />

            <Stack.Screen
                name="DeckDetails"
                component={DeckDetails}
                options={({ route }) => {
                    const { name } = route.params
                    return {
                        title: `${name} Deck`
                    }
                }
             }
            />
            <Stack.Screen
                name="QuizView"
                component={QuizView}
                options={{ title: `Quiz Cards` }}
            />
            <Stack.Screen
                name="NewCard"
                component={NewCard}
                options={{ title: `Add New Card` }}

            />

        </Stack.Navigator>
    )
}

export default DeckStack