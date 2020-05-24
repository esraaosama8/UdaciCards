import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { Platform, StatusBar, View, Text, Image } from 'react-native';
import { createStore } from "redux";
import reducer from './reducers';
import { Provider } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { purple, white, black } from "./utils/colors";
import { FontAwesome } from "@expo/vector-icons";
import Constants from "expo-constants";
import { createStackNavigator } from '@react-navigation/stack';
import { setLocalNotification } from './utils/helpers'
import NewDeck from './components/NewDeck'
import DeckStack from './components/DeckStack'

function UdaciStatusBar({ backgroundColor, ...props }) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}


const Tabs =
    Platform.OS === "ios"
        ? createBottomTabNavigator()
        : createMaterialTopTabNavigator();


const TabNav = () => (
    <Tabs.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                let icon;
                if (route.name === "Deck List") {
                    icon = (
                        <FontAwesome name="home" size={25} color={black} />
                    );
                } else if (route.name === "New Deck") {
                    icon = (
                        <FontAwesome name="plus-square" size={25} color={black} />
                    );
                }
                return icon;
            }
        })}

        tabBarOptions={{
            header: null,
            activeTintColor: Platform.OS === "ios" ? purple : white,
            showIcon: true,
            style: {
                height: 80,
                backgroundColor: Platform.OS === "ios" ? white : purple,
                shadowColor: "rgba(0, 0, 0, 0.24)",
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 6,
                shadowOpacity: 1
            }
        }}
    >
        <Tabs.Screen
            name="Deck List"
            component={DeckStack}
            options={{ tabBarLabel: 'Home' }} />
        <Tabs.Screen
            name="New Deck"
            component={NewDeck}
            options={{ tabBarLabel: 'New Deck' }} />
    </Tabs.Navigator>
);


const Stack = createStackNavigator();
const MainNav = () => (
    <Stack.Navigator headerMode="screen">
        <Stack.Screen
            name="Home"
            component={TabNav}
            options={{ headerShown: false }} />

        {/* <Stack.Screen
            name="EntryDetail"
            component={EntryDetail}
            options={{
                headerTintColor: white, headerStyle: {
                    backgroundColor: purple,
                }
            }} /> */}

    </Stack.Navigator>
);


export default class App extends Component {

    componentDidMount() {
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{ flex: 1 }}>
                    <NavigationContainer>
                        <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
                        <MainNav />
                        {/* <TabNav/> */}
                    </NavigationContainer>
                </View>
            </Provider>

        );
    }
}
