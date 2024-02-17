import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Lunar1} from '../../utils/lunar1';
import styles from './style.js';

function BaziPanScreen({route}) {
    const {ob, dayun, res} = route.params.navigationParams;
    const [bazi, setBazi] = useState({});
    const GanZhiMap = {
        甲: 'Mu',
        乙: 'Mu',
        寅: 'Mu',
        卯: 'Mu',
        丙: 'Huo',
        丁: 'Huo',
        巳: 'Huo',
        午: 'Huo',
        戊: 'Tu',
        己: 'Tu',
        辰: 'Tu',
        戌: 'Tu',
        丑: 'Tu',
        未: 'Tu',
        庚: 'Jin',
        辛: 'Jin',
        申: 'Jin',
        酉: 'Jin',
        壬: 'Shui',
        癸: 'Shui',
        亥: 'Shui',
        子: 'Shui'
    };
    useEffect(() => {
        console.log(JSON.stringify(res.shensha));
    }, []);
    return (
        <View style={styles.paipanWrapper}>
            {/* <Text>{JSON.stringify(route)}</Text> */}
            <Text>{'出生时间：' + '阳历' + res.solarDate}</Text>
            <Text>{'出生时间：' + '阴历' + res.lunarDate}</Text>
            <Text style={styles.marginSeparate}>{res.jieqi}</Text>
            {/* <Text>{`${ob?.bz_jn}年${ob?.bz_jy}月${ob?.bz_jr}日${ob?.bz_js}时`}</Text> */}
            <View style={[styles.container, styles.marginSeparate]}>
                <View style={styles.column}>
                    <Text style={[styles.genderTitle, styles.boldFont]}>{res.gender === 'male' ? '乾造：' : '坤造：'}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.miniFont}>{res.nayin.year}</Text>
                    <Text>{res.shishen.year}</Text>
                    <Text style={[styles.bigFont, styles['color' + GanZhiMap[ob?.bz_jn.slice(0, 1)]]]}>{ob?.bz_jn.slice(0, 1)}</Text>
                    <Text style={[styles.bigFont, styles['color' + GanZhiMap[ob?.bz_jn.slice(1, 2)]]]}>{ob?.bz_jn.slice(1, 2)}</Text>
                    {res.canggan.year.wuxing.map((e, i) => {
                        return (
                            <View style={styles.inline}>
                                <Text style={[styles.miniFont, styles['color' + GanZhiMap[e]]]}>{e + ' '}</Text>
                                <Text style={styles.miniFont}>{res.canggan.year.shishen[i]}</Text>
                            </View>
                        );
                    })}
                </View>
                <View style={styles.column}>
                    <Text style={styles.miniFont}>{res.nayin.month}</Text>
                    <Text>{res.shishen.month}</Text>
                    <Text style={[styles.bigFont, styles['color' + GanZhiMap[ob?.bz_jy.slice(0, 1)]]]}>{ob?.bz_jy.slice(0, 1)}</Text>
                    <Text style={[styles.bigFont, styles['color' + GanZhiMap[ob?.bz_jy.slice(1, 2)]]]}>{ob?.bz_jy.slice(1, 2)}</Text>
                    {res.canggan.month.wuxing.map((e, i) => {
                        return (
                            <View style={styles.inline}>
                                <Text style={[styles.miniFont, styles['color' + GanZhiMap[e]]]}>{e + ' '}</Text>
                                <Text style={styles.miniFont}>{res.canggan.month.shishen[i]}</Text>
                            </View>
                        );
                    })}
                </View>
                <View style={styles.column}>
                    <Text style={styles.miniFont}>{res.nayin.day}</Text>
                    <Text>{res.shishen.day}</Text>
                    <Text style={[styles.bigFont, styles['color' + GanZhiMap[ob?.bz_jr.slice(0, 1)]]]}>{ob?.bz_jr.slice(0, 1)}</Text>
                    <Text style={[styles.bigFont, styles['color' + GanZhiMap[ob?.bz_jr.slice(1, 2)]]]}>{ob?.bz_jr.slice(1, 2)}</Text>
                    {res.canggan.day.wuxing.map((e, i) => {
                        return (
                            <View style={styles.inline}>
                                <Text style={[styles.miniFont, styles['color' + GanZhiMap[e]]]}>{e + ' '}</Text>
                                <Text style={styles.miniFont}>{res.canggan.day.shishen[i]}</Text>
                            </View>
                        );
                    })}
                </View>
                <View style={styles.column}>
                    <Text style={styles.miniFont}>{res.nayin.time}</Text>
                    <Text>{res.shishen.time}</Text>
                    <Text style={[styles.bigFont, styles['color' + GanZhiMap[ob?.bz_js.slice(0, 1)]]]}>{ob?.bz_js.slice(0, 1)}</Text>
                    <Text style={[styles.bigFont, styles['color' + GanZhiMap[ob?.bz_js.slice(1, 2)]]]}>{ob?.bz_js.slice(1, 2)}</Text>
                    {res.canggan.time.wuxing.map((e, i) => {
                        return (
                            <View style={styles.inline}>
                                <Text style={[styles.miniFont, styles['color' + GanZhiMap[e]]]}>{e + ' '}</Text>
                                <Text style={styles.miniFont}>{res.canggan.time.shishen[i]}</Text>
                            </View>
                        );
                    })}
                </View>
            </View>
            <View style={styles.container}>
                <Text style={[styles.column, styles.boldFont]}>{'神煞：'}</Text>
                <View style={styles.column}>
                    {res.shensha.year.jishen.map(e => {
                        return <Text>{e}</Text>;
                    })}
                    {res.shensha.year.xiongsha.map(e => {
                        return <Text>{e}</Text>;
                    })}
                </View>
                <View style={styles.column}>
                    {res.shensha.month.jishen.map(e => {
                        return <Text>{e}</Text>;
                    })}
                    {res.shensha.month.xiongsha.map(e => {
                        return <Text>{e}</Text>;
                    })}
                </View>
                <View style={styles.column}>
                    {res.shensha.day.jishen.map(e => {
                        return <Text>{e}</Text>;
                    })}
                    {res.shensha.day.xiongsha.map(e => {
                        return <Text>{e}</Text>;
                    })}
                </View>
                <View style={styles.column}>
                    {res.shensha.time.jishen.map(e => {
                        return <Text>{e}</Text>;
                    })}
                    {res.shensha.time.xiongsha.map(e => {
                        return <Text>{e}</Text>;
                    })}
                </View>
            </View>
            <View style={styles.marginSeparate}>
                <Text style={styles.miniFont}>{'胎元：' + res.taiyuan}</Text>
                <Text style={styles.miniFont}>{'命宫：' + res.minggong}</Text>
                <Text style={styles.miniFont}>{'身宫：' + res.shengong}</Text>
            </View>

            <Text style={styles.miniFont}>{'起运时间：' + dayun[0].qiyun}</Text>
            {/* <Text style={styles.miniFont}>{'大运：'}</Text> */}
            <View style={styles.container}>
                {dayun.map(e => {
                    return (
                        <View style={styles.column}>
                            <Text style={styles.yunFont}>{e.ganzhi || '小运'}</Text>
                            {/* <View style={styles.inline}>
                                <Text style={[styles.bigFont, styles['color' + GanZhiMap[e.ganzhi.slice(0, 1)]]]}>{e.ganzhi.slice(0, 1)}</Text>
                                <Text style={[styles.bigFont, styles['color' + GanZhiMap[e.ganzhi.slice(1, 2)]]]}>{e.ganzhi.slice(1, 2)}</Text>
                            </View> */}
                            <Text>{e.startYear}</Text>
                            <Text>{e.startAge}</Text>
                            <View>
                                {e.liuNian.map(nian => {
                                    return (
                                        <View>
                                            <Text>{nian.getGanZhi()}</Text>
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    );
                })}
            </View>
            {/* <Text>{dayun.join(',')}</Text> */}
        </View>
    );
}

export default BaziPanScreen;
