import React, {Component, useEffect, useState} from 'react';
import {ScrollView, View, FlatList, SafeAreaView, Text} from 'react-native';
import styles from './style.js';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item'
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item'
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item'
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item'
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item'
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item'
    }
];
const Item = ({title}) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

export default function Record() {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList data={DATA} renderItem={({item}) => <Item title={item.title} />} keyExtractor={item => item.id} />
        </SafeAreaView>
    );
}
