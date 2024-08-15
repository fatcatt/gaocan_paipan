import {View, Button, Text, DatePickerIOS, Platform} from 'react-native';
const styles = {
    settingWrapper: {
        fontSize: 20,
        backgroundColor: '#fff'
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 32,
        justifyContent: 'space-between',
        backgroundColor: '#fff7a3'
    },
    infoLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
    userAvatar: {
        width: 50,
        height: 50,
        borderRadius: 40
    },
    userName: {
        fontSize: 18,
        fontWeight: 500
    },
    button: {
        margin: 5,
        backgroundColor: 'white',
        padding: 15,
        borderBottomColor: '#cdcdcd'
    },
    setLogo: {
        width: 28,
        height: 28
    },
    container: {
        backgroundColor: '#fff',
        flex: 1,
        borderRadius: 16,
        padding: 16,
        marginTop: -16
    },
    tabs: {
        flexDirection: 'row',
        gap: 8
    },
    pagerView: {
        flex: 1,
        width: 300,
        height: '100%'
    },
    page: {
        width: 300,
        height: 300
    }
};
export default styles;
