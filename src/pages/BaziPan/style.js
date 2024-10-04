import {View, Button, Text, DatePickerIOS, Platform} from 'react-native';
const styles = {
    paipanWrapper: {
        padding: 14,
        // backgroundColor: '#fff7b3',
        // backgroundColor: '#FFFFC0',
        // backgroundColor: '#F2F5FE',
        backgroundColor: '#fff',
        height: '100%'
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    column: {
        flex: 1
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
    boldFont: {
        fontWeight: 500
    },
    // 有相关性的间距与没有相关性的间距做区分 注意：有相关性的间距可能不是8，可能是0
    marginSeparate: {
        marginBottom: 16
    },
    marginClose: {
        marginBottom: 8
    },
    // 正式的字体与非正式的字体做区分
    formalFontFamily: {},
    inFormalFontFamily: {},
    // 标题与content做锁紧区分
    tabLeft: {
        marginLeft: 8
    },
    colorJin: {
        color: '#FF9900'
    },
    colorMu: {
        color: '#22DD22'
    },
    colorShui: {
        color: '#000000'
    },
    colorHuo: {
        color: '#DD2222'
    },
    colorTu: {
        color: '#a06300'
    },
    fontFamilyMain: {
        fontFamily: 'Arial'
    },
    inline: {
        flexWrap: 'nowrap',
        flexDirection: 'row'
    },
    yunFont: {
        color: '#333',
        fontSize: 18,
        fontWeight: 500
    },
    genderTitle: {
        fontSize: 18
    }
};
export default styles;
// 1、主体部分可以通过重复的方式凸显。比如八字主体和大运
// 2、应该形成明确的对比；主体的八字大运部分，和胎元命宫等形成明确对比
