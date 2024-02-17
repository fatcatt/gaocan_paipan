import {View, Button, Text, DatePickerIOS, Platform} from 'react-native';
const styles = {
    dRig: {
        borderRight: '1px solid #888888',
        width: '35%',
        display: 'inline-block'
    },

    homeWrapper: {
        padding: 12
    },
    inputLeft: {
        width: 150,
        marginRight: 16
    },
    inputRight: {
        width: 150,
        marginLeft: 16
    },
    page: {
        width: 900,
        borderBottom: '1px solid #c0c0c0',
        display: 'flex',
        flexWrap: 'wrap',
        padding: 16
    },
    page10: {
        width: 900,
        borderBottom: '1px solid #c0c0c0',
        display: 'flex',
        flexWrap: 'wrap',
        padding: 16
    },
    inputMini: {
        width: 60
    },
    mt16: {
        marginTop: 16
    },
    mr16: {
        marginRight: 16
    },
    ml16: {
        marginLeft: 16
    },
    mb16: {
        marginBottom: 16
    },
    ftResItem: {
        marginTop: 8
    },
    inputInfo: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        paddingBottom: 24
        // boxSizing: 'border-box'
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#000'
    },
    buttonText: {
        color: '#fff', // 在 iOS 上设置文字颜色，在 Android 上设置为白色
        fontSize: 16,
        fontWeight: 'bold'
    },
    inputContent: {
        marginBottom: 15
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0
    },

    inputContainer: {
        width: '100%'
    },
    modalBox: {
        backgroundColor: '#fff',
        paddingTop: 8
    },
    formItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#c9c9cb',
        height: 40
    },
    selectButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    genderWrapper: {
        flexDirection: 'row'
    },
    activeButton: {
        width: 50,
        backgroundColor: '#000',
        paddingVertical: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000'
    },
    unActiveButton: {
        width: 50,
        backgroundColor: '#fff',
        paddingVertical: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000'
    },
    activeGenderText: {
        color: '#fff'
    },
    unActiveGenderText: {
        color: '#000'
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerColumn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bigFont: {
        fontSize: 20,
        fontWeight: 500,
        fontFamily: 'Arial'
    },
    middleFont: {
        fontSize: 16,
        fontWeight: 500
    },
    miniFont: {
        fontSize: 14
    },
    gzSelectBox: {
        width: 60,
        height: 60,
        backgroundColor: '#eee',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16
    },
    modalnei: {
        height: ' 100%'
    }
};
export default styles;
