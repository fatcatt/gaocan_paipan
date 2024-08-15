import {ScrollView, View, Text, TouchableHighlight, Button, Alert, Dimensions, Image} from 'react-native';
import styles from './style.js';
import React, {Component, useEffect, useState} from 'react';
import * as WeChat from 'react-native-wechat-lib';
import {SvgUri} from 'react-native-svg';
import axios from 'axios';
import PagerView from 'react-native-pager-view';
import usePagerView from './usePagerView';
import Record from './Record/index';
const screenHeight = Dimensions.get('window').height;
export default function RNWeChatDemo() {
    const [userInfo, setUserInfo] = useState({
        userName: '知许',
        userAvatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEKYYiczdBfOQkJQsNpsiazTmaNZmvAJeJZhiccqphqGsI62mWdnKWGwVXEqic0FbwTcKlokgGudGLFic75t1XP4mL0icib4ibcicTZpvwpHBzGbVG3BcEw/132'
    });
    const {pagerRef, setPage} = usePagerView();

    // 使用 useEffect 来模拟 componentDidMount 生命周期
    useEffect(() => {
        // console.log(WeChat);
        WeChat.registerApp('wxd2552a5aea69cdc8', 'https://gaocanyixue.com/paipan/');
        console.log(WeChat);
        console.log('重启');
        WeChat.isWXAppInstalled().then(res => {
            console.log(res);
        });
        // WeChat.openWXApp();
    }, []);

    const handleLogin = () => {
        console.log('授权');
        // WeChat.openWXApp().then(res => {
        //     console.log(res);
        // });

        WeChat.sendAuthRequest('snsapi_userinfo', '')
            .then((response: any) => {
                // todo 登录 response.code
                console.log(response);
                getAccessToken('wxd2552a5aea69cdc8', '7b38b871a45e2b486ac43d9bdeff387d', response.code);
            })
            .catch(error => {
                console.log(error);
                let errorCode = Number(error.code);
                if (errorCode === -2) {
                    Alert.alert('已取消授权登录');
                } else {
                    Alert.alert('微信授权登录失败');
                }
            });
    };

    const getAccessToken = (appid: string, secret: string, code: string) => {
        const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`;

        axios
            .get(url)
            .then(response => {
                const {data} = response;
                console.log('Access Token:', data);
                // 如果需要，这里可以调用获取用户信息的函数
                getUserInfo(data.access_token, data.openid);
            })
            .catch(error => {
                console.error('Error fetching access token:', error);
            });
    };

    function getUserInfo(access_token: string, openid: string) {
        const url = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}`;

        axios
            .get(url)
            .then(response => {
                const {data} = response;
                console.log('User Info:', data);
            })
            .catch(error => {
                console.error('Error fetching user information:', error);
            });
    }

    const onPressTab = index => {
        setPage(index);
    };

    return (
        <ScrollView style={styles.settingWrapper}>
            <View style={styles.userInfo}>
                <View style={styles.infoLeft}>
                    <Image source={{uri: `${userInfo.userAvatar}`}} style={styles.userAvatar} />
                    <Text style={styles.userName}>{userInfo.userName}</Text>
                    <Button title="登录" onPress={() => handleLogin()} />
                </View>
                <SvgUri style={styles.setLogo} uri="https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/debian.svg" />
            </View>
            <View style={styles.container}>
                <View style={styles.tabs}>
                    <Button title="记录" onPress={() => setPage(0)} />
                    <Button title="Go to Second" onPress={() => setPage(1)} />
                    <Button title="Go to Third" onPress={() => setPage(2)} />
                </View>
                <PagerView
                    ref={pagerRef}
                    style={styles.pagerView}
                    initialPage={0}
                    onPageSelected={e => {
                        console.log('Current page', e.nativeEvent.position);
                    }}>
                    <View key="1" style={styles.page}>
                        <Record></Record>
                    </View>
                    <View key="2" style={styles.page}>
                        <Text>Second page</Text>
                    </View>
                </PagerView>
            </View>
            {/* <Button title="登录123" onPress={handleLogin} /> */}
        </ScrollView>
    );
}
