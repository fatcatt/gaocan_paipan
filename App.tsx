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
import SettingsScreen from './src/pages/Setting/index';
import BaziPanScreen from './src/pages/BaziPan/index';
import styles from './globalStyle.js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="天机排盘宝" component={HomeScreen} options={{headerShown: false}} />
            <Tab.Screen name="设置" component={SettingsScreen} options={{headerShown: false}} />
        </Tab.Navigator>
    );
};

function App() {
    return (
        <View style={styles.body}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="back" component={TabNavigator} options={{headerShown: false}}></Stack.Screen>
                    <Stack.Screen name="八字盘" component={BaziPanScreen} options={{headerShown: false}} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}

export default App;
