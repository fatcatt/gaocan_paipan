import React, {useReducer, useState} from 'react';
import {View, Text, TextInput, Button, TouchableWithoutFeedback} from 'react-native';
import styles from './style1.js';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import moment from 'moment';
const reducer = (inputFrom, action) => {
    switch (action.type) {
        case 'UPDATE_NAME':
            return {...inputFrom, inputName: action.payload};
        case 'UPDATE_PLACE':
            return {...inputFrom, inputPlace: action.payload};
        case 'UPDATE_DATE':
            return {...inputFrom, inputDate: action.payload};
        default:
            return inputFrom;
    }
};
function HomeScreen1() {
    const [inputFrom, dispatch] = useReducer(reducer, {
        inputName: '',
        inputDate: '',
        inputPlace: ''
    });
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [dateSelectVis, setDateSelectVis] = useState(false);
    const handleSubmit = data => {
        console.log(inputFrom);
    };
    const onSelectDate = () => {
        console.log('2222');
        setDateSelectVis(true);
    };
    const handleComfirmDate = () => {
        dispatch({type: 'UPDATE_DATE', payload: moment(currentDateTime).format('YYYY-MM-DD hh:mm')});
    };
    const onDateChange = (e, date) => {
        console.log('3333');
        setCurrentDateTime(date);
    };
    return (
        <View style={styles.homeWrapper}>
            <View style={styles.inputInfo}>
                <TouchableWithoutFeedback onPress={onSelectDate}>
                    {/* 点击这个 View 区域会触发 openModal 函数 */}
                    <View style={styles.inputContainer}>
                        <TextInput value={inputFrom.inputDate} editable={false} placeholder="时间" pointerEvents="none" style={styles.formItem} />
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.inputContainer}>
                    <TextInput value={inputFrom.inputPlace} editable={false} placeholder="地点" pointerEvents="none" style={styles.formItem} />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput value={inputFrom.inputName} editable={false} placeholder="姓名" pointerEvents="none" style={styles.formItem} />
                </View>
            </View>
            <View style={styles.buttonBox}>
                <Button title="开始排盘" onPress={handleSubmit} />
            </View>
            <Modal isVisible={dateSelectVis} style={styles.modal} onBackdropPress={() => setDateSelectVis(false)}>
                <View style={styles.modalBox}>
                    <DateTimePicker value={currentDateTime} onConfirm={onDateChange} display="compact" mode="datetime" />
                    <Button title="确定" onPress={handleComfirmDate} />
                </View>
            </Modal>
        </View>
    );
}

export default HomeScreen1;
