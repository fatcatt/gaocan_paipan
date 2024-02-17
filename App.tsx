/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';

import {Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/pages/Home/index';
import HomeScreen1 from './src/pages/Home/index1';
import SettingsScreen from './src/pages/Setting/index';
import BaziPanScreen from './src/pages/BaziPan/index';
import styles from './globalStyle.js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Home1" component={HomeScreen1} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
};

function App() {
    return (
        <View style={styles.body}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="back" component={TabNavigator} options={{headerShown: false}}></Stack.Screen>
                    <Stack.Screen name="八字盘" component={BaziPanScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}

export default App;
