import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import moment from 'moment';
import {obb} from '../../utils/lunar.js';
import {JD, J2000, radd, int2} from '../../utils/eph0.js';
import {year2Ayear, timeStr2hour} from '../../utils/tools.js';
import {getShenSha} from '../../utils/calcBazi';
import calendar from 'js-calendar-converter';
import {Lunar1} from '../../utils/lunar1';
import {setBaziRecord} from '../../api/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GanZhiMap} from '../../constants';
import styles from './style.js';

function BaziPanScreen({route}) {
    const curTZ = -8; //当前时区
    const {solarDate, gender, nickname, id = ''} = route.params.navigationParams;
    const [Cp11_J, setCp11_J] = useState('120');
    const [ob, setBazi] = useState({});
    const [BZ_result, setBZ_result] = useState({});

    useEffect(() => {
        ML_calc();
    }, [route.params.navigationParams]);

    async function ML_calc() {
        // const lunarDate = res?.lunarDate;
        // 阳历转阴历

        const timeRegex = /\d{1,2}:\d{2}(:\d{2})?/;
        const datetime = solarDate.match(timeRegex) ? solarDate.match(timeRegex)[0] : '';

        const [year, month, day] = solarDate.split(/[-\s:]/);
        const lunarDate = calendar.solar2lunar(year, month, day).lunarDate + ' ' + datetime;

        const lu = Lunar1().Lunar.fromDate(moment(solarDate, 'YYYY-M-D H').toDate());
        var d = lu.getEightChar();
        // 运
        var dayun = [];
        var yun = d.getYun(gender === 'male' ? 1 : 0);
        const getDaYun = yun.getDaYun();
        for (let i = 0; i < 8; i++) {
            dayun.push({
                qiyun: '出生' + yun.getStartYear() + '年' + yun.getStartMonth() + '个月' + yun.getStartDay() + '天后起运',
                ganzhi: getDaYun[i].getGanZhi(),
                startYear: getDaYun[i].getStartYear(),
                endYear: getDaYun[i].getEndYear(),
                startAge: getDaYun[i].getStartAge(),
                endAge: getDaYun[i].getEndAge(),
                liuNian: getDaYun[i].getLiuNian(),
                xiaoYun: getDaYun[i].getXiaoYun()
            });
        }
        // 藏干
        let canggan = {
            year: {wuxing: d.getYearHideGan(), shishen: d.getYearShiShenZhi()},
            month: {wuxing: d.getMonthHideGan(), shishen: d.getMonthShiShenZhi()},
            day: {wuxing: d.getDayHideGan(), shishen: d.getDayShiShenZhi()},
            time: {wuxing: d.getTimeHideGan(), shishen: d.getTimeShiShenZhi()}
        };
        // 十神
        let shishen = {
            year: d.getYearShiShenGan(),
            month: d.getMonthShiShenGan(),
            day: d.getDayShiShenGan(),
            time: d.getTimeShiShenGan()
        };
        // 纳音
        let nayin = {
            year: d.getYearNaYin(),
            month: d.getMonthNaYin(),
            day: d.getDayNaYin(),
            time: d.getTimeNaYin()
        };
        // 胎元 命宫 身宫
        let taiyuan = d.getTaiYuan();
        let minggong = d.getMingGong();
        let shengong = d.getShenGong();
        // 节气
        let jieqi;
        const [lunarCml_y, lunarCml_m, lunarCml_d] = lunarDate.split(/[-\s:]/);
        var d = Lunar1().Lunar.fromYmd(lunarCml_y, lunarCml_m, lunarCml_d);
        if (d.getCurrentJieQi()) {
            jieqi = '出生于' + d.getCurrentJieQi()._p.name + '0天';
        } else {
            let prev = d.getPrevJieQi(false);
            let diff = moment(solarDate, 'YYYY-M-D H').diff(moment(prev.getSolar().toYmdHms()), 'days');
            jieqi = '出生于' + prev.getName() + '后' + diff + '天';
        }
        // ---------------------我是分割-----------------------
        // form表单中的date有时是阴历，有时是阳历；这里使用排盘专用的阳历
        const [Cml_y, Cml_m, Cml_d] = solarDate.split(/[-\s:]/);
        var ob = new Object();
        var t = timeStr2hour(datetime);
        var jd = JD.JD(year2Ayear(Cml_y), Cml_m - 0, Cml_d - 0 + t / 24);
        obb.mingLiBaZi(jd + curTZ / 24 - J2000, Cp11_J / radd, ob); //八字计算
        // getLunar(Cml_y, Cml_m);
        setBazi(ob);
        const result = '<font color=red>  <b>[日标]：</b></font>' + '公历 ' + Cml_y + '-' + Cml_m + '-' + Cml_d + ' 儒略日数 ' + int2(jd + 0.5) + ' 距2000年首' + int2(jd + 0.5 - J2000) + '日<br>' + '<font color=red  ><b>[八字]：</b></font>' + ob.bz_jn + '年 ' + ob.bz_jy + '月 ' + ob.bz_jr + '日 ' + ob.bz_js + '时 真太阳 <font color=red>' + ob.bz_zty + '</font><br>' + '<font color=green><b>[纪时]：</b></font><i>' + ob.bz_JS + '</i><br>' + '<font color=green><b>[时标]：</b></font><i>' + '23　 01　 03　 05　 07　 09　 11　 13　 15　 17　 19　 21　 23';
        const shensha = getShenSha(ob, gender);
        setBZ_result({ob, dayun, solarDate: solarDate, lunarDate: lunarDate, jieqi, canggan, shishen, nayin, gender, taiyuan, minggong, shengong, shensha});
        // const dayun = getDaYun(gender, ob.bz_jy, ob.bz_jr);
        // getNianLi(Cml_y);
        const userid = await AsyncStorage.getItem('userid');
        if (id === '') {
            setBaziRecord({userid, nickname, gender: gender, solar_datetime: solarDate, bazi_summary: JSON.stringify(ob), place: ''}).then(res => {});
        }
    }
    return (
        <View style={styles.paipanWrapper}>
            <SafeAreaView>
                {/* <Text>{JSON.stringify(route)}</Text> */}
                <Text>{'出生时间：' + '阳历' + BZ_result.solarDate}</Text>
                <Text>{'出生时间：' + '阴历' + BZ_result.lunarDate}</Text>
                <Text style={styles.marginSeparate}>{BZ_result.jieqi}</Text>
                {/* <Text>{`${ob?.bz_jn}年${ob?.bz_jy}月${ob?.bz_jr}日${ob?.bz_js}时`}</Text> */}
                <View style={[styles.container, styles.marginSeparate]}>
                    <View style={styles.column}>
                        <Text style={[styles.genderTitle, styles.boldFont]}>{BZ_result?.gender === 'male' ? '乾造：' : '坤造：'}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.miniFont}>{BZ_result?.nayin?.year}</Text>
                        <Text>{BZ_result?.shishen?.year}</Text>
                        <Text style={[styles.bigFont, styles['color' + GanZhiMap[ob?.bz_jn?.slice(0, 1)]]]}>{BZ_result.ob?.bz_jn?.slice(0, 1)}</Text>
                        <Text style={[styles.bigFont, styles['color' + GanZhiMap[ob?.bz_jn?.slice(1, 2)]]]}>{BZ_result.ob?.bz_jn?.slice(1, 2)}</Text>
                        {BZ_result?.canggan?.year?.wuxing.map((e, i) => {
                            return (
                                <View style={styles.inline}>
                                    <Text style={[styles.miniFont, styles['color' + GanZhiMap[e]]]}>{e + ' '}</Text>
                                    <Text style={styles.miniFont}>{BZ_result?.canggan?.year?.shishen[i]}</Text>
                                </View>
                            );
                        })}
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.miniFont}>{BZ_result?.nayin?.month}</Text>
                        <Text>{BZ_result?.shishen?.month}</Text>
                        <Text style={[styles.bigFont, styles['color' + GanZhiMap[ob?.bz_jy?.slice(0, 1)]]]}>{ob?.bz_jy?.slice(0, 1)}</Text>
                        <Text style={[styles.bigFont, styles['color' + GanZhiMap[ob?.bz_jy?.slice(1, 2)]]]}>{ob?.bz_jy?.slice(1, 2)}</Text>
                        {BZ_result?.canggan?.month?.wuxing?.map((e, i) => {
                            return (
                                <View style={styles.inline}>
                                    <Text style={[styles.miniFont, styles['color' + GanZhiMap[e]]]}>{e + ' '}</Text>
                                    <Text style={styles.miniFont}>{BZ_result?.canggan?.month?.shishen[i]}</Text>
                                </View>
                            );
                        })}
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.miniFont}>{BZ_result?.nayin?.day}</Text>
                        <Text>{BZ_result?.shishen?.day}</Text>
                        <Text style={[styles.bigFont, styles['color' + GanZhiMap[ob?.bz_jr?.slice(0, 1)]]]}>{ob?.bz_jr?.slice(0, 1)}</Text>
                        <Text style={[styles.bigFont, styles['color' + GanZhiMap[ob?.bz_jr?.slice(1, 2)]]]}>{ob?.bz_jr?.slice(1, 2)}</Text>
                        {BZ_result?.canggan &&
                            BZ_result?.canggan.day.wuxing.map((e, i) => {
                                return (
                                    <View style={styles.inline}>
                                        <Text style={[styles.miniFont, styles['color' + GanZhiMap[e]]]}>{e + ' '}</Text>
                                        <Text style={styles.miniFont}>{BZ_result?.canggan?.day.shishen[i]}</Text>
                                    </View>
                                );
                            })}
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.miniFont}>{BZ_result?.nayin?.time}</Text>
                        <Text>{BZ_result?.shishen?.time}</Text>
                        <Text style={[styles.bigFont, styles['color' + GanZhiMap[ob?.bz_js?.slice(0, 1)]]]}>{ob?.bz_js?.slice(0, 1)}</Text>
                        <Text style={[styles.bigFont, styles['color' + GanZhiMap[ob?.bz_js?.slice(1, 2)]]]}>{ob?.bz_js?.slice(1, 2)}</Text>
                        {BZ_result?.canggan &&
                            BZ_result?.canggan.time.wuxing.map((e, i) => {
                                return (
                                    <View style={styles.inline}>
                                        <Text style={[styles.miniFont, styles['color' + GanZhiMap[e]]]}>{e + ' '}</Text>
                                        <Text style={styles.miniFont}>{BZ_result?.canggan?.time.shishen[i]}</Text>
                                    </View>
                                );
                            })}
                    </View>
                </View>
                <View style={styles.container}>
                    <Text style={[styles.column, styles.boldFont]}>{'神煞：'}</Text>
                    <View style={styles.column}>
                        {BZ_result?.shensha?.year?.jishen?.map(e => {
                            return <Text>{e}</Text>;
                        })}
                        {BZ_result?.shensha?.year?.xiongsha?.map(e => {
                            return <Text>{e}</Text>;
                        })}
                    </View>
                    <View style={styles.column}>
                        {BZ_result?.shensha?.month?.jishen?.map(e => {
                            return <Text>{e}</Text>;
                        })}
                        {BZ_result?.shensha?.month?.xiongsha?.map(e => {
                            return <Text>{e}</Text>;
                        })}
                    </View>
                    <View style={styles.column}>
                        {BZ_result?.shensha?.day?.jishen?.map(e => {
                            return <Text>{e}</Text>;
                        })}
                        {BZ_result?.shensha?.day?.xiongsha?.map(e => {
                            return <Text>{e}</Text>;
                        })}
                    </View>
                    <View style={styles.column}>
                        {BZ_result?.shensha?.time?.jishen?.map(e => {
                            return <Text>{e}</Text>;
                        })}
                        {BZ_result?.shensha?.time?.xiongsha?.map(e => {
                            return <Text>{e}</Text>;
                        })}
                    </View>
                </View>
                <View style={styles.marginSeparate}>
                    <Text style={styles.miniFont}>{'胎元：' + BZ_result?.taiyuan}</Text>
                    <Text style={styles.miniFont}>{'命宫：' + BZ_result?.minggong}</Text>
                    <Text style={styles.miniFont}>{'身宫：' + BZ_result?.shengong}</Text>
                </View>

                {BZ_result?.dayun && <Text style={styles.miniFont}>{'起运时间：' + BZ_result?.dayun[0]?.qiyun}</Text>}
                {/* <Text style={styles.miniFont}>{'大运：'}</Text> */}
                <View style={styles.container}>
                    {BZ_result?.dayun &&
                        BZ_result?.dayun.map(e => {
                            return (
                                <View style={styles.column}>
                                    <Text style={styles.yunFont}>{e.ganzhi || '小运'}</Text>
                                    <View style={styles.inline}>
                                        {/* <Text style={[styles.bigFont, styles['color' + GanZhiMap[e.ganzhi.slice(0, 1)]]]}>{e.ganzhi.slice(0, 1)}</Text>
                                        <Text style={[styles.bigFont, styles['color' + GanZhiMap[e.ganzhi.slice(1, 2)]]]}>{e.ganzhi.slice(1, 2)}</Text> */}
                                    </View>
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
            </SafeAreaView>
        </View>
    );
}

export default BaziPanScreen;
