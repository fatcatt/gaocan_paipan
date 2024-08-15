import React, {Component, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import styles from './style.js';
export default function Template() {
    return (
        <ScrollView style={styles.Wrapper}>
            <View style={styles.userInfo}></View>
        </ScrollView>
    );
}
