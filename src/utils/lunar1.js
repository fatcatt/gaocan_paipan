function Lunar1() {
    var Solar = (function () {
        var _fromDate = function (date) {
            return _fromYmdHms(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
        };
        var _fromJulianDay = function (julianDay) {
            var d = Math.floor(julianDay + 0.5);
            var f = julianDay + 0.5 - d;
            var c;

            if (d >= 2299161) {
                c = Math.floor((d - 1867216.25) / 36524.25);
                d += 1 + c - Math.floor(c / 4);
            }
            d += 1524;
            var year = Math.floor((d - 122.1) / 365.25);
            d -= Math.floor(365.25 * year);
            var month = Math.floor(d / 30.601);
            d -= Math.floor(30.601 * month);
            var day = d;
            if (month > 13) {
                month -= 13;
                year -= 4715;
            } else {
                month -= 1;
                year -= 4716;
            }
            f *= 24;
            var hour = Math.floor(f);

            f -= hour;
            f *= 60;
            var minute = Math.floor(f);

            f -= minute;
            f *= 60;
            var second = Math.round(f);
            if (second > 59) {
                second -= 60;
                minute++;
            }
            if (minute > 59) {
                minute -= 60;
                hour++;
            }
            if (hour > 23) {
                hour -= 24;
                day += 1;
            }
            return _fromYmdHms(year, month, day, hour, minute, second);
        };
        var _fromYmdHms = function (y, m, d, hour, minute, second) {
            var oy = y;
            var om = m;
            var od = d;
            var oh = hour;
            var oi = minute;
            var os = second;
            y *= 1;
            if (isNaN(y)) {
                throw new Error('wrong solar year ' + oy);
            }
            m *= 1;
            if (isNaN(m)) {
                throw new Error('wrong solar month ' + om);
            }
            d *= 1;
            if (isNaN(d)) {
                throw new Error('wrong solar day ' + od);
            }
            hour *= 1;
            if (isNaN(hour)) {
                throw new Error('wrong hour ' + oh);
            }
            minute *= 1;
            if (isNaN(minute)) {
                throw new Error('wrong minute ' + oi);
            }
            second *= 1;
            if (isNaN(second)) {
                throw new Error('wrong second ' + os);
            }
            if (1582 === y && 10 === m) {
                if (d > 4 && d < 15) {
                    throw new Error('wrong solar year ' + y + ' month ' + m + ' day ' + d);
                }
            }
            if (m < 1 || m > 12) {
                throw new Error('wrong month ' + m);
            }
            if (d < 1 || d > 31) {
                throw new Error('wrong day ' + d);
            }
            if (hour < 0 || hour > 23) {
                throw new Error('wrong hour ' + hour);
            }
            if (minute < 0 || minute > 59) {
                throw new Error('wrong minute ' + minute);
            }
            if (second < 0 || second > 59) {
                throw new Error('wrong second ' + second);
            }
            return {
                _p: {
                    year: y,
                    month: m,
                    day: d,
                    hour: hour,
                    minute: minute,
                    second: second
                },
                subtract: function (solar) {
                    return SolarUtil.getDaysBetween(solar.getYear(), solar.getMonth(), solar.getDay(), this._p.year, this._p.month, this._p.day);
                },
                subtractMinute: function (solar) {
                    var days = this.subtract(solar);
                    var cm = this._p.hour * 60 + this._p.minute;
                    var sm = solar.getHour() * 60 + solar.getMinute();
                    var m = cm - sm;
                    if (m < 0) {
                        m += 1440;
                        days--;
                    }
                    m += days * 1440;
                    return m;
                },

                getYear: function () {
                    return this._p.year;
                },
                getMonth: function () {
                    return this._p.month;
                },
                getDay: function () {
                    return this._p.day;
                },
                getHour: function () {
                    return this._p.hour;
                },
                getMinute: function () {
                    return this._p.minute;
                },
                getSecond: function () {
                    return this._p.second;
                },
                getWeek: function () {
                    return (Math.floor(this.getJulianDay() + 0.5) + 7000001) % 7;
                },
                getWeekInChinese: function () {
                    return SolarUtil.WEEK[this.getWeek()];
                },
                getFestivals: function () {
                    var l = [];
                    var f = SolarUtil.FESTIVAL[this._p.month + '-' + this._p.day];
                    if (f) {
                        l.push(f);
                    }
                    var weeks = Math.ceil(this._p.day / 7);
                    var week = this.getWeek();
                    f = SolarUtil.WEEK_FESTIVAL[this._p.month + '-' + weeks + '-' + week];
                    if (f) {
                        l.push(f);
                    }
                    if (this._p.day + 7 > SolarUtil.getDaysOfMonth(this._p.year, this._p.month)) {
                        f = SolarUtil.WEEK_FESTIVAL[this._p.month + '-0-' + week];
                        if (f) {
                            l.push(f);
                        }
                    }
                    return l;
                },
                getXingzuo: function () {
                    return this.getXingZuo();
                },
                getXingZuo: function () {
                    var index = 11;
                    var y = this._p.month * 100 + this._p.day;
                    if (y >= 321 && y <= 419) {
                        index = 0;
                    } else if (y >= 420 && y <= 520) {
                        index = 1;
                    } else if (y >= 521 && y <= 621) {
                        index = 2;
                    } else if (y >= 622 && y <= 722) {
                        index = 3;
                    } else if (y >= 723 && y <= 822) {
                        index = 4;
                    } else if (y >= 823 && y <= 922) {
                        index = 5;
                    } else if (y >= 923 && y <= 1023) {
                        index = 6;
                    } else if (y >= 1024 && y <= 1122) {
                        index = 7;
                    } else if (y >= 1123 && y <= 1221) {
                        index = 8;
                    } else if (y >= 1222 || y <= 119) {
                        index = 9;
                    } else if (y <= 218) {
                        index = 10;
                    }
                    return SolarUtil.XINGZUO[index];
                },
                toFullString: function () {
                    var s = this.toYmdHms();
                    if (this.isLeapYear()) {
                        s += ' 闰年';
                    }
                    s += ' 星期' + this.getWeekInChinese();
                    var festivals = this.getFestivals();
                    for (var i = 0, j = festivals.length; i < j; i++) {
                        s += ' (' + festivals[i] + ')';
                    }
                    s += ' ' + this.getXingZuo() + '座';
                    return s;
                },

                /**
                 * 获取当天的阳历周
                 * @param start 星期几作为一周的开始，1234560分别代表星期一至星期天
                 */
                getSolarWeek: function (start) {
                    // return SolarWeek.fromYmd(this._p.year, this._p.month, this._p.day, start);
                },
                isLeapYear: function () {
                    return SolarUtil.isLeapYear(this._p.year);
                },

                toYmd: function () {
                    var m = this._p.month;
                    var d = this._p.day;
                    var y = this._p.year + '';
                    while (y.length < 4) {
                        y = '0' + y;
                    }
                    return [y, (m < 10 ? '0' : '') + m, (d < 10 ? '0' : '') + d].join('-');
                },
                toYmdHms: function () {
                    return this.toYmd() + ' ' + [(this._p.hour < 10 ? '0' : '') + this._p.hour, (this._p.minute < 10 ? '0' : '') + this._p.minute, (this._p.second < 10 ? '0' : '') + this._p.second].join(':');
                },
                toString: function () {
                    return this.toYmd();
                },

                nextYear: function (years) {
                    var oy = years;
                    years *= 1;
                    if (isNaN(years)) {
                        throw new Error('wrong years ' + oy);
                    }
                    var y = this._p.year + years;
                    var m = this._p.month;
                    var d = this._p.day;
                    if (1582 === y && 10 === m) {
                        if (d > 4 && d < 15) {
                            d += 10;
                        }
                    } else if (2 === m) {
                        if (d > 28) {
                            if (!SolarUtil.isLeapYear(y)) {
                                d = 28;
                            }
                        }
                    }
                    return _fromYmdHms(y, m, d, this._p.hour, this._p.minute, this._p.second);
                },
                nextMonth: function (months) {
                    var om = months;
                    months *= 1;
                    if (isNaN(months)) {
                        throw new Error('wrong months ' + om);
                    }
                    var month = SolarMonth.fromYm(this._p.year, this._p.month).next(months);
                    var y = month.getYear();
                    var m = month.getMonth();
                    var d = this._p.day;
                    if (1582 === y && 10 === m) {
                        if (d > 4 && d < 15) {
                            d += 10;
                        }
                    } else {
                        var maxDay = SolarUtil.getDaysOfMonth(y, m);
                        if (d > maxDay) {
                            d = maxDay;
                        }
                    }
                    return _fromYmdHms(y, m, d, this._p.hour, this._p.minute, this._p.second);
                },
                nextDay: function (days) {
                    var od = days;
                    days *= 1;
                    if (isNaN(days)) {
                        throw new Error('wrong days ' + od);
                    }
                    var y = this._p.year;
                    var m = this._p.month;
                    var d = this._p.day;
                    if (1582 === y && 10 === m) {
                        if (d > 4) {
                            d -= 10;
                        }
                    }
                    if (days > 0) {
                        d += days;
                        var daysInMonth = SolarUtil.getDaysOfMonth(y, m);
                        while (d > daysInMonth) {
                            d -= daysInMonth;
                            m++;
                            if (m > 12) {
                                m = 1;
                                y++;
                            }
                            daysInMonth = SolarUtil.getDaysOfMonth(y, m);
                        }
                    } else if (days < 0) {
                        while (d + days <= 0) {
                            m--;
                            if (m < 1) {
                                m = 12;
                                y--;
                            }
                            d += SolarUtil.getDaysOfMonth(y, m);
                        }
                        d += days;
                    }
                    if (1582 === y && 10 === m) {
                        if (d > 4) {
                            d += 10;
                        }
                    }
                    return _fromYmdHms(y, m, d, this._p.hour, this._p.minute, this._p.second);
                },

                next: function (days, onlyWorkday) {
                    if (onlyWorkday) {
                        return this.nextWorkday(days);
                    }
                    return this.nextDay(days);
                },
                nextHour: function (hours) {
                    var oh = hours;
                    hours *= 1;
                    if (isNaN(hours)) {
                        throw new Error('wrong hours ' + oh);
                    }
                    var h = this._p.hour + hours;
                    var n = h < 0 ? -1 : 1;
                    var hour = Math.abs(h);
                    var days = Math.floor(hour / 24) * n;
                    hour = (hour % 24) * n;
                    if (hour < 0) {
                        hour += 24;
                        days--;
                    }
                    var solar = this.next(days);
                    return _fromYmdHms(solar.getYear(), solar.getMonth(), solar.getDay(), hour, solar.getMinute(), solar.getSecond());
                },
                getLunar: function () {
                    return Lunar.fromSolar(this);
                },
                getJulianDay: function () {
                    var y = this._p.year;
                    var m = this._p.month;
                    var d = this._p.day + ((this._p.second / 60 + this._p.minute) / 60 + this._p.hour) / 24;
                    var n = 0;
                    var g = false;
                    if (y * 372 + m * 31 + Math.floor(d) >= 588829) {
                        g = true;
                    }
                    if (m <= 2) {
                        m += 12;
                        y--;
                    }
                    if (g) {
                        n = Math.floor(y / 100);
                        n = 2 - n + Math.floor(n / 4);
                    }
                    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + n - 1524.5;
                }
            };
        };
        var _fromBaZi = function (yearGanZhi, monthGanZhi, dayGanZhi, timeGanZhi, sect, baseYear) {
            sect *= 1;
            if (isNaN(sect)) {
                sect = 2;
            }
            if (1 !== sect) {
                sect = 2;
            }
            baseYear *= 1;
            if (isNaN(baseYear)) {
                baseYear = 1900;
            }
            var l = [];
            var years = [];
            var today = _fromDate(new Date());
            var offsetYear = ((today.getYear() - 4) % 60) - LunarUtil.getJiaZiIndex(yearGanZhi);
            if (offsetYear < 0) {
                offsetYear += 60;
            }
            var startYear = today.getYear() - offsetYear - 1;
            var minYear = baseYear - 2;
            while (startYear >= minYear) {
                years.push(startYear);
                startYear -= 60;
            }
            var hours = [];
            var timeZhi = LunarUtil.find(timeGanZhi, LunarUtil.ZHI);
            hours.push((timeZhi.index - 1) * 2);
            if (1 === timeZhi.index) {
                hours.push(23);
            }
            var j = years.length;
            for (var m = 0, n = hours.length; m < n; m++) {
                for (var i = 0; i < j; i++) {
                    var y = years[i];
                    var maxYear = y + 3;
                    var year = y;
                    var month = 11;
                    if (year < baseYear) {
                        year = baseYear;
                        month = 1;
                    }
                    var solar = _fromYmdHms(year, month, 1, hours[m], 0, 0);
                    while (solar.getYear() <= maxYear) {
                        var lunar = solar.getLunar();
                        var dgz = 2 === sect ? lunar.getDayInGanZhiExact2() : lunar.getDayInGanZhiExact();
                        if (lunar.getYearInGanZhiExact() === yearGanZhi && lunar.getMonthInGanZhiExact() === monthGanZhi && dgz === dayGanZhi && lunar.getTimeInGanZhi() === timeGanZhi) {
                            l.push(solar);
                            break;
                        }
                        solar = solar.next(1);
                    }
                }
            }
            return l;
        };
        return {
            J2000: 2451545,
            fromYmd: function (y, m, d) {
                return _fromYmdHms(y, m, d, 0, 0, 0);
            },
            fromYmdHms: function (y, m, d, hour, minute, second) {
                return _fromYmdHms(y, m, d, hour, minute, second);
            },
            fromDate: function (date) {
                return _fromDate(date);
            },
            fromJulianDay: function (julianDay) {
                return _fromJulianDay(julianDay);
            },
            fromBaZi: function (yearGanZhi, monthGanZhi, dayGanZhi, timeGanZhi, sect, baseYear) {
                return _fromBaZi(yearGanZhi, monthGanZhi, dayGanZhi, timeGanZhi, sect, baseYear);
            }
        };
    })();
    var Lunar = (function () {
        var _computeJieQi = function (o, ly) {
            o['jieQiList'] = [];
            o['jieQi'] = {};
            var julianDays = ly.getJieQiJulianDays();
            for (var i = 0, j = LunarUtil.JIE_QI_IN_USE.length; i < j; i++) {
                var key = LunarUtil.JIE_QI_IN_USE[i];
                o['jieQiList'].push(key);
                o['jieQi'][key] = Solar.fromJulianDay(julianDays[i]);
            }
        };
        var _computeYear = function (o, solar, year) {
            //以正月初一开始
            var offset = year - 4;
            var yearGanIndex = offset % 10;
            var yearZhiIndex = offset % 12;

            if (yearGanIndex < 0) {
                yearGanIndex += 10;
            }

            if (yearZhiIndex < 0) {
                yearZhiIndex += 12;
            }

            //以立春作为新一年的开始的干支纪年
            var g = yearGanIndex;
            var z = yearZhiIndex;

            //精确的干支纪年，以立春交接时刻为准
            var gExact = yearGanIndex;
            var zExact = yearZhiIndex;

            var solarYear = solar.getYear();
            var solarYmd = solar.toYmd();
            var solarYmdHms = solar.toYmdHms();

            //获取立春的阳历时刻
            var liChun = o['jieQi'][I18n.getMessage('jq.liChun')];
            if (liChun.getYear() !== solarYear) {
                liChun = o['jieQi']['LI_CHUN'];
            }
            var liChunYmd = liChun.toYmd();
            var liChunYmdHms = liChun.toYmdHms();

            //阳历和阴历年份相同代表正月初一及以后
            if (year === solarYear) {
                //立春日期判断
                if (solarYmd < liChunYmd) {
                    g--;
                    z--;
                }
                //立春交接时刻判断
                if (solarYmdHms < liChunYmdHms) {
                    gExact--;
                    zExact--;
                }
            } else if (year < solarYear) {
                if (solarYmd >= liChunYmd) {
                    g++;
                    z++;
                }
                if (solarYmdHms >= liChunYmdHms) {
                    gExact++;
                    zExact++;
                }
            }

            o['yearGanIndex'] = yearGanIndex;
            o['yearZhiIndex'] = yearZhiIndex;
            o['yearGanIndexByLiChun'] = (g < 0 ? g + 10 : g) % 10;
            o['yearZhiIndexByLiChun'] = (z < 0 ? z + 12 : z) % 12;
            o['yearGanIndexExact'] = (gExact < 0 ? gExact + 10 : gExact) % 10;
            o['yearZhiIndexExact'] = (zExact < 0 ? zExact + 12 : zExact) % 12;
        };
        var _computeMonth = function (o, solar) {
            var start = null;
            var i;
            var end;
            var size = LunarUtil.JIE_QI_IN_USE.length;

            //序号：大雪以前-3，大雪到小寒之间-2，小寒到立春之间-1，立春之后0
            var index = -3;
            for (i = 0; i < size; i += 2) {
                end = o.jieQi[LunarUtil.JIE_QI_IN_USE[i]];
                var ymd = solar.toYmd();
                var symd = null == start ? ymd : start.toYmd();
                if (ymd >= symd && ymd < end.toYmd()) {
                    break;
                }
                start = end;
                index++;
            }
            var offset = ((((o.yearGanIndexByLiChun + (index < 0 ? 1 : 0)) % 5) + 1) * 2) % 10;
            o['monthGanIndex'] = ((index < 0 ? index + 10 : index) + offset) % 10;
            o['monthZhiIndex'] = ((index < 0 ? index + 12 : index) + LunarUtil.BASE_MONTH_ZHI_INDEX) % 12;

            start = null;
            index = -3;
            for (i = 0; i < size; i += 2) {
                end = o.jieQi[LunarUtil.JIE_QI_IN_USE[i]];
                var time = solar.toYmdHms();
                var stime = null == start ? time : start.toYmdHms();
                if (time >= stime && time < end.toYmdHms()) {
                    break;
                }
                start = end;
                index++;
            }
            offset = ((((o.yearGanIndexExact + (index < 0 ? 1 : 0)) % 5) + 1) * 2) % 10;
            o['monthGanIndexExact'] = ((index < 0 ? index + 10 : index) + offset) % 10;
            o['monthZhiIndexExact'] = ((index < 0 ? index + 12 : index) + LunarUtil.BASE_MONTH_ZHI_INDEX) % 12;
        };
        var _computeDay = function (o, solar, hour, minute) {
            var noon = Solar.fromYmdHms(solar.getYear(), solar.getMonth(), solar.getDay(), 12, 0, 0);
            var offset = Math.floor(noon.getJulianDay()) - 11;
            var dayGanIndex = offset % 10;
            var dayZhiIndex = offset % 12;

            o['dayGanIndex'] = dayGanIndex;
            o['dayZhiIndex'] = dayZhiIndex;
            var dayGanExact = dayGanIndex;
            var dayZhiExact = dayZhiIndex;
            o['dayGanIndexExact2'] = dayGanExact;
            o['dayZhiIndexExact2'] = dayZhiExact;
            var hm = (hour < 10 ? '0' : '') + hour + ':' + (minute < 10 ? '0' : '') + minute;
            if (hm >= '23:00' && hm <= '23:59') {
                dayGanExact++;
                if (dayGanExact >= 10) {
                    dayGanExact -= 10;
                }
                dayZhiExact++;
                if (dayZhiExact >= 12) {
                    dayZhiExact -= 12;
                }
            }
            o['dayGanIndexExact'] = dayGanExact;
            o['dayZhiIndexExact'] = dayZhiExact;
        };
        var _computeTime = function (o, hour, minute) {
            var timeZhiIndex = LunarUtil.getTimeZhiIndex((hour < 10 ? '0' : '') + hour + ':' + (minute < 10 ? '0' : '') + minute);
            o['timeZhiIndex'] = timeZhiIndex;
            o['timeGanIndex'] = ((o['dayGanIndexExact'] % 5) * 2 + timeZhiIndex) % 10;
        };
        var _compute = function (year, hour, minute, second, solar, ly) {
            var o = {};
            _computeJieQi(o, ly);
            _computeYear(o, solar, year);
            _computeMonth(o, solar);
            _computeDay(o, solar, hour, minute);
            _computeTime(o, hour, minute);
            return o;
        };
        var _fromSolar = function (solar) {
            var lunarYear = 0;
            var lunarMonth = 0;
            var lunarDay = 0;
            var ly = LunarYear.fromYear(solar.getYear());
            var lms = ly.getMonths();
            for (var i = 0, j = lms.length; i < j; i++) {
                var m = lms[i];
                var days = solar.subtract(Solar.fromJulianDay(m.getFirstJulianDay()));
                if (days < m.getDayCount()) {
                    lunarYear = m.getYear();
                    lunarMonth = m.getMonth();
                    lunarDay = days + 1;
                    break;
                }
            }
            return _new(lunarYear, lunarMonth, lunarDay, solar.getHour(), solar.getMinute(), solar.getSecond(), solar, ly);
        };
        var _fromDate = function (date) {
            return _fromSolar(Solar.fromDate(date));
        };
        var _fromYmdHms = function (lunarYear, lunarMonth, lunarDay, hour, minute, second) {
            var oy = lunarYear;
            var om = lunarMonth;
            var od = lunarDay;
            var oh = hour;
            var oi = minute;
            var os = second;
            lunarYear *= 1;
            if (isNaN(lunarYear)) {
                throw new Error('wrong lunar year ' + oy);
            }
            lunarMonth *= 1;
            if (isNaN(lunarMonth)) {
                throw new Error('wrong lunar month ' + om);
            }
            lunarDay *= 1;
            if (isNaN(lunarDay)) {
                throw new Error('wrong lunar day ' + od);
            }
            hour *= 1;
            if (isNaN(hour)) {
                throw new Error('wrong hour ' + oh);
            }
            minute *= 1;
            if (isNaN(minute)) {
                throw new Error('wrong minute ' + oi);
            }
            second *= 1;
            if (isNaN(second)) {
                throw new Error('wrong second ' + os);
            }
            if (hour < 0 || hour > 23) {
                throw new Error('wrong hour ' + hour);
            }
            if (minute < 0 || minute > 59) {
                throw new Error('wrong minute ' + minute);
            }
            if (second < 0 || second > 59) {
                throw new Error('wrong second ' + second);
            }
            var y = LunarYear.fromYear(lunarYear);
            var m = y.getMonth(lunarMonth);
            if (null == m) {
                throw new Error('wrong lunar year ' + lunarYear + ' month ' + lunarMonth);
            }
            if (lunarDay < 1) {
                throw new Error('lunar day must bigger than 0');
            }
            var days = m.getDayCount();
            if (lunarDay > days) {
                throw new Error('only ' + days + ' days in lunar year ' + lunarYear + ' month ' + lunarMonth);
            }
            var noon = Solar.fromJulianDay(m.getFirstJulianDay() + lunarDay - 1);
            var solar = Solar.fromYmdHms(noon.getYear(), noon.getMonth(), noon.getDay(), hour, minute, second);
            if (noon.getYear() !== lunarYear) {
                y = LunarYear.fromYear(noon.getYear());
            }
            return _new(lunarYear, lunarMonth, lunarDay, hour, minute, second, solar, y);
        };
        var _new = function (year, month, day, hour, minute, second, solar, ly) {
            var gz = _compute(year, hour, minute, second, solar, ly);
            return {
                _p: {
                    lang: I18n.getLanguage(),
                    year: year,
                    month: month,
                    day: day,
                    hour: hour,
                    minute: minute,
                    second: second,
                    timeGanIndex: gz.timeGanIndex,
                    timeZhiIndex: gz.timeZhiIndex,
                    dayGanIndex: gz.dayGanIndex,
                    dayZhiIndex: gz.dayZhiIndex,
                    dayGanIndexExact: gz.dayGanIndexExact,
                    dayZhiIndexExact: gz.dayZhiIndexExact,
                    dayGanIndexExact2: gz.dayGanIndexExact2,
                    dayZhiIndexExact2: gz.dayZhiIndexExact2,
                    monthGanIndex: gz.monthGanIndex,
                    monthZhiIndex: gz.monthZhiIndex,
                    monthGanIndexExact: gz.monthGanIndexExact,
                    monthZhiIndexExact: gz.monthZhiIndexExact,
                    yearGanIndex: gz.yearGanIndex,
                    yearZhiIndex: gz.yearZhiIndex,
                    yearGanIndexByLiChun: gz.yearGanIndexByLiChun,
                    yearZhiIndexByLiChun: gz.yearZhiIndexByLiChun,
                    yearGanIndexExact: gz.yearGanIndexExact,
                    yearZhiIndexExact: gz.yearZhiIndexExact,
                    weekIndex: gz.weekIndex,
                    jieQi: gz.jieQi,
                    jieQiList: gz.jieQiList,
                    solar: solar,
                    eightChar: null
                },
                getYear: function () {
                    return this._p.year;
                },
                getMonth: function () {
                    return this._p.month;
                },
                getDay: function () {
                    return this._p.day;
                },
                getHour: function () {
                    return this._p.hour;
                },
                getMinute: function () {
                    return this._p.minute;
                },
                getSecond: function () {
                    return this._p.second;
                },
                getTimeGanIndex: function () {
                    return this._p.timeGanIndex;
                },
                getTimeZhiIndex: function () {
                    return this._p.timeZhiIndex;
                },
                getDayGanIndex: function () {
                    return this._p.dayGanIndex;
                },
                getDayGanIndexExact: function () {
                    return this._p.dayGanIndexExact;
                },
                getDayGanIndexExact2: function () {
                    return this._p.dayGanIndexExact2;
                },
                getDayZhiIndex: function () {
                    return this._p.dayZhiIndex;
                },
                getDayZhiIndexExact: function () {
                    return this._p.dayZhiIndexExact;
                },
                getDayZhiIndexExact2: function () {
                    return this._p.dayZhiIndexExact2;
                },
                getMonthGanIndex: function () {
                    return this._p.monthGanIndex;
                },
                getMonthGanIndexExact: function () {
                    return this._p.monthGanIndexExact;
                },
                getMonthZhiIndex: function () {
                    return this._p.monthZhiIndex;
                },
                getMonthZhiIndexExact: function () {
                    return this._p.monthZhiIndexExact;
                },
                getYearGanIndex: function () {
                    return this._p.yearGanIndex;
                },
                getYearGanIndexByLiChun: function () {
                    return this._p.yearGanIndexByLiChun;
                },
                getYearGanIndexExact: function () {
                    return this._p.yearGanIndexExact;
                },
                getYearZhiIndex: function () {
                    return this._p.yearZhiIndex;
                },
                getYearZhiIndexByLiChun: function () {
                    return this._p.yearZhiIndexByLiChun;
                },
                getYearZhiIndexExact: function () {
                    return this._p.yearZhiIndexExact;
                },
                getGan: function () {
                    return this.getYearGan();
                },
                getZhi: function () {
                    return this.getYearZhi();
                },
                getYearGan: function () {
                    return LunarUtil.GAN[this._p.yearGanIndex + 1];
                },
                getYearGanByLiChun: function () {
                    return LunarUtil.GAN[this._p.yearGanIndexByLiChun + 1];
                },
                getYearGanExact: function () {
                    return LunarUtil.GAN[this._p.yearGanIndexExact + 1];
                },
                getYearZhi: function () {
                    return LunarUtil.ZHI[this._p.yearZhiIndex + 1];
                },
                getYearZhiByLiChun: function () {
                    return LunarUtil.ZHI[this._p.yearZhiIndexByLiChun + 1];
                },
                getYearZhiExact: function () {
                    return LunarUtil.ZHI[this._p.yearZhiIndexExact + 1];
                },
                getYearInGanZhi: function () {
                    return this.getYearGan() + this.getYearZhi();
                },
                getYearInGanZhiByLiChun: function () {
                    return this.getYearGanByLiChun() + this.getYearZhiByLiChun();
                },
                getYearInGanZhiExact: function () {
                    return this.getYearGanExact() + this.getYearZhiExact();
                },
                getMonthGan: function () {
                    return LunarUtil.GAN[this._p.monthGanIndex + 1];
                },
                getMonthGanExact: function () {
                    return LunarUtil.GAN[this._p.monthGanIndexExact + 1];
                },
                getMonthZhi: function () {
                    return LunarUtil.ZHI[this._p.monthZhiIndex + 1];
                },
                getMonthZhiExact: function () {
                    return LunarUtil.ZHI[this._p.monthZhiIndexExact + 1];
                },
                getMonthInGanZhi: function () {
                    return this.getMonthGan() + this.getMonthZhi();
                },
                getMonthInGanZhiExact: function () {
                    return this.getMonthGanExact() + this.getMonthZhiExact();
                },
                getDayGan: function () {
                    return LunarUtil.GAN[this._p.dayGanIndex + 1];
                },
                getDayGanExact: function () {
                    return LunarUtil.GAN[this._p.dayGanIndexExact + 1];
                },
                getDayGanExact2: function () {
                    return LunarUtil.GAN[this._p.dayGanIndexExact2 + 1];
                },
                getDayZhi: function () {
                    return LunarUtil.ZHI[this._p.dayZhiIndex + 1];
                },
                getDayZhiExact: function () {
                    return LunarUtil.ZHI[this._p.dayZhiIndexExact + 1];
                },
                getDayZhiExact2: function () {
                    return LunarUtil.ZHI[this._p.dayZhiIndexExact2 + 1];
                },
                getDayInGanZhi: function () {
                    return this.getDayGan() + this.getDayZhi();
                },
                getDayInGanZhiExact: function () {
                    return this.getDayGanExact() + this.getDayZhiExact();
                },
                getDayInGanZhiExact2: function () {
                    return this.getDayGanExact2() + this.getDayZhiExact2();
                },
                getTimeGan: function () {
                    return LunarUtil.GAN[this._p.timeGanIndex + 1];
                },
                getTimeZhi: function () {
                    return LunarUtil.ZHI[this._p.timeZhiIndex + 1];
                },
                getTimeInGanZhi: function () {
                    return this.getTimeGan() + this.getTimeZhi();
                },
                getShengxiao: function () {
                    return this.getYearShengXiao();
                },
                getYearShengXiao: function () {
                    return LunarUtil.SHENGXIAO[this._p.yearZhiIndex + 1];
                },
                getYearShengXiaoByLiChun: function () {
                    return LunarUtil.SHENGXIAO[this._p.yearZhiIndexByLiChun + 1];
                },
                getYearShengXiaoExact: function () {
                    return LunarUtil.SHENGXIAO[this._p.yearZhiIndexExact + 1];
                },
                getMonthShengXiao: function () {
                    return LunarUtil.SHENGXIAO[this._p.monthZhiIndex + 1];
                },
                getMonthShengXiaoExact: function () {
                    return LunarUtil.SHENGXIAO[this._p.monthZhiIndexExact + 1];
                },
                getDayShengXiao: function () {
                    return LunarUtil.SHENGXIAO[this._p.dayZhiIndex + 1];
                },
                getTimeShengXiao: function () {
                    return LunarUtil.SHENGXIAO[this._p.timeZhiIndex + 1];
                },
                getYearInChinese: function () {
                    var y = this._p.year + '';
                    var s = '';
                    var zero = '0'.charCodeAt(0);
                    for (var i = 0, j = y.length; i < j; i++) {
                        s += LunarUtil.NUMBER[y.charCodeAt(i) - zero];
                    }
                    return s;
                },

                _checkLang: function () {
                    var lang = I18n.getLanguage();
                    if (this._p.lang !== lang) {
                        for (var i = 0, j = LunarUtil.JIE_QI_IN_USE.length; i < j; i++) {
                            var newKey = LunarUtil.JIE_QI_IN_USE[i];
                            var oldKey = this._p.jieQiList[i];
                            var value = this._p.jieQi[oldKey];
                            this._p.jieQiList[i] = newKey;
                            this._p.jieQi[newKey] = value;
                        }
                        this._p.lang = lang;
                    }
                },
                _getJieQiSolar: function (name) {
                    this._checkLang();
                    return this._p.jieQi[name];
                },
                getTimeSha: function () {
                    return LunarUtil.SHA[this.getTimeZhi()];
                },
                getYearNaYin: function () {
                    return LunarUtil.NAYIN[this.getYearInGanZhi()];
                },
                getMonthNaYin: function () {
                    return LunarUtil.NAYIN[this.getMonthInGanZhi()];
                },
                getDayNaYin: function () {
                    return LunarUtil.NAYIN[this.getDayInGanZhi()];
                },
                getTimeNaYin: function () {
                    return LunarUtil.NAYIN[this.getTimeInGanZhi()];
                },

                getFestivals: function () {
                    var l = [];
                    var f = LunarUtil.FESTIVAL[this._p.month + '-' + this._p.day];
                    if (f) {
                        l.push(f);
                    }
                    if (Math.abs(this._p.month) === 12 && this._p.day >= 29 && this._p.year !== this.next(1).getYear()) {
                        l.push(I18n.getMessage('jr.chuXi'));
                    }
                    return l;
                },

                _convertJieQi: function (name) {
                    var jq = name;
                    if ('DONG_ZHI' === jq) {
                        jq = I18n.getMessage('jq.dongZhi');
                    } else if ('DA_HAN' === jq) {
                        jq = I18n.getMessage('jq.daHan');
                    } else if ('XIAO_HAN' === jq) {
                        jq = I18n.getMessage('jq.xiaoHan');
                    } else if ('LI_CHUN' === jq) {
                        jq = I18n.getMessage('jq.liChun');
                    } else if ('DA_XUE' === jq) {
                        jq = I18n.getMessage('jq.daXue');
                    } else if ('YU_SHUI' === jq) {
                        jq = I18n.getMessage('jq.yuShui');
                    } else if ('JING_ZHE' === jq) {
                        jq = I18n.getMessage('jq.jingZhe');
                    }
                    return jq;
                },
                getJie: function () {
                    for (var i = 0, j = LunarUtil.JIE_QI_IN_USE.length; i < j; i += 2) {
                        var key = LunarUtil.JIE_QI_IN_USE[i];
                        var d = this._getJieQiSolar(key);
                        if (d.getYear() === this._p.solar.getYear() && d.getMonth() === this._p.solar.getMonth() && d.getDay() === this._p.solar.getDay()) {
                            return this._convertJieQi(key);
                        }
                    }
                    return '';
                },
                getQi: function () {
                    for (var i = 1, j = LunarUtil.JIE_QI_IN_USE.length; i < j; i += 2) {
                        var key = LunarUtil.JIE_QI_IN_USE[i];
                        var d = this._getJieQiSolar(key);
                        if (d.getYear() === this._p.solar.getYear() && d.getMonth() === this._p.solar.getMonth() && d.getDay() === this._p.solar.getDay()) {
                            return this._convertJieQi(key);
                        }
                    }
                    return '';
                },
                getJieQi: function () {
                    for (var key in this._p.jieQi) {
                        var d = this._getJieQiSolar(key);
                        if (d.getYear() === this._p.solar.getYear() && d.getMonth() === this._p.solar.getMonth() && d.getDay() === this._p.solar.getDay()) {
                            return this._convertJieQi(key);
                        }
                    }
                    return '';
                },

                getBaZi: function () {
                    var bz = this.getEightChar();
                    var l = [];
                    l.push(bz.getYear());
                    l.push(bz.getMonth());
                    l.push(bz.getDay());
                    l.push(bz.getTime());
                    return l;
                },
                getBaZiWuXing: function () {
                    var bz = this.getEightChar();
                    var l = [];
                    l.push(bz.getYearWuXing());
                    l.push(bz.getMonthWuXing());
                    l.push(bz.getDayWuXing());
                    l.push(bz.getTimeWuXing());
                    return l;
                },
                getBaZiNaYin: function () {
                    var bz = this.getEightChar();
                    var l = [];
                    l.push(bz.getYearNaYin());
                    l.push(bz.getMonthNaYin());
                    l.push(bz.getDayNaYin());
                    l.push(bz.getTimeNaYin());
                    return l;
                },
                getBaZiShiShenGan: function () {
                    var bz = this.getEightChar();
                    var l = [];
                    l.push(bz.getYearShiShenGan());
                    l.push(bz.getMonthShiShenGan());
                    l.push(bz.getDayShiShenGan());
                    l.push(bz.getTimeShiShenGan());
                    return l;
                },
                getBaZiShiShenZhi: function () {
                    var bz = this.getEightChar();
                    var l = [];
                    l.push(bz.getYearShiShenZhi()[0]);
                    l.push(bz.getMonthShiShenZhi()[0]);
                    l.push(bz.getDayShiShenZhi()[0]);
                    l.push(bz.getTimeShiShenZhi()[0]);
                    return l;
                },
                getBaZiShiShenYearZhi: function () {
                    return this.getEightChar().getYearShiShenZhi();
                },
                getBaZiShiShenMonthZhi: function () {
                    return this.getEightChar().getMonthShiShenZhi();
                },
                getBaZiShiShenDayZhi: function () {
                    return this.getEightChar().getDayShiShenZhi();
                },
                getBaZiShiShenTimeZhi: function () {
                    return this.getEightChar().getTimeShiShenZhi();
                },
                getZhiXing: function () {
                    var offset = this._p.dayZhiIndex - this._p.monthZhiIndex;
                    if (offset < 0) {
                        offset += 12;
                    }
                    return LunarUtil.ZHI_XING[offset + 1];
                },

                getMonthPositionTai: function () {
                    var m = this._p.month;
                    if (m < 0) {
                        return '';
                    }
                    return LunarUtil.POSITION_TAI_MONTH[m - 1];
                },

                getSolar: function () {
                    return this._p.solar;
                },
                getJieQiTable: function () {
                    this._checkLang();
                    return this._p.jieQi;
                },
                getJieQiList: function () {
                    return this._p.jieQiList;
                },
                getNextJie: function (wholeDay) {
                    var conditions = [];
                    for (var i = 0, j = LunarUtil.JIE_QI_IN_USE.length / 2; i < j; i++) {
                        conditions.push(LunarUtil.JIE_QI_IN_USE[i * 2]);
                    }
                    return this._getNearJieQi(true, conditions, wholeDay);
                },
                getPrevJie: function (wholeDay) {
                    var conditions = [];
                    for (var i = 0, j = LunarUtil.JIE_QI_IN_USE.length / 2; i < j; i++) {
                        conditions.push(LunarUtil.JIE_QI_IN_USE[i * 2]);
                    }
                    return this._getNearJieQi(false, conditions, wholeDay);
                },
                getNextQi: function (wholeDay) {
                    var conditions = [];
                    for (var i = 0, j = LunarUtil.JIE_QI_IN_USE.length / 2; i < j; i++) {
                        conditions.push(LunarUtil.JIE_QI_IN_USE[i * 2 + 1]);
                    }
                    return this._getNearJieQi(true, conditions, wholeDay);
                },
                getPrevQi: function (wholeDay) {
                    var conditions = [];
                    for (var i = 0, j = LunarUtil.JIE_QI_IN_USE.length / 2; i < j; i++) {
                        conditions.push(LunarUtil.JIE_QI_IN_USE[i * 2 + 1]);
                    }
                    return this._getNearJieQi(false, conditions, wholeDay);
                },
                getNextJieQi: function (wholeDay) {
                    return this._getNearJieQi(true, null, wholeDay);
                },
                getPrevJieQi: function (wholeDay) {
                    return this._getNearJieQi(false, null, wholeDay);
                },
                _buildJieQi: function (name, solar) {
                    var jie = false;
                    var qi = false;
                    for (var i = 0, j = LunarUtil.JIE_QI.length; i < j; i++) {
                        if (LunarUtil.JIE_QI[i] === name) {
                            if (i % 2 === 0) {
                                qi = true;
                            } else {
                                jie = true;
                            }
                            break;
                        }
                    }
                    return {
                        _p: {
                            name: name,
                            solar: solar,
                            jie: jie,
                            qi: qi
                        },
                        getName: function () {
                            return this._p.name;
                        },
                        getSolar: function () {
                            return this._p.solar;
                        },
                        setName: function (name) {
                            this._p.name = name;
                        },
                        setSolar: function (solar) {
                            this._p.solar = solar;
                        },
                        isJie: function () {
                            return this._p.jie;
                        },
                        isQi: function () {
                            return this._p.qi;
                        },
                        toString: function () {
                            return this.getName();
                        }
                    };
                },
                _getNearJieQi: function (forward, conditions, wholeDay) {
                    var name = null;
                    var near = null;
                    var filters = {};
                    var filter = false;
                    if (null != conditions) {
                        for (var i = 0, j = conditions.length; i < j; i++) {
                            filters[conditions[i]] = true;
                            filter = true;
                        }
                    }
                    var today = this._p.solar[wholeDay ? 'toYmd' : 'toYmdHms']();
                    for (var key in this._p.jieQi) {
                        var jq = this._convertJieQi(key);
                        if (filter) {
                            if (!filters[jq]) {
                                continue;
                            }
                        }
                        var solar = this._getJieQiSolar(key);
                        var day = solar[wholeDay ? 'toYmd' : 'toYmdHms']();
                        if (forward) {
                            if (day < today) {
                                continue;
                            }
                            if (null == near || day < near[wholeDay ? 'toYmd' : 'toYmdHms']()) {
                                name = jq;
                                near = solar;
                            }
                        } else {
                            if (day > today) {
                                continue;
                            }
                            if (null == near || day > near[wholeDay ? 'toYmd' : 'toYmdHms']()) {
                                name = jq;
                                near = solar;
                            }
                        }
                    }
                    if (null == near) {
                        return null;
                    }
                    return this._buildJieQi(name, near);
                },
                getCurrentJieQi: function () {
                    for (var key in this._p.jieQi) {
                        var d = this._getJieQiSolar(key);
                        if (d.getYear() === this._p.solar.getYear() && d.getMonth() === this._p.solar.getMonth() && d.getDay() === this._p.solar.getDay()) {
                            return this._buildJieQi(this._convertJieQi(key), d);
                        }
                    }
                    return null;
                },
                getCurrentJie: function () {
                    for (var i = 0, j = LunarUtil.JIE_QI_IN_USE.length; i < j; i += 2) {
                        var key = LunarUtil.JIE_QI_IN_USE[i];
                        var d = this._getJieQiSolar(key);
                        if (d.getYear() === this._p.solar.getYear() && d.getMonth() === this._p.solar.getMonth() && d.getDay() === this._p.solar.getDay()) {
                            return this._buildJieQi(this._convertJieQi(key), d);
                        }
                    }
                    return null;
                },
                getCurrentQi: function () {
                    for (var i = 1, j = LunarUtil.JIE_QI_IN_USE.length; i < j; i += 2) {
                        var key = LunarUtil.JIE_QI_IN_USE[i];
                        var d = this._getJieQiSolar(key);
                        if (d.getYear() === this._p.solar.getYear() && d.getMonth() === this._p.solar.getMonth() && d.getDay() === this._p.solar.getDay()) {
                            return this._buildJieQi(this._convertJieQi(key), d);
                        }
                    }
                    return null;
                },
                getEightChar: function () {
                    if (!this._p.eightChar) {
                        this._p.eightChar = EightChar.fromLunar(this);
                    }
                    return this._p.eightChar;
                },
                next: function (days) {
                    return this._p.solar.next(days).getLunar();
                },
                getYearXun: function () {
                    return LunarUtil.getXun(this.getYearInGanZhi());
                },
                getMonthXun: function () {
                    return LunarUtil.getXun(this.getMonthInGanZhi());
                },
                getDayXun: function () {
                    return LunarUtil.getXun(this.getDayInGanZhi());
                },
                getTimeXun: function () {
                    return LunarUtil.getXun(this.getTimeInGanZhi());
                },
                getYearXunByLiChun: function () {
                    return LunarUtil.getXun(this.getYearInGanZhiByLiChun());
                },
                getYearXunExact: function () {
                    return LunarUtil.getXun(this.getYearInGanZhiExact());
                },
                getMonthXunExact: function () {
                    return LunarUtil.getXun(this.getMonthInGanZhiExact());
                },
                getDayXunExact: function () {
                    return LunarUtil.getXun(this.getDayInGanZhiExact());
                },
                getDayXunExact2: function () {
                    return LunarUtil.getXun(this.getDayInGanZhiExact2());
                },
                getYearXunKong: function () {
                    return LunarUtil.getXunKong(this.getYearInGanZhi());
                },
                getMonthXunKong: function () {
                    return LunarUtil.getXunKong(this.getMonthInGanZhi());
                },
                getDayXunKong: function () {
                    return LunarUtil.getXunKong(this.getDayInGanZhi());
                },
                getTimeXunKong: function () {
                    return LunarUtil.getXunKong(this.getTimeInGanZhi());
                },
                getYearXunKongByLiChun: function () {
                    return LunarUtil.getXunKong(this.getYearInGanZhiByLiChun());
                },
                getYearXunKongExact: function () {
                    return LunarUtil.getXunKong(this.getYearInGanZhiExact());
                },
                getMonthXunKongExact: function () {
                    return LunarUtil.getXunKong(this.getMonthInGanZhiExact());
                },
                getDayXunKongExact: function () {
                    return LunarUtil.getXunKong(this.getDayInGanZhiExact());
                },
                getDayXunKongExact2: function () {
                    return LunarUtil.getXunKong(this.getDayInGanZhiExact2());
                },

                _buildNameAndIndex: function (name, index) {
                    return {
                        _p: {
                            name: name,
                            index: index
                        },
                        getName: function () {
                            return this._p.name;
                        },
                        setName: function (name) {
                            this._p.name = name;
                        },
                        getIndex: function () {
                            return this._p.index;
                        },
                        setIndex: function (index) {
                            this._p.index = index;
                        },
                        toString: function () {
                            return this.getName();
                        },
                        toFullString: function () {
                            return this.getName() + '第' + this.getIndex() + '天';
                        }
                    };
                },

                getTime: function () {
                    return LunarTime.fromYmdHms(this._p.year, this._p.month, this._p.day, this._p.hour, this._p.minute, this._p.second);
                },
                getTimes: function () {
                    var l = [];
                    l.push(LunarTime.fromYmdHms(this._p.year, this._p.month, this._p.day, 0, 0, 0));
                    for (var i = 0; i < 12; i++) {
                        l.push(LunarTime.fromYmdHms(this._p.year, this._p.month, this._p.day, (i + 1) * 2 - 1, 0, 0));
                    }
                    return l;
                },
                getFoto: function () {
                    return Foto.fromLunar(this);
                },
                getTao: function () {
                    return Tao.fromLunar(this);
                },
                toFullString: function () {
                    var s = this.toString();
                    s += ' ' + this.getYearInGanZhi() + '(' + this.getYearShengXiao() + ')年';
                    s += ' ' + this.getMonthInGanZhi() + '(' + this.getMonthShengXiao() + ')月';
                    s += ' ' + this.getDayInGanZhi() + '(' + this.getDayShengXiao() + ')日';
                    s += ' ' + this.getTimeZhi() + '(' + this.getTimeShengXiao() + ')时';
                    s += ' 纳音[' + this.getYearNaYin() + ' ' + this.getMonthNaYin() + ' ' + this.getDayNaYin() + ' ' + this.getTimeNaYin() + ']';
                    s += ' 星期' + this.getWeekInChinese();
                    var festivals = this.getFestivals();
                    var i;
                    var j;
                    for (i = 0, j = festivals.length; i < j; i++) {
                        s += ' (' + festivals[i] + ')';
                    }
                    festivals = this.getOtherFestivals();
                    for (i = 0, j = festivals.length; i < j; i++) {
                        s += ' (' + festivals[i] + ')';
                    }
                    var jq = this.getJieQi();
                    if (jq.length > 0) {
                        s += ' [' + jq + ']';
                    }
                    s += ' ' + this.getGong() + '方' + this.getShou();
                    s += ' 星宿[' + this.getXiu() + this.getZheng() + this.getAnimal() + '](' + this.getXiuLuck() + ')';
                    s += ' 彭祖百忌[' + this.getPengZuGan() + ' ' + this.getPengZuZhi() + ']';
                    s += ' 喜神方位[' + this.getDayPositionXi() + '](' + this.getDayPositionXiDesc() + ')';
                    s += ' 阳贵神方位[' + this.getDayPositionYangGui() + '](' + this.getDayPositionYangGuiDesc() + ')';
                    s += ' 阴贵神方位[' + this.getDayPositionYinGui() + '](' + this.getDayPositionYinGuiDesc() + ')';
                    s += ' 福神方位[' + this.getDayPositionFu() + '](' + this.getDayPositionFuDesc() + ')';
                    s += ' 财神方位[' + this.getDayPositionCai() + '](' + this.getDayPositionCaiDesc() + ')';
                    s += ' 冲[' + this.getDayChongDesc() + ']';
                    s += ' 煞[' + this.getDaySha() + ']';
                    return s;
                }
            };
        };
        return {
            fromYmdHms: function (y, m, d, hour, minute, second) {
                return _fromYmdHms(y, m, d, hour, minute, second);
            },
            fromYmd: function (y, m, d) {
                return _fromYmdHms(y, m, d, 0, 0, 0);
            },
            fromSolar: function (solar) {
                return _fromSolar(solar);
            },
            fromDate: function (date) {
                return _fromDate(date);
            }
        };
    })();

    var SolarMonth = (function () {
        var _fromDate = function (date) {
            var solar = Solar.fromDate(date);
            return _fromYm(solar.getYear(), solar.getMonth());
        };
        var _fromYm = function (y, m) {
            var oy = y;
            var om = m;
            y *= 1;
            if (isNaN(y)) {
                throw new Error('wrong solar year ' + oy);
            }
            m *= 1;
            if (isNaN(m)) {
                throw new Error('wrong solar month ' + om);
            }
            return {
                _p: {
                    year: y,
                    month: m
                },
                getYear: function () {
                    return this._p.year;
                },
                getMonth: function () {
                    return this._p.month;
                },
                next: function (months) {
                    var om = months;
                    months *= 1;
                    if (isNaN(months)) {
                        throw new Error('wrong months ' + om);
                    }
                    var n = months < 0 ? -1 : 1;
                    var m = Math.abs(months);
                    var y = this._p.year + Math.floor(m / 12) * n;
                    m = this._p.month + (m % 12) * n;
                    if (m > 12) {
                        m -= 12;
                        y++;
                    } else if (m < 1) {
                        m += 12;
                        y--;
                    }
                    return _fromYm(y, m);
                },
                getDays: function () {
                    var l = [];
                    var d = Solar.fromYmd(this._p.year, this._p.month, 1);
                    l.push(d);
                    var days = SolarUtil.getDaysOfMonth(this._p.year, this._p.month);
                    for (var i = 1; i < days; i++) {
                        l.push(d.next(i));
                    }
                    return l;
                },

                toString: function () {
                    return this.getYear() + '-' + this.getMonth();
                },
                toFullString: function () {
                    return this.getYear() + '年' + this.getMonth() + '月';
                }
            };
        };
        return {
            fromYm: function (y, m) {
                return _fromYm(y, m);
            },
            fromDate: function (date) {
                return _fromDate(date);
            }
        };
    })();

    var LunarYear = (function () {
        var _LEAP_11 = [75, 94, 170, 265, 322, 398, 469, 553, 583, 610, 678, 735, 754, 773, 849, 887, 936, 1050, 1069, 1126, 1145, 1164, 1183, 1259, 1278, 1308, 1373, 1403, 1441, 1460, 1498, 1555, 1593, 1612, 1631, 1642, 2033, 2128, 2147, 2242, 2614, 2728, 2910, 3062, 3244, 3339, 3616, 3711, 3730, 3825, 4007, 4159, 4197, 4322, 4341, 4379, 4417, 4531, 4599, 4694, 4713, 4789, 4808, 4971, 5085, 5104, 5161, 5180, 5199, 5294, 5305, 5476, 5677, 5696, 5772, 5791, 5848, 5886, 6049, 6068, 6144, 6163, 6258, 6402, 6440, 6497, 6516, 6630, 6641, 6660, 6679, 6736, 6774, 6850, 6869, 6899, 6918, 6994, 7013, 7032, 7051, 7070, 7089, 7108, 7127, 7146, 7222, 7271, 7290, 7309, 7366, 7385, 7404, 7442, 7461, 7480, 7491, 7499, 7594, 7624, 7643, 7662, 7681, 7719, 7738, 7814, 7863, 7882, 7901, 7939, 7958, 7977, 7996, 8034, 8053, 8072, 8091, 8121, 8159, 8186, 8216, 8235, 8254, 8273, 8311, 8330, 8341, 8349, 8368, 8444, 8463, 8474, 8493, 8531, 8569, 8588, 8626, 8664, 8683, 8694, 8702, 8713, 8721, 8751, 8789, 8808, 8816, 8827, 8846, 8884, 8903, 8922, 8941, 8971, 9036, 9066, 9085, 9104, 9123, 9142, 9161, 9180, 9199, 9218, 9256, 9294, 9313, 9324, 9343, 9362, 9381, 9419, 9438, 9476, 9514, 9533, 9544, 9552, 9563, 9571, 9582, 9601, 9639, 9658, 9666, 9677, 9696, 9734, 9753, 9772, 9791, 9802, 9821, 9886, 9897, 9916, 9935, 9954, 9973, 9992];
        var _LEAP_12 = [37, 56, 113, 132, 151, 189, 208, 227, 246, 284, 303, 341, 360, 379, 417, 436, 458, 477, 496, 515, 534, 572, 591, 629, 648, 667, 697, 716, 792, 811, 830, 868, 906, 925, 944, 963, 982, 1001, 1020, 1039, 1058, 1088, 1153, 1202, 1221, 1240, 1297, 1335, 1392, 1411, 1422, 1430, 1517, 1525, 1536, 1574, 3358, 3472, 3806, 3988, 4751, 4941, 5066, 5123, 5275, 5343, 5438, 5457, 5495, 5533, 5552, 5715, 5810, 5829, 5905, 5924, 6421, 6535, 6793, 6812, 6888, 6907, 7002, 7184, 7260, 7279, 7374, 7556, 7746, 7757, 7776, 7833, 7852, 7871, 7966, 8015, 8110, 8129, 8148, 8224, 8243, 8338, 8406, 8425, 8482, 8501, 8520, 8558, 8596, 8607, 8615, 8645, 8740, 8778, 8835, 8865, 8930, 8960, 8979, 8998, 9017, 9055, 9074, 9093, 9112, 9150, 9188, 9237, 9275, 9332, 9351, 9370, 9408, 9427, 9446, 9457, 9465, 9495, 9560, 9590, 9628, 9647, 9685, 9715, 9742, 9780, 9810, 9818, 9829, 9848, 9867, 9905, 9924, 9943, 9962, 10000];
        var _CACHE_YEAR = null;
        var _YMC = [11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var _inLeap = function (arr, n) {
            for (var i = 0, j = arr.length; i < j; i++) {
                if (arr[i] === n) {
                    return true;
                }
            }
            return false;
        };
        var _fromYear = function (lunarYear) {
            var oy = lunarYear;
            lunarYear *= 1;
            if (isNaN(lunarYear)) {
                throw new Error('wrong lunar year ' + oy);
            }
            var _y = (function () {
                var offset = lunarYear - 4;
                var yearGanIndex = offset % 10;
                var yearZhiIndex = offset % 12;
                if (yearGanIndex < 0) {
                    yearGanIndex += 10;
                }
                if (yearZhiIndex < 0) {
                    yearZhiIndex += 12;
                }
                return {
                    ganIndex: yearGanIndex,
                    zhiIndex: yearZhiIndex
                };
            })();
            return {
                _p: {
                    year: lunarYear,
                    ganIndex: _y.ganIndex,
                    zhiIndex: _y.zhiIndex,
                    months: [],
                    jieQiJulianDays: []
                },
                getYear: function () {
                    return this._p.year;
                },
                getGanIndex: function () {
                    return this._p.ganIndex;
                },
                getZhiIndex: function () {
                    return this._p.zhiIndex;
                },
                getGan: function () {
                    return LunarUtil.GAN[this._p.ganIndex + 1];
                },
                getZhi: function () {
                    return LunarUtil.ZHI[this._p.zhiIndex + 1];
                },
                getGanZhi: function () {
                    return this.getGan() + this.getZhi();
                },
                getJieQiJulianDays: function () {
                    return this._p.jieQiJulianDays;
                },
                getDayCount: function () {
                    var n = 0;
                    for (var i = 0, j = this._p.months.length; i < j; i++) {
                        var m = this._p.months[i];
                        if (m.getYear() === this._p.year) {
                            n += m.getDayCount();
                        }
                    }
                    return n;
                },
                getMonthsInYear: function () {
                    var l = [];
                    for (var i = 0, j = this._p.months.length; i < j; i++) {
                        var m = this._p.months[i];
                        if (m.getYear() === this._p.year) {
                            l.push(m);
                        }
                    }
                    return l;
                },
                getMonths: function () {
                    return this._p.months;
                },
                getMonth: function (lunarMonth) {
                    var om = lunarMonth;
                    lunarMonth *= 1;
                    if (isNaN(lunarMonth)) {
                        throw new Error('wrong lunarMonth ' + om);
                    }
                    for (var i = 0, j = this._p.months.length; i < j; i++) {
                        var m = this._p.months[i];
                        if (m.getYear() === this._p.year && m.getMonth() === lunarMonth) {
                            return m;
                        }
                    }
                    return null;
                },
                getLeapMonth: function () {
                    for (var i = 0, j = this._p.months.length; i < j; i++) {
                        var m = this._p.months[i];
                        if (m.getYear() === this._p.year && m.isLeap()) {
                            return Math.abs(m.getMonth());
                        }
                    }
                    return 0;
                },

                toString: function () {
                    return this.getYear() + '';
                },
                toFullString: function () {
                    return this.getYear() + '年';
                },
                next: function (years) {
                    var oy = years;
                    years *= 1;
                    if (isNaN(years)) {
                        throw new Error('wrong years ' + oy);
                    }
                    return LunarYear.fromYear(this._p.year + years);
                },
                _compute: function () {
                    this._p.months = [];
                    this._p.jieQiJulianDays = [];
                    // 节气
                    var jq = [];
                    // 合朔，即每月初一
                    var hs = [];
                    // 每月天数，长度15
                    var dayCounts = [];
                    var months = [];
                    var i;
                    var j;
                    var currentYear = this._p.year;
                    var jd = Math.floor((currentYear - 2000) * 365.2422 + 180);
                    // 355是2000.12冬至，得到较靠近jd的冬至估计值
                    var w = Math.floor((jd - 355 + 183) / 365.2422) * 365.2422 + 355;
                    if (ShouXingUtil.calcQi(w) > jd) {
                        w -= 365.2422;
                    }
                    // 25个节气时刻(北京时间)，从冬至开始到下一个冬至以后
                    for (i = 0; i < 26; i++) {
                        jq.push(ShouXingUtil.calcQi(w + 15.2184 * i));
                    }
                    for (i = 0, j = LunarUtil.JIE_QI_IN_USE.length; i < j; i++) {
                        if (i === 0) {
                            jd = ShouXingUtil.qiAccurate2(jq[0] - 15.2184);
                        } else if (i <= 26) {
                            jd = ShouXingUtil.qiAccurate2(jq[i - 1]);
                        } else {
                            jd = ShouXingUtil.qiAccurate2(jq[25] + 15.2184 * (i - 26));
                        }
                        this._p.jieQiJulianDays.push(jd + Solar.J2000);
                    }

                    // 冬至前的初一，今年"首朔"的日月黄经差w
                    w = ShouXingUtil.calcShuo(jq[0]);
                    if (w > jq[0]) {
                        w -= 29.53;
                    }
                    // 递推每月初一
                    for (i = 0; i < 16; i++) {
                        hs.push(ShouXingUtil.calcShuo(w + 29.5306 * i));
                    }
                    // 每月
                    for (i = 0; i < 15; i++) {
                        dayCounts.push(Math.floor(hs[i + 1] - hs[i]));
                        months.push(i);
                    }

                    var prevYear = currentYear - 1;
                    var leapIndex = 16;
                    if (_inLeap(_LEAP_11, currentYear)) {
                        leapIndex = 13;
                    } else if (_inLeap(_LEAP_12, currentYear)) {
                        leapIndex = 14;
                    } else if (hs[13] <= jq[24]) {
                        i = 1;
                        while (hs[i + 1] > jq[2 * i] && i < 13) {
                            i++;
                        }
                        leapIndex = i;
                    }
                    for (j = leapIndex; j < 15; j++) {
                        months[j] -= 1;
                    }
                    var fm = -1;
                    var index = -1;
                    var y = prevYear;
                    for (i = 0; i < 15; i++) {
                        var dm = hs[i] + Solar.J2000;
                        var v2 = months[i];
                        var mc = _YMC[v2 % 12];
                        if (1724360 <= dm && dm < 1729794) {
                            mc = _YMC[(v2 + 1) % 12];
                        } else if (1807724 <= dm && dm < 1808699) {
                            mc = _YMC[(v2 + 1) % 12];
                        } else if (dm === 1729794 || dm === 1808699) {
                            mc = 12;
                        }
                        if (fm === -1) {
                            fm = mc;
                            index = mc;
                        }
                        if (mc < fm) {
                            y += 1;
                            index = 1;
                        }
                        fm = mc;
                        if (i === leapIndex) {
                            mc = -mc;
                        } else if (dm === 1729794 || dm === 1808699) {
                            mc = -11;
                        }
                        this._p.months.push(LunarMonth._(y, mc, dayCounts[i], hs[i] + Solar.J2000, index));
                        index++;
                    }
                    return this;
                }
            }._compute();
        };
        var _fromCachedYear = function (lunarYear) {
            var y;
            if (!_CACHE_YEAR || _CACHE_YEAR.getYear() !== lunarYear) {
                y = _fromYear(lunarYear);
                _CACHE_YEAR = y;
            } else {
                y = _CACHE_YEAR;
            }
            return y;
        };
        return {
            fromYear: function (lunarYear) {
                return _fromCachedYear(lunarYear);
            }
        };
    })();
    var LunarMonth = (function () {
        var _fromYm = function (lunarYear, lunarMonth) {
            var oy = lunarYear;
            var om = lunarMonth;
            lunarYear *= 1;
            if (isNaN(lunarYear)) {
                throw new Error('wrong lunar year ' + oy);
            }
            lunarMonth *= 1;
            if (isNaN(lunarMonth)) {
                throw new Error('wrong lunar month ' + om);
            }
            return LunarYear.fromYear(lunarYear).getMonth(lunarMonth);
        };
        var _new = function (lunarYear, lunarMonth, dayCount, firstJulianDay, index) {
            return {
                _p: {
                    year: lunarYear,
                    month: lunarMonth,
                    dayCount: dayCount,
                    firstJulianDay: firstJulianDay,
                    index: index,
                    zhiIndex: (index - 1 + LunarUtil.BASE_MONTH_ZHI_INDEX) % 12
                },
                getIndex: function () {
                    return this._p.index;
                },
                getGanIndex: function () {
                    var offset = ((LunarYear.fromYear(this._p.year).getGanIndex() + 1) % 5) * 2;
                    return (this._p.index - 1 + offset) % 10;
                },
                getZhiIndex: function () {
                    return this._p.zhiIndex;
                },
                getGan: function () {
                    return LunarUtil.GAN[this.getGanIndex() + 1];
                },
                getZhi: function () {
                    return LunarUtil.ZHI[this._p.zhiIndex + 1];
                },
                getGanZhi: function () {
                    return this.getGan() + this.getZhi();
                },
                getYear: function () {
                    return this._p.year;
                },
                getMonth: function () {
                    return this._p.month;
                },
                getDayCount: function () {
                    return this._p.dayCount;
                },
                getFirstJulianDay: function () {
                    return this._p.firstJulianDay;
                },
                isLeap: function () {
                    return this._p.month < 0;
                },

                toString: function () {
                    return this.getYear() + '年' + (this.isLeap() ? '闰' : '') + LunarUtil.MONTH[Math.abs(this.getMonth())] + '月(' + this.getDayCount() + ')天';
                }
            };
        };
        return {
            fromYm: function (lunarYear, lunarMonth) {
                return _fromYm(lunarYear, lunarMonth);
            },
            _: function (lunarYear, lunarMonth, dayCount, firstJulianDay, index) {
                return _new(lunarYear, lunarMonth, dayCount, firstJulianDay, index);
            }
        };
    })();
    var ShouXingUtil = (function () {
        var _decode = function (s) {
            var o = '0000000000';
            var o2 = o + o;
            s = s.replace(/J/g, '00');
            s = s.replace(/I/g, '000');
            s = s.replace(/H/g, '0000');
            s = s.replace(/G/g, '00000');
            s = s.replace(/t/g, '02');
            s = s.replace(/s/g, '002');
            s = s.replace(/r/g, '0002');
            s = s.replace(/q/g, '00002');
            s = s.replace(/p/g, '000002');
            s = s.replace(/o/g, '0000002');
            s = s.replace(/n/g, '00000002');
            s = s.replace(/m/g, '000000002');
            s = s.replace(/l/g, '0000000002');
            s = s.replace(/k/g, '01');
            s = s.replace(/j/g, '0101');
            s = s.replace(/i/g, '001');
            s = s.replace(/h/g, '001001');
            s = s.replace(/g/g, '0001');
            s = s.replace(/f/g, '00001');
            s = s.replace(/e/g, '000001');
            s = s.replace(/d/g, '0000001');
            s = s.replace(/c/g, '00000001');
            s = s.replace(/b/g, '000000001');
            s = s.replace(/a/g, '0000000001');
            s = s.replace(/A/g, o2 + o2 + o2);
            s = s.replace(/B/g, o2 + o2 + o);
            s = s.replace(/C/g, o2 + o2);
            s = s.replace(/D/g, o2 + o);
            s = s.replace(/E/g, o2);
            s = s.replace(/F/g, o);
            return s;
        };
        return {
            PI_2: 2 * Math.PI,
            ONE_THIRD: 1.0 / 3,
            SECOND_PER_DAY: 86400,
            SECOND_PER_RAD: 648000 / Math.PI,
            NUT_B: [2.1824, -33.75705, 36e-6, -1720, 920, 3.5069, 1256.66393, 11e-6, -132, 57, 1.3375, 16799.4182, -51e-6, -23, 10, 4.3649, -67.5141, 72e-6, 21, -9, 0.04, -628.302, 0, -14, 0, 2.36, 8328.691, 0, 7, 0, 3.46, 1884.966, 0, -5, 2, 5.44, 16833.175, 0, -4, 2, 3.69, 25128.11, 0, -3, 0, 3.55, 628.362, 0, 2, 0],
            DT_AT: [-4000, 108371.7, -13036.8, 392.0, 0.0, -500, 17201.0, -627.82, 16.17, -0.3413, -150, 12200.6, -346.41, 5.403, -0.1593, 150, 9113.8, -328.13, -1.647, 0.0377, 500, 5707.5, -391.41, 0.915, 0.3145, 900, 2203.4, -283.45, 13.034, -0.1778, 1300, 490.1, -57.35, 2.085, -0.0072, 1600, 120.0, -9.81, -1.532, 0.1403, 1700, 10.2, -0.91, 0.51, -0.037, 1800, 13.4, -0.72, 0.202, -0.0193, 1830, 7.8, -1.81, 0.416, -0.0247, 1860, 8.3, -0.13, -0.406, 0.0292, 1880, -5.4, 0.32, -0.183, 0.0173, 1900, -2.3, 2.06, 0.169, -0.0135, 1920, 21.2, 1.69, -0.304, 0.0167, 1940, 24.2, 1.22, -0.064, 0.0031, 1960, 33.2, 0.51, 0.231, -0.0109, 1980, 51.0, 1.29, -0.026, 0.0032, 2000, 63.87, 0.1, 0, 0, 2005, 64.7, 0.21, 0, 0, 2012, 66.8, 0.22, 0, 0, 2018, 69.0, 0.36, 0, 0, 2028, 72.6],
            XL0: [10000000000, 20, 578, 920, 1100, 1124, 1136, 1148, 1217, 1226, 1229, 1229, 1229, 1229, 1937, 2363, 2618, 2633, 2660, 2666, 17534704567, 0.0, 0.0, 334165646, 4.669256804, 6283.075849991, 3489428, 4.6261024, 12566.1517, 349706, 2.744118, 5753.384885, 341757, 2.828866, 3.523118, 313590, 3.62767, 77713.771468, 267622, 4.418084, 7860.419392, 234269, 6.135162, 3930.209696, 132429, 0.742464, 11506.76977, 127317, 2.037097, 529.690965, 119917, 1.109629, 1577.343542, 99025, 5.23268, 5884.92685, 90186, 2.04505, 26.29832, 85722, 3.50849, 398.149, 77979, 1.17883, 5223.69392, 75314, 2.53339, 5507.55324, 50526, 4.58293, 18849.22755, 49238, 4.20507, 775.52261, 35666, 2.91954, 0.06731, 31709, 5.84902, 11790.62909, 28413, 1.89869, 796.29801, 27104, 0.31489, 10977.0788, 24281, 0.34481, 5486.77784, 20616, 4.80647, 2544.31442, 20539, 1.86948, 5573.1428, 20226, 2.45768, 6069.77675, 15552, 0.83306, 213.2991, 13221, 3.41118, 2942.46342, 12618, 1.08303, 20.7754, 11513, 0.64545, 0.98032, 10285, 0.636, 4694.00295, 10190, 0.97569, 15720.83878, 10172, 4.2668, 7.11355, 9921, 6.2099, 2146.1654, 9761, 0.681, 155.4204, 8580, 5.9832, 161000.6857, 8513, 1.2987, 6275.9623, 8471, 3.6708, 71430.6956, 7964, 1.8079, 17260.1547, 7876, 3.037, 12036.4607, 7465, 1.7551, 5088.6288, 7387, 3.5032, 3154.6871, 7355, 4.6793, 801.8209, 6963, 0.833, 9437.7629, 6245, 3.9776, 8827.3903, 6115, 1.8184, 7084.8968, 5696, 2.7843, 6286.599, 5612, 4.3869, 14143.4952, 5558, 3.4701, 6279.5527, 5199, 0.1891, 12139.5535, 5161, 1.3328, 1748.0164, 5115, 0.2831, 5856.4777, 4900, 0.4874, 1194.447, 4104, 5.3682, 8429.2413, 4094, 2.3985, 19651.0485, 3920, 6.1683, 10447.3878, 3677, 6.0413, 10213.2855, 3660, 2.5696, 1059.3819, 3595, 1.7088, 2352.8662, 3557, 1.776, 6812.7668, 3329, 0.5931, 17789.8456, 3041, 0.4429, 83996.8473, 3005, 2.7398, 1349.8674, 2535, 3.1647, 4690.4798, 2474, 0.2148, 3.5904, 2366, 0.4847, 8031.0923, 2357, 2.0653, 3340.6124, 2282, 5.222, 4705.7323, 2189, 5.5559, 553.5694, 2142, 1.4256, 16730.4637, 2109, 4.1483, 951.7184, 2030, 0.3713, 283.8593, 1992, 5.2221, 12168.0027, 1986, 5.7747, 6309.3742, 1912, 3.8222, 23581.2582, 1889, 5.3863, 149854.4001, 1790, 2.2149, 13367.9726, 1748, 4.5605, 135.0651, 1622, 5.9884, 11769.8537, 1508, 4.1957, 6256.7775, 1442, 4.1932, 242.7286, 1435, 3.7236, 38.0277, 1397, 4.4014, 6681.2249, 1362, 1.8893, 7632.9433, 1250, 1.1305, 5.5229, 1205, 2.6223, 955.5997, 1200, 1.0035, 632.7837, 1129, 0.1774, 4164.312, 1083, 0.3273, 103.0928, 1052, 0.9387, 11926.2544, 1050, 5.3591, 1592.596, 1033, 6.1998, 6438.4962, 1001, 6.0291, 5746.2713, 980, 0.999, 11371.705, 980, 5.244, 27511.468, 938, 2.624, 5760.498, 923, 0.483, 522.577, 922, 4.571, 4292.331, 905, 5.337, 6386.169, 862, 4.165, 7058.598, 841, 3.299, 7234.794, 836, 4.539, 25132.303, 813, 6.112, 4732.031, 812, 6.271, 426.598, 801, 5.821, 28.449, 787, 0.996, 5643.179, 776, 2.957, 23013.54, 769, 3.121, 7238.676, 758, 3.974, 11499.656, 735, 4.386, 316.392, 731, 0.607, 11513.883, 719, 3.998, 74.782, 706, 0.323, 263.084, 676, 5.911, 90955.552, 663, 3.665, 17298.182, 653, 5.791, 18073.705, 630, 4.717, 6836.645, 615, 1.458, 233141.314, 612, 1.075, 19804.827, 596, 3.321, 6283.009, 596, 2.876, 6283.143, 555, 2.452, 12352.853, 541, 5.392, 419.485, 531, 0.382, 31441.678, 519, 4.065, 6208.294, 513, 2.361, 10973.556, 494, 5.737, 9917.697, 450, 3.272, 11015.106, 449, 3.653, 206.186, 447, 2.064, 7079.374, 435, 4.423, 5216.58, 421, 1.906, 245.832, 413, 0.921, 3738.761, 402, 0.84, 20.355, 387, 1.826, 11856.219, 379, 2.344, 3.881, 374, 2.954, 3128.389, 370, 5.031, 536.805, 365, 1.018, 16200.773, 365, 1.083, 88860.057, 352, 5.978, 3894.182, 352, 2.056, 244287.6, 351, 3.713, 6290.189, 340, 1.106, 14712.317, 339, 0.978, 8635.942, 339, 3.202, 5120.601, 333, 0.837, 6496.375, 325, 3.479, 6133.513, 316, 5.089, 21228.392, 316, 1.328, 10873.986, 309, 3.646, 10.637, 303, 1.802, 35371.887, 296, 3.397, 9225.539, 288, 6.026, 154717.61, 281, 2.585, 14314.168, 262, 3.856, 266.607, 262, 2.579, 22483.849, 257, 1.561, 23543.231, 255, 3.949, 1990.745, 251, 3.744, 10575.407, 240, 1.161, 10984.192, 238, 0.106, 7.046, 236, 4.272, 6040.347, 234, 3.577, 10969.965, 211, 3.714, 65147.62, 210, 0.754, 13521.751, 207, 4.228, 5650.292, 202, 0.814, 170.673, 201, 4.629, 6037.244, 200, 0.381, 6172.87, 199, 3.933, 6206.81, 199, 5.197, 6262.3, 197, 1.046, 18209.33, 195, 1.07, 5230.807, 195, 4.869, 36.028, 194, 4.313, 6244.943, 192, 1.229, 709.933, 192, 5.595, 6282.096, 192, 0.602, 6284.056, 189, 3.744, 23.878, 188, 1.904, 15.252, 188, 0.867, 22003.915, 182, 3.681, 15110.466, 181, 0.491, 1.484, 179, 3.222, 39302.097, 179, 1.259, 12559.038, 62833196674749, 0.0, 0.0, 20605886, 2.67823456, 6283.07584999, 430343, 2.635127, 12566.1517, 42526, 1.59047, 3.52312, 11926, 5.79557, 26.29832, 10898, 2.96618, 1577.34354, 9348, 2.5921, 18849.2275, 7212, 1.1385, 529.691, 6777, 1.8747, 398.149, 6733, 4.4092, 5507.5532, 5903, 2.888, 5223.6939, 5598, 2.1747, 155.4204, 4541, 0.398, 796.298, 3637, 0.4662, 775.5226, 2896, 2.6471, 7.1135, 2084, 5.3414, 0.9803, 1910, 1.8463, 5486.7778, 1851, 4.9686, 213.2991, 1729, 2.9912, 6275.9623, 1623, 0.0322, 2544.3144, 1583, 1.4305, 2146.1654, 1462, 1.2053, 10977.0788, 1246, 2.8343, 1748.0164, 1188, 3.258, 5088.6288, 1181, 5.2738, 1194.447, 1151, 2.075, 4694.003, 1064, 0.7661, 553.5694, 997, 1.303, 6286.599, 972, 4.239, 1349.867, 945, 2.7, 242.729, 858, 5.645, 951.718, 758, 5.301, 2352.866, 639, 2.65, 9437.763, 610, 4.666, 4690.48, 583, 1.766, 1059.382, 531, 0.909, 3154.687, 522, 5.661, 71430.696, 520, 1.854, 801.821, 504, 1.425, 6438.496, 433, 0.241, 6812.767, 426, 0.774, 10447.388, 413, 5.24, 7084.897, 374, 2.001, 8031.092, 356, 2.429, 14143.495, 350, 4.8, 6279.553, 337, 0.888, 12036.461, 337, 3.862, 1592.596, 325, 3.4, 7632.943, 322, 0.616, 8429.241, 318, 3.188, 4705.732, 297, 6.07, 4292.331, 295, 1.431, 5746.271, 290, 2.325, 20.355, 275, 0.935, 5760.498, 270, 4.804, 7234.794, 253, 6.223, 6836.645, 228, 5.003, 17789.846, 225, 5.672, 11499.656, 215, 5.202, 11513.883, 208, 3.955, 10213.286, 208, 2.268, 522.577, 206, 2.224, 5856.478, 206, 2.55, 25132.303, 203, 0.91, 6256.778, 189, 0.532, 3340.612, 188, 4.735, 83996.847, 179, 1.474, 4164.312, 178, 3.025, 5.523, 177, 3.026, 5753.385, 159, 4.637, 3.286, 157, 6.124, 5216.58, 155, 3.077, 6681.225, 154, 4.2, 13367.973, 143, 1.191, 3894.182, 138, 3.093, 135.065, 136, 4.245, 426.598, 134, 5.765, 6040.347, 128, 3.085, 5643.179, 127, 2.092, 6290.189, 125, 3.077, 11926.254, 125, 3.445, 536.805, 114, 3.244, 12168.003, 112, 2.318, 16730.464, 111, 3.901, 11506.77, 111, 5.32, 23.878, 105, 3.75, 7860.419, 103, 2.447, 1990.745, 96, 0.82, 3.88, 96, 4.08, 6127.66, 91, 5.42, 206.19, 91, 0.42, 7079.37, 88, 5.17, 11790.63, 81, 0.34, 9917.7, 80, 3.89, 10973.56, 78, 2.4, 1589.07, 78, 2.58, 11371.7, 77, 3.98, 955.6, 77, 3.36, 36.03, 76, 1.3, 103.09, 75, 5.18, 10969.97, 75, 4.96, 6496.37, 73, 5.21, 38.03, 72, 2.65, 6309.37, 70, 5.61, 3738.76, 69, 2.6, 3496.03, 69, 0.39, 15.25, 69, 2.78, 20.78, 65, 1.13, 7058.6, 64, 4.28, 28.45, 61, 5.63, 10984.19, 60, 0.73, 419.48, 60, 5.28, 10575.41, 58, 5.55, 17298.18, 58, 3.19, 4732.03, 5291887, 0.0, 0.0, 871984, 1.072097, 6283.07585, 30913, 0.86729, 12566.1517, 2734, 0.053, 3.5231, 1633, 5.1883, 26.2983, 1575, 3.6846, 155.4204, 954, 0.757, 18849.228, 894, 2.057, 77713.771, 695, 0.827, 775.523, 506, 4.663, 1577.344, 406, 1.031, 7.114, 381, 3.441, 5573.143, 346, 5.141, 796.298, 317, 6.053, 5507.553, 302, 1.192, 242.729, 289, 6.117, 529.691, 271, 0.306, 398.149, 254, 2.28, 553.569, 237, 4.381, 5223.694, 208, 3.754, 0.98, 168, 0.902, 951.718, 153, 5.759, 1349.867, 145, 4.364, 1748.016, 134, 3.721, 1194.447, 125, 2.948, 6438.496, 122, 2.973, 2146.165, 110, 1.271, 161000.686, 104, 0.604, 3154.687, 100, 5.986, 6286.599, 92, 4.8, 5088.63, 89, 5.23, 7084.9, 83, 3.31, 213.3, 76, 3.42, 5486.78, 71, 6.19, 4690.48, 68, 3.43, 4694.0, 65, 1.6, 2544.31, 64, 1.98, 801.82, 61, 2.48, 10977.08, 50, 1.44, 6836.65, 49, 2.34, 1592.6, 46, 1.31, 4292.33, 46, 3.81, 149854.4, 43, 0.04, 7234.79, 40, 4.94, 7632.94, 39, 1.57, 71430.7, 38, 3.17, 6309.37, 35, 0.99, 6040.35, 35, 0.67, 1059.38, 31, 3.18, 2352.87, 31, 3.55, 8031.09, 30, 1.92, 10447.39, 30, 2.52, 6127.66, 28, 4.42, 9437.76, 28, 2.71, 3894.18, 27, 0.67, 25132.3, 26, 5.27, 6812.77, 25, 0.55, 6279.55, 23, 1.38, 4705.73, 22, 0.64, 6256.78, 20, 6.07, 640.88, 28923, 5.84384, 6283.07585, 3496, 0.0, 0.0, 1682, 5.4877, 12566.1517, 296, 5.196, 155.42, 129, 4.722, 3.523, 71, 5.3, 18849.23, 64, 5.97, 242.73, 40, 3.79, 553.57, 11408, 3.14159, 0.0, 772, 4.134, 6283.076, 77, 3.84, 12566.15, 42, 0.42, 155.42, 88, 3.14, 0.0, 17, 2.77, 6283.08, 5, 2.01, 155.42, 3, 2.21, 12566.15, 27962, 3.1987, 84334.66158, 10164, 5.42249, 5507.55324, 8045, 3.8801, 5223.6939, 4381, 3.7044, 2352.8662, 3193, 4.0003, 1577.3435, 2272, 3.9847, 1047.7473, 1814, 4.9837, 6283.0758, 1639, 3.5646, 5856.4777, 1444, 3.7028, 9437.7629, 1430, 3.4112, 10213.2855, 1125, 4.8282, 14143.4952, 1090, 2.0857, 6812.7668, 1037, 4.0566, 71092.8814, 971, 3.473, 4694.003, 915, 1.142, 6620.89, 878, 4.44, 5753.385, 837, 4.993, 7084.897, 770, 5.554, 167621.576, 719, 3.602, 529.691, 692, 4.326, 6275.962, 558, 4.41, 7860.419, 529, 2.484, 4705.732, 521, 6.25, 18073.705, 903, 3.897, 5507.553, 618, 1.73, 5223.694, 380, 5.244, 2352.866, 166, 1.627, 84334.662, 10001398880, 0.0, 0.0, 167069963, 3.098463508, 6283.075849991, 1395602, 3.0552461, 12566.1517, 308372, 5.198467, 77713.771468, 162846, 1.173877, 5753.384885, 157557, 2.846852, 7860.419392, 92480, 5.45292, 11506.76977, 54244, 4.56409, 3930.2097, 47211, 3.661, 5884.92685, 34598, 0.96369, 5507.55324, 32878, 5.89984, 5223.69392, 30678, 0.29867, 5573.1428, 24319, 4.2735, 11790.62909, 21183, 5.84715, 1577.34354, 18575, 5.02194, 10977.0788, 17484, 3.01194, 18849.22755, 10984, 5.05511, 5486.77784, 9832, 0.8868, 6069.7768, 8650, 5.6896, 15720.8388, 8583, 1.2708, 161000.6857, 6490, 0.2725, 17260.1547, 6292, 0.9218, 529.691, 5706, 2.0137, 83996.8473, 5574, 5.2416, 71430.6956, 4938, 3.245, 2544.3144, 4696, 2.5781, 775.5226, 4466, 5.5372, 9437.7629, 4252, 6.0111, 6275.9623, 3897, 5.3607, 4694.003, 3825, 2.3926, 8827.3903, 3749, 0.8295, 19651.0485, 3696, 4.9011, 12139.5535, 3566, 1.6747, 12036.4607, 3454, 1.8427, 2942.4634, 3319, 0.2437, 7084.8968, 3192, 0.1837, 5088.6288, 3185, 1.7778, 398.149, 2846, 1.2134, 6286.599, 2779, 1.8993, 6279.5527, 2628, 4.589, 10447.3878, 2460, 3.7866, 8429.2413, 2393, 4.996, 5856.4777, 2359, 0.2687, 796.298, 2329, 2.8078, 14143.4952, 2210, 1.95, 3154.6871, 2035, 4.6527, 2146.1654, 1951, 5.3823, 2352.8662, 1883, 0.6731, 149854.4001, 1833, 2.2535, 23581.2582, 1796, 0.1987, 6812.7668, 1731, 6.152, 16730.4637, 1717, 4.4332, 10213.2855, 1619, 5.2316, 17789.8456, 1381, 5.1896, 8031.0923, 1364, 3.6852, 4705.7323, 1314, 0.6529, 13367.9726, 1041, 4.3329, 11769.8537, 1017, 1.5939, 4690.4798, 998, 4.201, 6309.374, 966, 3.676, 27511.468, 874, 6.064, 1748.016, 779, 3.674, 12168.003, 771, 0.312, 7632.943, 756, 2.626, 6256.778, 746, 5.648, 11926.254, 693, 2.924, 6681.225, 680, 1.423, 23013.54, 674, 0.563, 3340.612, 663, 5.661, 11371.705, 659, 3.136, 801.821, 648, 2.65, 19804.827, 615, 3.029, 233141.314, 612, 5.134, 1194.447, 563, 4.341, 90955.552, 552, 2.091, 17298.182, 534, 5.1, 31441.678, 531, 2.407, 11499.656, 523, 4.624, 6438.496, 513, 5.324, 11513.883, 477, 0.256, 11856.219, 461, 1.722, 7234.794, 458, 3.766, 6386.169, 458, 4.466, 5746.271, 423, 1.055, 5760.498, 422, 1.557, 7238.676, 415, 2.599, 7058.598, 401, 3.03, 1059.382, 397, 1.201, 1349.867, 379, 4.907, 4164.312, 360, 5.707, 5643.179, 352, 3.626, 244287.6, 348, 0.761, 10973.556, 342, 3.001, 4292.331, 336, 4.546, 4732.031, 334, 3.138, 6836.645, 324, 4.164, 9917.697, 316, 1.691, 11015.106, 307, 0.238, 35371.887, 298, 1.306, 6283.143, 298, 1.75, 6283.009, 293, 5.738, 16200.773, 286, 5.928, 14712.317, 281, 3.515, 21228.392, 280, 5.663, 8635.942, 277, 0.513, 26.298, 268, 4.207, 18073.705, 266, 0.9, 12352.853, 260, 2.962, 25132.303, 255, 2.477, 6208.294, 242, 2.8, 709.933, 231, 1.054, 22483.849, 229, 1.07, 14314.168, 216, 1.314, 154717.61, 215, 6.038, 10873.986, 200, 0.561, 7079.374, 198, 2.614, 951.718, 197, 4.369, 167283.762, 186, 2.861, 5216.58, 183, 1.66, 39302.097, 183, 5.912, 3738.761, 175, 2.145, 6290.189, 173, 2.168, 10575.407, 171, 3.702, 1592.596, 171, 1.343, 3128.389, 164, 5.55, 6496.375, 164, 5.856, 10984.192, 161, 1.998, 10969.965, 161, 1.909, 6133.513, 157, 4.955, 25158.602, 154, 6.216, 23543.231, 153, 5.357, 13521.751, 150, 5.77, 18209.33, 150, 5.439, 155.42, 139, 1.778, 9225.539, 139, 1.626, 5120.601, 128, 2.46, 13916.019, 123, 0.717, 143571.324, 122, 2.654, 88860.057, 121, 4.414, 3894.182, 121, 1.192, 3.523, 120, 4.03, 553.569, 119, 1.513, 17654.781, 117, 3.117, 14945.316, 113, 2.698, 6040.347, 110, 3.085, 43232.307, 109, 0.998, 955.6, 108, 2.939, 17256.632, 107, 5.285, 65147.62, 103, 0.139, 11712.955, 103, 5.85, 213.299, 102, 3.046, 6037.244, 101, 2.842, 8662.24, 100, 3.626, 6262.3, 98, 2.36, 6206.81, 98, 5.11, 6172.87, 98, 2.0, 15110.47, 97, 2.67, 5650.29, 97, 2.75, 6244.94, 96, 4.02, 6282.1, 96, 5.31, 6284.06, 92, 0.1, 29088.81, 85, 3.26, 20426.57, 84, 2.6, 28766.92, 81, 3.58, 10177.26, 80, 5.81, 5230.81, 78, 2.53, 16496.36, 77, 4.06, 6127.66, 73, 0.04, 5481.25, 72, 5.96, 12559.04, 72, 5.92, 4136.91, 71, 5.49, 22003.91, 70, 3.41, 7.11, 69, 0.62, 11403.68, 69, 3.9, 1589.07, 69, 1.96, 12416.59, 69, 4.51, 426.6, 67, 1.61, 11087.29, 66, 4.5, 47162.52, 66, 5.08, 283.86, 66, 4.32, 16858.48, 65, 1.04, 6062.66, 64, 1.59, 18319.54, 63, 5.7, 45892.73, 63, 4.6, 66567.49, 63, 3.82, 13517.87, 62, 2.62, 11190.38, 61, 1.54, 33019.02, 60, 5.58, 10344.3, 60, 5.38, 316428.23, 60, 5.78, 632.78, 59, 6.12, 9623.69, 57, 0.16, 17267.27, 57, 3.86, 6076.89, 57, 1.98, 7668.64, 56, 4.78, 20199.09, 55, 4.56, 18875.53, 55, 3.51, 17253.04, 54, 3.07, 226858.24, 54, 4.83, 18422.63, 53, 5.02, 12132.44, 52, 3.63, 5333.9, 52, 0.97, 155427.54, 51, 3.36, 20597.24, 50, 0.99, 11609.86, 50, 2.21, 1990.75, 48, 1.62, 12146.67, 48, 1.17, 12569.67, 47, 4.62, 5436.99, 47, 1.81, 12562.63, 47, 0.59, 21954.16, 47, 0.76, 7342.46, 46, 0.27, 4590.91, 46, 3.77, 156137.48, 45, 5.66, 10454.5, 44, 5.84, 3496.03, 43, 0.24, 17996.03, 41, 5.93, 51092.73, 41, 4.21, 12592.45, 40, 5.14, 1551.05, 40, 5.28, 15671.08, 39, 3.69, 18052.93, 39, 4.94, 24356.78, 38, 2.72, 11933.37, 38, 5.23, 7477.52, 38, 4.99, 9779.11, 37, 3.7, 9388.01, 37, 4.44, 4535.06, 36, 2.16, 28237.23, 36, 2.54, 242.73, 36, 0.22, 5429.88, 35, 6.15, 19800.95, 35, 2.92, 36949.23, 34, 5.63, 2379.16, 34, 5.73, 16460.33, 34, 5.11, 5849.36, 33, 6.19, 6268.85, 10301861, 1.1074897, 6283.07584999, 172124, 1.064423, 12566.1517, 70222, 3.14159, 0.0, 3235, 1.0217, 18849.2275, 3080, 2.8435, 5507.5532, 2497, 1.3191, 5223.6939, 1849, 1.4243, 1577.3435, 1008, 5.9138, 10977.0788, 865, 1.42, 6275.962, 863, 0.271, 5486.778, 507, 1.686, 5088.629, 499, 6.014, 6286.599, 467, 5.987, 529.691, 440, 0.518, 4694.003, 410, 1.084, 9437.763, 387, 4.75, 2544.314, 375, 5.071, 796.298, 352, 0.023, 83996.847, 344, 0.949, 71430.696, 341, 5.412, 775.523, 322, 6.156, 2146.165, 286, 5.484, 10447.388, 284, 3.42, 2352.866, 255, 6.132, 6438.496, 252, 0.243, 398.149, 243, 3.092, 4690.48, 225, 3.689, 7084.897, 220, 4.952, 6812.767, 219, 0.42, 8031.092, 209, 1.282, 1748.016, 193, 5.314, 8429.241, 185, 1.82, 7632.943, 175, 3.229, 6279.553, 173, 1.537, 4705.732, 158, 4.097, 11499.656, 158, 5.539, 3154.687, 150, 3.633, 11513.883, 148, 3.222, 7234.794, 147, 3.653, 1194.447, 144, 0.817, 14143.495, 135, 6.151, 5746.271, 134, 4.644, 6836.645, 128, 2.693, 1349.867, 123, 5.65, 5760.498, 118, 2.577, 13367.973, 113, 3.357, 17789.846, 110, 4.497, 4292.331, 108, 5.828, 12036.461, 102, 5.621, 6256.778, 99, 1.14, 1059.38, 98, 0.66, 5856.48, 93, 2.32, 10213.29, 92, 0.77, 16730.46, 88, 1.5, 11926.25, 86, 1.42, 5753.38, 85, 0.66, 155.42, 81, 1.64, 6681.22, 80, 4.11, 951.72, 66, 4.55, 5216.58, 65, 0.98, 25132.3, 64, 4.19, 6040.35, 64, 0.52, 6290.19, 63, 1.51, 5643.18, 59, 6.18, 4164.31, 57, 2.3, 10973.56, 55, 2.32, 11506.77, 55, 2.2, 1592.6, 55, 5.27, 3340.61, 54, 5.54, 553.57, 53, 5.04, 9917.7, 53, 0.92, 11371.7, 52, 3.98, 17298.18, 52, 3.6, 10969.97, 49, 5.91, 3894.18, 49, 2.51, 6127.66, 48, 1.67, 12168.0, 46, 0.31, 801.82, 42, 3.7, 10575.41, 42, 4.05, 10984.19, 40, 2.17, 7860.42, 40, 4.17, 26.3, 38, 5.82, 7058.6, 37, 3.39, 6496.37, 36, 1.08, 6309.37, 36, 5.34, 7079.37, 34, 3.62, 11790.63, 32, 0.32, 16200.77, 31, 4.24, 3738.76, 29, 4.55, 11856.22, 29, 1.26, 8635.94, 27, 3.45, 5884.93, 26, 5.08, 10177.26, 26, 5.38, 21228.39, 24, 2.26, 11712.96, 24, 1.05, 242.73, 24, 5.59, 6069.78, 23, 3.63, 6284.06, 23, 1.64, 4732.03, 22, 3.46, 213.3, 21, 1.05, 3496.03, 21, 3.92, 13916.02, 21, 4.01, 5230.81, 20, 5.16, 12352.85, 20, 0.69, 1990.75, 19, 2.73, 6062.66, 19, 5.01, 11015.11, 18, 6.04, 6283.01, 18, 2.85, 7238.68, 18, 5.6, 6283.14, 18, 5.16, 17253.04, 18, 2.54, 14314.17, 17, 1.58, 7.11, 17, 0.98, 3930.21, 17, 4.75, 17267.27, 16, 2.19, 6076.89, 16, 2.19, 18073.7, 16, 6.12, 3.52, 16, 4.61, 9623.69, 16, 3.4, 16496.36, 15, 0.19, 9779.11, 15, 5.3, 13517.87, 15, 4.26, 3128.39, 15, 0.81, 709.93, 14, 0.5, 25158.6, 14, 4.38, 4136.91, 13, 0.98, 65147.62, 13, 3.31, 154717.61, 13, 2.11, 1589.07, 13, 1.92, 22483.85, 12, 6.03, 9225.54, 12, 1.53, 12559.04, 12, 5.82, 6282.1, 12, 5.61, 5642.2, 12, 2.38, 167283.76, 12, 0.39, 12132.44, 12, 3.98, 4686.89, 12, 5.81, 12569.67, 12, 0.56, 5849.36, 11, 0.45, 6172.87, 11, 5.8, 16858.48, 11, 6.22, 12146.67, 11, 2.27, 5429.88, 435939, 5.784551, 6283.07585, 12363, 5.57935, 12566.1517, 1234, 3.1416, 0.0, 879, 3.628, 77713.771, 569, 1.87, 5573.143, 330, 5.47, 18849.228, 147, 4.48, 5507.553, 110, 2.842, 161000.686, 101, 2.815, 5223.694, 85, 3.11, 1577.34, 65, 5.47, 775.52, 61, 1.38, 6438.5, 50, 4.42, 6286.6, 47, 3.66, 7084.9, 46, 5.39, 149854.4, 42, 0.9, 10977.08, 40, 3.2, 5088.63, 35, 1.81, 5486.78, 32, 5.35, 3154.69, 30, 3.52, 796.3, 29, 4.62, 4690.48, 28, 1.84, 4694.0, 27, 3.14, 71430.7, 27, 6.17, 6836.65, 26, 1.42, 2146.17, 25, 2.81, 1748.02, 24, 2.18, 155.42, 23, 4.76, 7234.79, 21, 3.38, 7632.94, 21, 0.22, 4705.73, 20, 4.22, 1349.87, 20, 2.01, 1194.45, 20, 4.58, 529.69, 19, 1.59, 6309.37, 18, 5.7, 6040.35, 18, 6.03, 4292.33, 17, 2.9, 9437.76, 17, 2.0, 8031.09, 17, 5.78, 83996.85, 16, 0.05, 2544.31, 15, 0.95, 6127.66, 14, 0.36, 10447.39, 14, 1.48, 2352.87, 13, 0.77, 553.57, 13, 5.48, 951.72, 13, 5.27, 6279.55, 13, 3.76, 6812.77, 11, 5.41, 6256.78, 10, 0.68, 1592.6, 10, 4.95, 398.15, 10, 1.15, 3894.18, 10, 5.2, 244287.6, 10, 1.94, 11856.22, 9, 5.39, 25132.3, 8, 6.18, 1059.38, 8, 0.69, 8429.24, 8, 5.85, 242.73, 7, 5.26, 14143.5, 7, 0.52, 801.82, 6, 2.24, 8635.94, 6, 4.0, 13367.97, 6, 2.77, 90955.55, 6, 5.17, 7058.6, 5, 1.46, 233141.31, 5, 4.13, 7860.42, 5, 3.91, 26.3, 5, 3.89, 12036.46, 5, 5.58, 6290.19, 5, 5.54, 1990.75, 5, 0.83, 11506.77, 5, 6.22, 6681.22, 4, 5.26, 10575.41, 4, 1.91, 7477.52, 4, 0.43, 10213.29, 4, 1.09, 709.93, 4, 5.09, 11015.11, 4, 4.22, 88860.06, 4, 3.57, 7079.37, 4, 1.98, 6284.06, 4, 3.93, 10973.56, 4, 6.18, 9917.7, 4, 0.36, 10177.26, 4, 2.75, 3738.76, 4, 3.33, 5643.18, 4, 5.36, 25158.6, 14459, 4.27319, 6283.07585, 673, 3.917, 12566.152, 77, 0.0, 0.0, 25, 3.73, 18849.23, 4, 2.8, 6286.6, 386, 2.564, 6283.076, 31, 2.27, 12566.15, 5, 3.44, 5573.14, 2, 2.05, 18849.23, 1, 2.06, 77713.77, 1, 4.41, 161000.69, 1, 3.82, 149854.4, 1, 4.08, 6127.66, 1, 5.26, 6438.5, 9, 1.22, 6283.08, 1, 0.66, 12566.15],
            XL1: [
                [22639.586, 0.78475822, 8328.691424623, 1.5229241, 25.0719, -0.123598, 4586.438, 0.1873974, 7214.06286536, -2.184756, -18.86, 0.0828, 2369.914, 2.542952, 15542.75428998, -0.661832, 6.212, -0.0408, 769.026, 3.140313, 16657.38284925, 3.04585, 50.144, -0.2472, 666.418, 1.527671, 628.30195521, -0.02664, 0.062, -0.0054, 411.596, 4.826607, 16866.932315, -1.28012, -1.07, -0.0059, 211.656, 4.115028, -1114.6285593, -3.70768, -43.93, 0.2064, 205.436, 0.230523, 6585.7609101, -2.15812, -18.92, 0.0882, 191.956, 4.898507, 23871.4457146, 0.86109, 31.28, -0.164, 164.729, 2.586078, 14914.4523348, -0.6352, 6.15, -0.035, 147.321, 5.4553, -7700.3894694, -1.5496, -25.01, 0.118, 124.988, 0.48608, 7771.377145, -0.3309, 3.11, -0.02, 109.38, 3.88323, 8956.9933798, 1.4963, 25.13, -0.129, 55.177, 5.57033, -1324.178025, 0.6183, 7.3, -0.035, 45.1, 0.89898, 25195.62374, 0.2428, 24.0, -0.129, 39.533, 3.81213, -8538.24089, 2.803, 26.1, -0.118, 38.43, 4.30115, 22756.817155, -2.8466, -12.6, 0.042, 36.124, 5.49587, 24986.074274, 4.5688, 75.2, -0.371, 30.773, 1.94559, 14428.125731, -4.3695, -37.7, 0.166, 28.397, 3.28586, 7842.364821, -2.2114, -18.8, 0.077, 24.358, 5.64142, 16171.056245, -0.6885, 6.3, -0.046, 18.585, 4.41371, -557.31428, -1.8538, -22.0, 0.1, 17.954, 3.58454, 8399.6791, -0.3576, 3.2, -0.03, 14.53, 4.9416, 23243.143759, 0.888, 31.2, -0.16, 14.38, 0.9709, 32200.137139, 2.384, 56.4, -0.29, 14.251, 5.7641, -2.3012, 1.523, 25.1, -0.12, 13.899, 0.3735, 31085.50858, -1.324, 12.4, -0.08, 13.194, 1.7595, -9443.319984, -5.231, -69.0, 0.33, 9.679, 3.0997, -16029.080894, -3.072, -50.1, 0.24, 9.366, 0.3016, 24080.99518, -3.465, -19.9, 0.08, 8.606, 4.1582, -1742.930514, -3.681, -44.0, 0.21, 8.453, 2.8416, 16100.06857, 1.192, 28.2, -0.14, 8.05, 2.6292, 14286.15038, -0.609, 6.1, -0.03, 7.63, 6.2388, 17285.684804, 3.019, 50.2, -0.25, 7.447, 1.4845, 1256.60391, -0.053, 0.1, -0.01, 7.371, 0.2736, 5957.458955, -2.131, -19.0, 0.09, 7.063, 5.6715, 33.757047, -0.308, -3.6, 0.02, 6.383, 4.7843, 7004.5134, 2.141, 32.4, -0.16, 5.742, 2.6572, 32409.686605, -1.942, 5, -0.05, 4.374, 4.3443, 22128.5152, -2.82, -13, 0.05, 3.998, 3.2545, 33524.31516, 1.766, 49, -0.25, 3.21, 2.2443, 14985.44001, -2.516, -16, 0.06, 2.915, 1.7138, 24499.74767, 0.834, 31, -0.17, 2.732, 1.9887, 13799.82378, -4.343, -38, 0.17, 2.568, 5.4122, -7072.08751, -1.576, -25, 0.11, 2.521, 3.2427, 8470.66678, -2.238, -19, 0.07, 2.489, 4.0719, -486.3266, -3.734, -44, 0.2, 2.146, 5.6135, -1952.47998, 0.645, 7, -0.03, 1.978, 2.7291, 39414.2, 0.199, 37, -0.21, 1.934, 1.5682, 33314.7657, 6.092, 100, -0.5, 1.871, 0.4166, 30457.20662, -1.297, 12, -0.1, 1.753, 2.0582, -8886.0057, -3.38, -47, 0.2, 1.437, 2.386, -695.87607, 0.59, 7, 0, 1.373, 3.026, -209.54947, 4.33, 51, -0.2, 1.262, 5.94, 16728.37052, 1.17, 28, -0.1, 1.224, 6.172, 6656.74859, -4.04, -41, 0.2, 1.187, 5.873, 6099.43431, -5.89, -63, 0.3, 1.177, 1.014, 31571.83518, 2.41, 56, -0.3, 1.162, 3.84, 9585.29534, 1.47, 25, -0.1, 1.143, 5.639, 8364.73984, -2.18, -19, 0.1, 1.078, 1.229, 70.98768, -1.88, -22, 0.1, 1.059, 3.326, 40528.82856, 3.91, 81, -0.4, 0.99, 5.013, 40738.37803, -0.42, 30, -0.2, 0.948, 5.687, -17772.01141, -6.75, -94, 0.5, 0.876, 0.298, -0.35232, 0, 0, 0, 0.822, 2.994, 393.02097, 0, 0, 0, 0.788, 1.836, 8326.39022, 3.05, 50, -0.2, 0.752, 4.985, 22614.8418, 0.91, 31, -0.2, 0.74, 2.875, 8330.99262, 0, 0, 0, 0.669, 0.744, -24357.77232, -4.6, -75, 0.4, 0.644, 1.314, 8393.12577, -2.18, -19, 0.1, 0.639, 5.888, 575.33849, 0, 0, 0, 0.635, 1.116, 23385.11911, -2.87, -13, 0, 0.584, 5.197, 24428.75999, 2.71, 53, -0.3, 0.583, 3.513, -9095.55517, 0.95, 4, 0, 0.572, 6.059, 29970.88002, -5.03, -32, 0.1, 0.565, 2.96, 0.32863, 1.52, 25, -0.1, 0.561, 4.001, -17981.56087, -2.43, -43, 0.2, 0.557, 0.529, 7143.07519, -0.3, 3, 0, 0.546, 2.311, 25614.37623, 4.54, 75, -0.4, 0.536, 4.229, 15752.30376, -4.99, -45, 0.2, 0.493, 3.316, -8294.9344, -1.83, -29, 0.1, 0.491, 1.744, 8362.4485, 1.21, 21, -0.1, 0.478, 1.803, -10071.6219, -5.2, -69, 0.3, 0.454, 0.857, 15333.2048, 3.66, 57, -0.3, 0.445, 2.071, 8311.7707, -2.18, -19, 0.1, 0.426, 0.345, 23452.6932, -3.44, -20, 0.1, 0.42, 4.941, 33733.8646, -2.56, -2, 0, 0.413, 1.642, 17495.2343, -1.31, -1, 0, 0.404, 1.458, 23314.1314, -0.99, 9, -0.1, 0.395, 2.132, 38299.5714, -3.51, -6, 0, 0.382, 2.7, 31781.3846, -1.92, 5, 0, 0.375, 4.827, 6376.2114, 2.17, 32, -0.2, 0.361, 3.867, 16833.1753, -0.97, 3, 0, 0.358, 5.044, 15056.4277, -4.4, -38, 0.2, 0.35, 5.157, -8257.7037, -3.4, -47, 0.2, 0.344, 4.233, 157.7344, 0, 0, 0, 0.34, 2.672, 13657.8484, -0.58, 6, 0, 0.329, 5.61, 41853.0066, 3.29, 74, -0.4, 0.325, 5.895, -39.8149, 0, 0, 0, 0.309, 4.387, 21500.2132, -2.79, -13, 0.1, 0.302, 1.278, 786.0419, 0, 0, 0, 0.302, 5.341, -24567.3218, -0.27, -24, 0.1, 0.301, 1.045, 5889.8848, -1.57, -12, 0, 0.294, 4.201, -2371.2325, -3.65, -44, 0.2, 0.293, 3.704, 21642.1886, -6.55, -57, 0.2, 0.29, 4.069, 32828.4391, 2.36, 56, -0.3, 0.289, 3.472, 31713.8105, -1.35, 12, -0.1, 0.285, 5.407, -33.7814, 0.31, 4, 0, 0.283, 5.998, -16.9207, -3.71, -44, 0.2, 0.283, 2.772, 38785.898, 0.23, 37, -0.2, 0.274, 5.343, 15613.742, -2.54, -16, 0.1, 0.263, 3.997, 25823.9257, 0.22, 24, -0.1, 0.254, 0.6, 24638.3095, -1.61, 2, 0, 0.253, 1.344, 6447.1991, 0.29, 10, -0.1, 0.25, 0.887, 141.9754, -3.76, -44, 0.2, 0.247, 0.317, 5329.157, -2.1, -19, 0.1, 0.245, 0.141, 36.0484, -3.71, -44, 0.2, 0.231, 2.287, 14357.1381, -2.49, -16, 0.1, 0.227, 5.158, 2.6298, 0, 0, 0, 0.219, 5.085, 47742.8914, 1.72, 63, -0.3, 0.211, 2.145, 6638.7244, -2.18, -19, 0.1, 0.201, 4.415, 39623.7495, -4.13, -14, 0, 0.194, 2.091, 588.4927, 0, 0, 0, 0.193, 3.057, -15400.7789, -3.1, -50, 0, 0.186, 5.598, 16799.3582, -0.72, 6, 0, 0.185, 3.886, 1150.677, 0, 0, 0, 0.183, 1.619, 7178.0144, 1.52, 25, 0, 0.181, 2.635, 8328.3391, 1.52, 25, 0, 0.181, 2.077, 8329.0437, 1.52, 25, 0, 0.179, 3.215, -9652.8694, -0.9, -18, 0, 0.176, 1.716, -8815.018, -5.26, -69, 0, 0.175, 5.673, 550.7553, 0, 0, 0, 0.17, 2.06, 31295.058, -5.6, -39, 0, 0.167, 1.239, 7211.7617, -0.7, 6, 0, 0.165, 4.499, 14967.4158, -0.7, 6, 0, 0.164, 3.595, 15540.4531, 0.9, 31, 0, 0.164, 4.237, 522.3694, 0, 0, 0, 0.163, 4.633, 15545.0555, -2.2, -19, 0, 0.161, 0.478, 6428.0209, -2.2, -19, 0, 0.158, 2.03, 13171.5218, -4.3, -38, 0, 0.157, 2.28, 7216.3641, -3.7, -44, 0, 0.154, 5.65, 7935.6705, 1.5, 25, 0, 0.152, 0.46, 29828.9047, -1.3, 12, 0, 0.151, 1.19, -0.7113, 0, 0, 0, 0.15, 1.42, 23942.4334, -1.0, 9, 0, 0.144, 2.75, 7753.3529, 1.5, 25, 0, 0.137, 2.08, 7213.7105, -2.2, -19, 0, 0.137, 1.44, 7214.4152, -2.2, -19, 0, 0.136, 4.46, -1185.6162, -1.8, -22, 0, 0.136, 3.03, 8000.1048, -2.2, -19, 0, 0.134, 2.83, 14756.7124, -0.7, 6, 0, 0.131, 5.05, 6821.0419, -2.2, -19, 0, 0.128, 5.99, -17214.6971, -4.9, -72, 0, 0.127, 5.35, 8721.7124, 1.5, 25, 0, 0.126, 4.49, 46628.2629, -2.0, 19, 0, 0.125, 5.94, 7149.6285, 1.5, 25, 0, 0.124, 1.09, 49067.0695, 1.1, 55, 0, 0.121, 2.88, 15471.7666, 1.2, 28, 0, 0.111, 3.92, 41643.4571, 7.6, 125, -1, 0.11, 1.96, 8904.0299, 1.5, 25, 0, 0.106, 3.3, -18.0489, -2.2, -19, 0, 0.105, 2.3, -4.931, 1.5, 25, 0, 0.104, 2.22, -6.559, -1.9, -22, 0, 0.101, 1.44, 1884.9059, -0.1, 0, 0, 0.1, 5.92, 5471.1324, -5.9, -63, 0, 0.099, 1.12, 15149.7333, -0.7, 6, 0, 0.096, 4.73, 15508.9972, -0.4, 10, 0, 0.095, 5.18, 7230.9835, 1.5, 25, 0, 0.093, 3.37, 39900.5266, 3.9, 81, 0, 0.092, 2.01, 25057.0619, 2.7, 53, 0, 0.092, 1.21, -79.6298, 0, 0, 0, 0.092, 1.65, -26310.2523, -4.0, -68, 0, 0.091, 1.01, 42062.5561, -1.0, 23, 0, 0.09, 6.1, 29342.5781, -5.0, -32, 0, 0.09, 4.43, 15542.402, -0.7, 6, 0, 0.09, 3.8, 15543.1066, -0.7, 6, 0, 0.089, 4.15, 6063.3859, -2.2, -19, 0, 0.086, 4.03, 52.9691, 0, 0, 0, 0.085, 0.49, 47952.4409, -2.6, 11, 0, 0.085, 1.6, 7632.8154, 2.1, 32, 0, 0.084, 0.22, 14392.0773, -0.7, 6, 0, 0.083, 6.22, 6028.4466, -4.0, -41, 0, 0.083, 0.63, -7909.9389, 2.8, 26, 0, 0.083, 5.2, -77.5523, 0, 0, 0, 0.082, 2.74, 8786.1467, -2.2, -19, 0, 0.08, 2.43, 9166.5428, -2.8, -26, 0, 0.08, 3.7, -25405.1732, 4.1, 27, 0, 0.078, 5.68, 48857.52, 5.4, 106, -1, 0.077, 1.85, 8315.5735, -2.2, -19, 0, 0.075, 5.46, -18191.1103, 1.9, 8, 0, 0.075, 1.41, -16238.6304, 1.3, 1, 0, 0.074, 5.06, 40110.0761, -0.4, 30, 0, 0.072, 2.1, 64.4343, -3.7, -44, 0, 0.071, 2.17, 37671.2695, -3.5, -6, 0, 0.069, 1.71, 16693.4313, -0.7, 6, 0, 0.069, 3.33, -26100.7028, -8.3, -119, 1, 0.068, 1.09, 8329.4028, 1.5, 25, 0, 0.068, 3.62, 8327.9801, 1.5, 25, 0, 0.068, 2.41, 16833.1509, -1.0, 3, 0, 0.067, 3.4, 24709.2971, -3.5, -20, 0, 0.067, 1.65, 8346.7156, -0.3, 3, 0, 0.066, 2.61, 22547.2677, 1.5, 39, 0, 0.066, 3.5, 15576.5113, -1.0, 3, 0, 0.065, 5.76, 33037.9886, -2.0, 5, 0, 0.065, 4.58, 8322.1325, -0.3, 3, 0, 0.065, 6.2, 17913.9868, 3.0, 50, 0, 0.065, 1.5, 22685.8295, -1.0, 9, 0, 0.065, 2.37, 7180.3058, -1.9, -15, 0, 0.064, 1.06, 30943.5332, 2.4, 56, 0, 0.064, 1.89, 8288.8765, 1.5, 25, 0, 0.064, 4.7, 6.0335, 0.3, 4, 0, 0.063, 2.83, 8368.5063, 1.5, 25, 0, 0.063, 5.66, -2580.7819, 0.7, 7, 0, 0.062, 3.78, 7056.3285, -2.2, -19, 0, 0.061, 1.49, 8294.91, 1.8, 29, 0, 0.061, 0.12, -10281.1714, -0.9, -18, 0, 0.061, 3.06, -8362.4729, -1.2, -21, 0, 0.061, 4.43, 8170.9571, 1.5, 25, 0, 0.059, 5.78, -13.1179, -3.7, -44, 0, 0.059, 5.97, 6625.5702, -2.2, -19, 0, 0.058, 5.01, -0.508, -0.3, 0, 0, 0.058, 2.73, 7161.0938, -2.2, -19, 0, 0.057, 0.19, 7214.0629, -2.2, -19, 0, 0.057, 4.0, 22199.5029, -4.7, -35, 0, 0.057, 5.38, 8119.142, 5.8, 76, 0, 0.056, 1.07, 7542.6495, 1.5, 25, 0, 0.056, 0.28, 8486.4258, 1.5, 25, 0, 0.054, 4.19, 16655.0816, 4.6, 75, 0, 0.053, 0.72, 7267.032, -2.2, -19, 0, 0.053, 3.12, 12.6192, 0.6, 7, 0, 0.052, 2.99, -32896.013, -1.8, -49, 0, 0.052, 3.46, 1097.708, 0, 0, 0, 0.051, 5.37, -6443.786, -1.6, -25, 0, 0.051, 1.35, 7789.401, -2.2, -19, 0, 0.051, 5.83, 40042.502, 0.2, 38, 0, 0.051, 3.63, 9114.733, 1.5, 25, 0, 0.05, 1.51, 8504.484, -2.5, -22, 0, 0.05, 5.23, 16659.684, 1.5, 25, 0, 0.05, 1.15, 7247.82, -2.5, -23, 0, 0.047, 0.25, -1290.421, 0.3, 0, 0, 0.047, 4.67, -32686.464, -6.1, -100, 0, 0.047, 3.49, 548.678, 0, 0, 0, 0.047, 2.37, 6663.308, -2.2, -19, 0, 0.046, 0.98, 1572.084, 0, 0, 0, 0.046, 2.04, 14954.262, -0.7, 6, 0, 0.046, 3.72, 6691.693, -2.2, -19, 0, 0.045, 6.19, -235.287, 0, 0, 0, 0.044, 2.96, 32967.001, -0.1, 27, 0, 0.044, 3.82, -1671.943, -5.6, -66, 0, 0.043, 5.82, 1179.063, 0, 0, 0, 0.043, 0.07, 34152.617, 1.7, 49, 0, 0.043, 3.71, 6514.773, -0.3, 0, 0, 0.043, 5.62, 15.732, -2.5, -23, 0, 0.043, 5.8, 8351.233, -2.2, -19, 0, 0.042, 0.27, 7740.199, 1.5, 25, 0, 0.042, 6.14, 15385.02, -0.7, 6, 0, 0.042, 6.13, 7285.051, -4.1, -41, 0, 0.041, 1.27, 32757.451, 4.2, 78, 0, 0.041, 4.46, 8275.722, 1.5, 25, 0, 0.04, 0.23, 8381.661, 1.5, 25, 0, 0.04, 5.87, -766.864, 2.5, 29, 0, 0.04, 1.66, 254.431, 0, 0, 0, 0.04, 0.4, 9027.981, -0.4, 0, 0, 0.04, 2.96, 7777.936, 1.5, 25, 0, 0.039, 4.67, 33943.068, 6.1, 100, 0, 0.039, 3.52, 8326.062, 1.5, 25, 0, 0.039, 3.75, 21013.887, -6.5, -57, 0, 0.039, 5.6, 606.978, 0, 0, 0, 0.039, 1.19, 8331.321, 1.5, 25, 0, 0.039, 2.84, 7211.433, -2.2, -19, 0, 0.038, 0.67, 7216.693, -2.2, -19, 0, 0.038, 6.22, 25161.867, 0.6, 28, 0, 0.038, 4.4, 7806.322, 1.5, 25, 0, 0.038, 4.16, 9179.168, -2.2, -19, 0, 0.037, 4.73, 14991.999, -0.7, 6, 0, 0.036, 0.35, 67.514, -0.6, -7, 0, 0.036, 3.7, 25266.611, -1.6, 0, 0, 0.036, 5.39, 16328.796, -0.7, 6, 0, 0.035, 1.44, 7174.248, -2.2, -19, 0, 0.035, 5.0, 15684.73, -4.4, -38, 0, 0.035, 0.39, -15.419, -2.2, -19, 0, 0.035, 6.07, 15020.385, -0.7, 6, 0, 0.034, 6.01, 7371.797, -2.2, -19, 0, 0.034, 0.96, -16623.626, -3.4, -54, 0, 0.033, 6.24, 9479.368, 1.5, 25, 0, 0.033, 3.21, 23661.896, 5.2, 82, 0, 0.033, 4.06, 8311.418, -2.2, -19, 0, 0.033, 2.4, 1965.105, 0, 0, 0, 0.033, 5.17, 15489.785, -0.7, 6, 0, 0.033, 5.03, 21986.54, 0.9, 31, 0, 0.033, 4.1, 16691.14, 2.7, 46, 0, 0.033, 5.13, 47114.589, 1.7, 63, 0, 0.033, 4.45, 8917.184, 1.5, 25, 0, 0.033, 4.23, 2.078, 0, 0, 0, 0.032, 2.33, 75.251, 1.5, 25, 0, 0.032, 2.1, 7253.878, -2.2, -19, 0, 0.032, 3.11, -0.224, 1.5, 25, 0, 0.032, 4.43, 16640.462, -0.7, 6, 0, 0.032, 5.68, 8328.363, 0, 0, 0, 0.031, 5.32, 8329.02, 3.0, 50, 0, 0.031, 3.7, 16118.093, -0.7, 6, 0, 0.03, 3.67, 16721.817, -0.7, 6, 0, 0.03, 5.27, -1881.492, -1.2, -15, 0, 0.03, 5.72, 8157.839, -2.2, -19, 0, 0.029, 5.73, -18400.313, -6.7, -94, 0, 0.029, 2.76, 16.0, -2.2, -19, 0, 0.029, 1.75, 8879.447, 1.5, 25, 0, 0.029, 0.32, 8851.061, 1.5, 25, 0, 0.029, 0.9, 14704.903, 3.7, 57, 0, 0.028, 2.9, 15595.723, -0.7, 6, 0, 0.028, 5.88, 16864.631, 0.2, 24, 0, 0.028, 0.63, 16869.234, -2.8, -26, 0, 0.028, 4.04, -18609.863, -2.4, -43, 0, 0.027, 5.83, 6727.736, -5.9, -63, 0, 0.027, 6.12, 418.752, 4.3, 51, 0, 0.027, 0.14, 41157.131, 3.9, 81, 0, 0.026, 3.8, 15.542, 0, 0, 0, 0.026, 1.68, 50181.698, 4.8, 99, -1, 0.026, 0.32, 315.469, 0, 0, 0, 0.025, 5.67, 19.188, 0.3, 0, 0, 0.025, 3.16, 62.133, -2.2, -19, 0, 0.025, 3.76, 15502.939, -0.7, 6, 0, 0.025, 4.53, 45999.961, -2.0, 19, 0, 0.024, 3.21, 837.851, -4.4, -51, 0, 0.024, 2.82, 38157.596, 0.3, 37, 0, 0.024, 5.21, 15540.124, -0.7, 6, 0, 0.024, 0.26, 14218.576, 0, 13, 0, 0.024, 3.01, 15545.384, -0.7, 6, 0, 0.024, 1.16, -17424.247, -0.6, -21, 0, 0.023, 2.34, -67.574, 0.6, 7, 0, 0.023, 2.44, 18.024, -1.9, -22, 0, 0.023, 3.7, 469.4, 0, 0, 0, 0.023, 0.72, 7136.511, -2.2, -19, 0, 0.023, 4.5, 15582.569, -0.7, 6, 0, 0.023, 2.8, -16586.395, -4.9, -72, 0, 0.023, 1.51, 80.182, 0, 0, 0, 0.023, 1.09, 5261.583, -1.5, -12, 0, 0.023, 0.56, 54956.954, -0.5, 44, 0, 0.023, 4.01, 8550.86, -2.2, -19, 0, 0.023, 4.46, 38995.448, -4.1, -14, 0, 0.023, 3.82, 2358.126, 0, 0, 0, 0.022, 3.77, 32271.125, 0.5, 34, 0, 0.022, 0.82, 15935.775, -0.7, 6, 0, 0.022, 1.07, 24013.421, -2.9, -13, 0, 0.022, 0.4, 8940.078, -2.2, -19, 0, 0.022, 2.06, 15700.489, -0.7, 6, 0, 0.022, 4.27, 15124.002, -5.0, -45, 0, 0.021, 1.16, 56071.583, 3.2, 88, 0, 0.021, 5.58, 9572.189, -2.2, -19, 0, 0.02, 1.7, -17.273, -3.7, -44, 0, 0.02, 3.05, 214.617, 0, 0, 0, 0.02, 4.41, 8391.048, -2.2, -19, 0, 0.02, 5.95, 23869.145, 2.4, 56, 0, 0.02, 0.42, 40947.927, -4.7, -21, 0, 0.019, 1.39, 5818.897, 0.3, 10, 0, 0.019, 0.71, 23873.747, -0.7, 6, 0, 0.019, 2.81, 7291.615, -2.2, -19, 0, 0.019, 5.09, 8428.018, -2.2, -19, 0, 0.019, 4.14, 6518.187, -1.6, -12, 0, 0.019, 3.85, 21.33, 0, 0, 0, 0.018, 0.66, 14445.046, -0.7, 6, 0, 0.018, 1.65, 0.966, -4.0, -48, 0, 0.018, 5.64, -17143.709, -6.8, -94, 0, 0.018, 6.01, 7736.432, -2.2, -19, 0, 0.018, 2.74, 31153.083, -1.9, 5, 0, 0.018, 4.58, 6116.355, -2.2, -19, 0, 0.018, 2.28, 46.401, 0.3, 0, 0, 0.018, 3.8, 10213.597, 1.4, 25, 0, 0.018, 2.84, 56281.132, -1.1, 36, 0, 0.018, 3.53, 8249.062, 1.5, 25, 0, 0.017, 4.43, 20871.911, -3, -13, 0, 0.017, 4.44, 627.596, 0, 0, 0, 0.017, 1.85, 628.308, 0, 0, 0, 0.017, 1.19, 8408.321, 2, 25, 0, 0.017, 1.95, 7214.056, -2, -19, 0, 0.017, 1.57, 7214.07, -2, -19, 0, 0.017, 1.65, 13870.811, -6, -60, 0, 0.017, 0.3, 22.542, -4, -44, 0, 0.017, 2.62, -119.445, 0, 0, 0, 0.016, 4.87, 5747.909, 2, 32, 0, 0.016, 4.45, 14339.108, -1, 6, 0, 0.016, 1.83, 41366.68, 0, 30, 0, 0.016, 4.53, 16309.618, -3, -23, 0, 0.016, 2.54, 15542.754, -1, 6, 0, 0.016, 6.05, 1203.646, 0, 0, 0, 0.015, 5.2, 2751.147, 0, 0, 0, 0.015, 1.8, -10699.924, -5, -69, 0, 0.015, 0.4, 22824.391, -3, -20, 0, 0.015, 2.1, 30666.756, -6, -39, 0, 0.015, 2.1, 6010.417, -2, -19, 0, 0.015, 0.7, -23729.47, -5, -75, 0, 0.015, 1.4, 14363.691, -1, 6, 0, 0.015, 5.8, 16900.689, -2, 0, 0, 0.015, 5.2, 23800.458, 3, 53, 0, 0.015, 5.3, 6035.0, -2, -19, 0, 0.015, 1.2, 8251.139, 2, 25, 0, 0.015, 3.6, -8.86, 0, 0, 0, 0.015, 0.8, 882.739, 0, 0, 0, 0.015, 3.0, 1021.329, 0, 0, 0, 0.015, 0.6, 23296.107, 1, 31, 0, 0.014, 5.4, 7227.181, 2, 25, 0, 0.014, 0.1, 7213.352, -2, -19, 0, 0.014, 4.0, 15506.706, 3, 50, 0, 0.014, 3.4, 7214.774, -2, -19, 0, 0.014, 4.6, 6665.385, -2, -19, 0, 0.014, 0.1, -8.636, -2, -22, 0, 0.014, 3.1, 15465.202, -1, 6, 0, 0.014, 4.9, 508.863, 0, 0, 0, 0.014, 3.5, 8406.244, 2, 25, 0, 0.014, 1.3, 13313.497, -8, -82, 0, 0.014, 2.8, 49276.619, -3, 0, 0, 0.014, 0.1, 30528.194, -3, -10, 0, 0.013, 1.7, 25128.05, 1, 31, 0, 0.013, 2.9, 14128.405, -1, 6, 0, 0.013, 3.4, 57395.761, 3, 80, 0, 0.013, 2.7, 13029.546, -1, 6, 0, 0.013, 3.9, 7802.556, -2, -19, 0, 0.013, 1.6, 8258.802, -2, -19, 0, 0.013, 2.2, 8417.709, -2, -19, 0, 0.013, 0.7, 9965.21, -2, -19, 0, 0.013, 3.4, 50391.247, 0, 48, 0, 0.013, 3.0, 7134.433, -2, -19, 0, 0.013, 2.9, 30599.182, -5, -31, 0, 0.013, 3.6, -9723.857, 1, 0, 0, 0.013, 4.8, 7607.084, -2, -19, 0, 0.012, 0.8, 23837.689, 1, 35, 0, 0.012, 3.6, 4.409, -4, -44, 0, 0.012, 5.0, 16657.031, 3, 50, 0, 0.012, 4.4, 16657.735, 3, 50, 0, 0.012, 1.1, 15578.803, -4, -38, 0, 0.012, 6.0, -11.49, 0, 0, 0, 0.012, 1.9, 8164.398, 0, 0, 0, 0.012, 2.4, 31852.372, -4, -17, 0, 0.012, 2.4, 6607.085, -2, -19, 0, 0.012, 4.2, 8359.87, 0, 0, 0, 0.012, 0.5, 5799.713, -2, -19, 0, 0.012, 2.7, 7220.622, 0, 0, 0, 0.012, 4.3, -139.72, 0, 0, 0, 0.012, 2.3, 13728.836, -2, -16, 0, 0.011, 3.6, 14912.146, 1, 31, 0, 0.011, 4.7, 14916.748, -2, -19, 0],
                [1.6768, 4.66926, 628.301955, -0.0266, 0.1, -0.005, 0.51642, 3.3721, 6585.76091, -2.158, -18.9, 0.09, 0.41383, 5.7277, 14914.452335, -0.635, 6.2, -0.04, 0.37115, 3.9695, 7700.389469, 1.55, 25.0, -0.12, 0.2756, 0.7416, 8956.99338, 1.496, 25.1, -0.13, 0.24599, 4.2253, -2.3012, 1.523, 25.1, -0.12, 0.07118, 0.1443, 7842.36482, -2.211, -19, 0.08, 0.06128, 2.4998, 16171.05625, -0.688, 6, 0, 0.04516, 0.443, 8399.6791, -0.36, 3, 0, 0.04048, 5.771, 14286.15038, -0.61, 6, 0, 0.03747, 4.626, 1256.60391, -0.05, 0, 0, 0.03707, 3.415, 5957.45895, -2.13, -19, 0.1, 0.03649, 1.8, 23243.14376, 0.89, 31, -0.2, 0.02438, 0.042, 16029.08089, 3.07, 50, -0.2, 0.02165, 1.017, -1742.93051, -3.68, -44, 0.2, 0.01923, 3.097, 17285.6848, 3.02, 50, -0.3, 0.01692, 1.28, 0.3286, 1.52, 25, -0.1, 0.01361, 0.298, 8326.3902, 3.05, 50, -0.2, 0.01293, 4.013, 7072.0875, 1.58, 25, -0.1, 0.01276, 4.413, 8330.9926, 0, 0, 0, 0.0127, 0.101, 8470.6668, -2.24, -19, 0.1, 0.01097, 1.203, 22128.5152, -2.82, -13, 0, 0.01088, 2.545, 15542.7543, -0.66, 6, 0, 0.00835, 0.19, 7214.0629, -2.18, -19, 0.1, 0.00734, 4.855, 24499.7477, 0.83, 31, -0.2, 0.00686, 5.13, 13799.8238, -4.34, -38, 0.2, 0.00631, 0.93, -486.3266, -3.73, -44, 0, 0.00585, 0.699, 9585.2953, 1.5, 25, 0, 0.00566, 4.073, 8328.3391, 1.5, 25, 0, 0.00566, 0.638, 8329.0437, 1.5, 25, 0, 0.00539, 2.472, -1952.48, 0.6, 7, 0, 0.00509, 2.88, -0.7113, 0, 0, 0, 0.00469, 3.56, 30457.2066, -1.3, 12, 0, 0.00387, 0.78, -0.3523, 0, 0, 0, 0.00378, 1.84, 22614.8418, 0.9, 31, 0, 0.00362, 5.53, -695.8761, 0.6, 7, 0, 0.00317, 2.8, 16728.3705, 1.2, 28, 0, 0.00303, 6.07, 157.7344, 0, 0, 0, 0.003, 2.53, 33.757, -0.3, -4, 0, 0.00295, 4.16, 31571.8352, 2.4, 56, 0, 0.00289, 5.98, 7211.7617, -0.7, 6, 0, 0.00285, 2.06, 15540.4531, 0.9, 31, 0, 0.00283, 2.65, 2.6298, 0, 0, 0, 0.00282, 6.17, 15545.0555, -2.2, -19, 0, 0.00278, 1.23, -39.8149, 0, 0, 0, 0.00272, 3.82, 7216.3641, -3.7, -44, 0, 0.0027, 4.37, 70.9877, -1.9, -22, 0, 0.00256, 5.81, 13657.8484, -0.6, 6, 0, 0.00244, 5.64, -0.2237, 1.5, 25, 0, 0.0024, 2.96, 8311.7707, -2.2, -19, 0, 0.00239, 0.87, -33.7814, 0.3, 4, 0, 0.00216, 2.31, 15.9995, -2.2, -19, 0, 0.00186, 3.46, 5329.157, -2.1, -19, 0, 0.00169, 2.4, 24357.772, 4.6, 75, 0, 0.00161, 5.8, 8329.403, 1.5, 25, 0, 0.00161, 5.2, 8327.98, 1.5, 25, 0, 0.0016, 4.26, 23385.119, -2.9, -13, 0, 0.00156, 1.26, 550.755, 0, 0, 0, 0.00155, 1.25, 21500.213, -2.8, -13, 0, 0.00152, 0.6, -16.921, -3.7, -44, 0, 0.0015, 2.71, -79.63, 0, 0, 0, 0.0015, 5.29, 15.542, 0, 0, 0, 0.00148, 1.06, -2371.232, -3.7, -44, 0, 0.00141, 0.77, 8328.691, 1.5, 25, 0, 0.00141, 3.67, 7143.075, -0.3, 0, 0, 0.00138, 5.45, 25614.376, 4.5, 75, 0, 0.00129, 4.9, 23871.446, 0.9, 31, 0, 0.00126, 4.03, 141.975, -3.8, -44, 0, 0.00124, 6.01, 522.369, 0, 0, 0, 0.0012, 4.94, -10071.622, -5.2, -69, 0, 0.00118, 5.07, -15.419, -2.2, -19, 0, 0.00107, 3.49, 23452.693, -3.4, -20, 0, 0.00104, 4.78, 17495.234, -1.3, 0, 0, 0.00103, 1.44, -18.049, -2.2, -19, 0, 0.00102, 5.63, 15542.402, -0.7, 6, 0, 0.00102, 2.59, 15543.107, -0.7, 6, 0, 0.001, 4.11, -6.559, -1.9, -22, 0, 0.00097, 0.08, 15400.779, 3.1, 50, 0, 0.00096, 5.84, 31781.385, -1.9, 5, 0, 0.00094, 1.08, 8328.363, 0, 0, 0, 0.00094, 2.46, 16799.358, -0.7, 6, 0, 0.00094, 1.69, 6376.211, 2.2, 32, 0, 0.00093, 3.64, 8329.02, 3.0, 50, 0, 0.00093, 2.65, 16655.082, 4.6, 75, 0, 0.0009, 1.9, 15056.428, -4.4, -38, 0, 0.00089, 1.59, 52.969, 0, 0, 0, 0.00088, 2.02, -8257.704, -3.4, -47, 0, 0.00088, 3.02, 7213.711, -2.2, -19, 0, 0.00087, 0.5, 7214.415, -2.2, -19, 0, 0.00087, 0.49, 16659.684, 1.5, 25, 0, 0.00082, 5.64, -4.931, 1.5, 25, 0, 0.00079, 5.17, 13171.522, -4.3, -38, 0, 0.00076, 3.6, 29828.905, -1.3, 12, 0, 0.00076, 4.08, 24567.322, 0.3, 24, 0, 0.00076, 4.58, 1884.906, -0.1, 0, 0, 0.00073, 0.33, 31713.811, -1.4, 12, 0, 0.00073, 0.93, 32828.439, 2.4, 56, 0, 0.00071, 5.91, 38785.898, 0.2, 37, 0, 0.00069, 2.2, 15613.742, -2.5, -16, 0, 0.00066, 3.87, 15.732, -2.5, -23, 0, 0.00066, 0.86, 25823.926, 0.2, 24, 0, 0.00065, 2.52, 8170.957, 1.5, 25, 0, 0.00063, 0.18, 8322.132, -0.3, 0, 0, 0.0006, 5.84, 8326.062, 1.5, 25, 0, 0.0006, 5.15, 8331.321, 1.5, 25, 0, 0.0006, 2.18, 8486.426, 1.5, 25, 0, 0.00058, 2.3, -1.731, -4, -44, 0, 0.00058, 5.43, 14357.138, -2, -16, 0, 0.00057, 3.09, 8294.91, 2, 29, 0, 0.00057, 4.67, -8362.473, -1, -21, 0, 0.00056, 4.15, 16833.151, -1, 0, 0, 0.00054, 1.93, 7056.329, -2, -19, 0, 0.00054, 5.27, 8315.574, -2, -19, 0, 0.00052, 5.6, 8311.418, -2, -19, 0, 0.00052, 2.7, -77.552, 0, 0, 0, 0.00051, 4.3, 7230.984, 2, 25, 0, 0.0005, 0.4, -0.508, 0, 0, 0, 0.00049, 5.4, 7211.433, -2, -19, 0, 0.00049, 4.4, 7216.693, -2, -19, 0, 0.00049, 4.3, 16864.631, 0, 24, 0, 0.00049, 2.2, 16869.234, -3, -26, 0, 0.00047, 6.1, 627.596, 0, 0, 0, 0.00047, 5.0, 12.619, 1, 7, 0, 0.00045, 4.9, -8815.018, -5, -69, 0, 0.00044, 1.6, 62.133, -2, -19, 0, 0.00042, 2.9, -13.118, -4, -44, 0, 0.00042, 4.1, -119.445, 0, 0, 0, 0.00041, 4.3, 22756.817, -3, -13, 0, 0.00041, 3.6, 8288.877, 2, 25, 0, 0.0004, 0.5, 6663.308, -2, -19, 0, 0.0004, 1.1, 8368.506, 2, 25, 0, 0.00039, 4.1, 6443.786, 2, 25, 0, 0.00039, 3.1, 16657.383, 3, 50, 0, 0.00038, 0.1, 16657.031, 3, 50, 0, 0.00038, 3.0, 16657.735, 3, 50, 0, 0.00038, 4.6, 23942.433, -1, 9, 0, 0.00037, 4.3, 15385.02, -1, 6, 0, 0.00037, 5.0, 548.678, 0, 0, 0, 0.00036, 1.8, 7213.352, -2, -19, 0, 0.00036, 1.7, 7214.774, -2, -19, 0, 0.00035, 1.1, 7777.936, 2, 25, 0, 0.00035, 1.6, -8.86, 0, 0, 0, 0.00035, 4.4, 23869.145, 2, 56, 0, 0.00035, 2.0, 6691.693, -2, -19, 0, 0.00034, 1.3, -1185.616, -2, -22, 0, 0.00034, 2.2, 23873.747, -1, 6, 0, 0.00033, 2.0, -235.287, 0, 0, 0, 0.00033, 3.1, 17913.987, 3, 50, 0, 0.00033, 1.0, 8351.233, -2, -19, 0],
                [0.00487, 4.6693, 628.30196, -0.027, 0, -0.01, 0.00228, 2.6746, -2.3012, 1.523, 25, -0.12, 0.0015, 3.372, 6585.76091, -2.16, -19, 0.1, 0.0012, 5.728, 14914.45233, -0.64, 6, 0, 0.00108, 3.969, 7700.38947, 1.55, 25, -0.1, 0.0008, 0.742, 8956.99338, 1.5, 25, -0.1, 0.000254, 6.002, 0.3286, 1.52, 25, -0.1, 0.00021, 0.144, 7842.3648, -2.21, -19, 0, 0.00018, 2.5, 16171.0562, -0.7, 6, 0, 0.00013, 0.44, 8399.6791, -0.4, 3, 0, 0.000126, 5.03, 8326.3902, 3.0, 50, 0, 0.00012, 5.77, 14286.1504, -0.6, 6, 0, 0.000118, 5.96, 8330.9926, 0, 0, 0, 0.00011, 1.8, 23243.1438, 0.9, 31, 0, 0.00011, 3.42, 5957.459, -2.1, -19, 0, 0.00011, 4.63, 1256.6039, -0.1, 0, 0, 0.000099, 4.7, -0.7113, 0, 0, 0, 0.00007, 0.04, 16029.0809, 3.1, 50, 0, 0.00007, 5.14, 8328.3391, 1.5, 25, 0, 0.00007, 5.85, 8329.0437, 1.5, 25, 0, 0.00006, 1.02, -1742.9305, -3.7, -44, 0, 0.00006, 3.1, 17285.6848, 3.0, 50, 0, 0.000054, 5.69, -0.352, 0, 0, 0, 0.000043, 0.52, 15.542, 0, 0, 0, 0.000041, 2.03, 2.63, 0, 0, 0, 0.00004, 0.1, 8470.667, -2.2, -19, 0, 0.00004, 4.01, 7072.088, 1.6, 25, 0, 0.000036, 2.93, -8.86, -0.3, 0, 0, 0.00003, 1.2, 22128.515, -2.8, -13, 0, 0.00003, 2.54, 15542.754, -0.7, 6, 0, 0.000027, 4.43, 7211.762, -0.7, 6, 0, 0.000026, 0.51, 15540.453, 0.9, 31, 0, 0.000026, 1.44, 15545.055, -2.2, -19, 0, 0.000025, 5.37, 7216.364, -3.7, -44, 0],
                [0.000012, 1.041, -2.3012, 1.52, 25, -0.1, 0.0000017, 0.31, -0.711, 0, 0, 0]
            ],
            QI_KB: [1640650.479938, 15.218425, 1642476.703182, 15.21874996, 1683430.515601, 15.218750011, 1752157.640664, 15.218749978, 1807675.003759, 15.218620279, 1883627.765182, 15.218612292, 1907369.1281, 15.218449176, 1936603.140413, 15.218425, 1939145.52418, 15.218466998, 1947180.7983, 15.218524844, 1964362.041824, 15.218533526, 1987372.340971, 15.218513908, 1999653.819126, 15.218530782, 2007445.469786, 15.218535181, 2021324.917146, 15.218526248, 2047257.232342, 15.218519654, 2070282.898213, 15.218425, 2073204.87285, 15.218515221, 2080144.500926, 15.218530782, 2086703.688963, 15.218523776, 2110033.182763, 15.218425, 2111190.300888, 15.218425, 2113731.271005, 15.218515671, 2120670.840263, 15.218425, 2123973.309063, 15.218425, 2125068.997336, 15.218477932, 2136026.312633, 15.218472436, 2156099.495538, 15.218425, 2159021.324663, 15.218425, 2162308.575254, 15.218461742, 2178485.706538, 15.218425, 2178759.662849, 15.218445786, 2185334.0208, 15.218425, 2187525.481425, 15.218425, 2188621.191481, 15.218437494, 2322147.76],
            QB: _decode('FrcFs22AFsckF2tsDtFqEtF1posFdFgiFseFtmelpsEfhkF2anmelpFlF1ikrotcnEqEq2FfqmcDsrFor22FgFrcgDscFs22FgEeFtE2sfFs22sCoEsaF2tsD1FpeE2eFsssEciFsFnmelpFcFhkF2tcnEqEpFgkrotcnEqrEtFermcDsrE222FgBmcmr22DaEfnaF222sD1FpeForeF2tssEfiFpEoeFssD1iFstEqFppDgFstcnEqEpFg11FscnEqrAoAF2ClAEsDmDtCtBaDlAFbAEpAAAAAD2FgBiBqoBbnBaBoAAAAAAAEgDqAdBqAFrBaBoACdAAf1AACgAAAeBbCamDgEifAE2AABa1C1BgFdiAAACoCeE1ADiEifDaAEqAAFe1AcFbcAAAAAF1iFaAAACpACmFmAAAAAAAACrDaAAADG0'),
            SHUO_KB: [1457698.231017, 29.53067166, 1546082.512234, 29.53085106, 1640640.7353, 29.5306, 1642472.151543, 29.53085439, 1683430.5093, 29.53086148, 1752148.041079, 29.53085097, 1807665.420323, 29.53059851, 1883618.1141, 29.5306, 1907360.7047, 29.5306, 1936596.2249, 29.5306, 1939135.6753, 29.5306, 1947168.0],
            SB: _decode('EqoFscDcrFpmEsF2DfFideFelFpFfFfFiaipqti1ksttikptikqckstekqttgkqttgkqteksttikptikq2fjstgjqttjkqttgkqtekstfkptikq2tijstgjiFkirFsAeACoFsiDaDiADc1AFbBfgdfikijFifegF1FhaikgFag1E2btaieeibggiffdeigFfqDfaiBkF1kEaikhkigeidhhdiegcFfakF1ggkidbiaedksaFffckekidhhdhdikcikiakicjF1deedFhFccgicdekgiFbiaikcfi1kbFibefgEgFdcFkFeFkdcfkF1kfkcickEiFkDacFiEfbiaejcFfffkhkdgkaiei1ehigikhdFikfckF1dhhdikcfgjikhfjicjicgiehdikcikggcifgiejF1jkieFhegikggcikFegiegkfjebhigikggcikdgkaFkijcfkcikfkcifikiggkaeeigefkcdfcfkhkdgkegieidhijcFfakhfgeidieidiegikhfkfckfcjbdehdikggikgkfkicjicjF1dbidikFiggcifgiejkiegkigcdiegfggcikdbgfgefjF1kfegikggcikdgFkeeijcfkcikfkekcikdgkabhkFikaffcfkhkdgkegbiaekfkiakicjhfgqdq2fkiakgkfkhfkfcjiekgFebicggbedF1jikejbbbiakgbgkacgiejkijjgigfiakggfggcibFifjefjF1kfekdgjcibFeFkijcfkfhkfkeaieigekgbhkfikidfcjeaibgekgdkiffiffkiakF1jhbakgdki1dj1ikfkicjicjieeFkgdkicggkighdF1jfgkgfgbdkicggfggkidFkiekgijkeigfiskiggfaidheigF1jekijcikickiggkidhhdbgcfkFikikhkigeidieFikggikhkffaffijhidhhakgdkhkijF1kiakF1kfheakgdkifiggkigicjiejkieedikgdfcggkigieeiejfgkgkigbgikicggkiaideeijkefjeijikhkiggkiaidheigcikaikffikijgkiahi1hhdikgjfifaakekighie1hiaikggikhkffakicjhiahaikggikhkijF1kfejfeFhidikggiffiggkigicjiekgieeigikggiffiggkidheigkgfjkeigiegikifiggkidhedeijcfkFikikhkiggkidhh1ehigcikaffkhkiggkidhh1hhigikekfiFkFikcidhh1hitcikggikhkfkicjicghiediaikggikhkijbjfejfeFhaikggifikiggkigiejkikgkgieeigikggiffiggkigieeigekijcijikggifikiggkideedeijkefkfckikhkiggkidhh1ehijcikaffkhkiggkidhh1hhigikhkikFikfckcidhh1hiaikgjikhfjicjicgiehdikcikggifikigiejfejkieFhegikggifikiggfghigkfjeijkhigikggifikiggkigieeijcijcikfksikifikiggkidehdeijcfdckikhkiggkhghh1ehijikifffffkhsFngErD1pAfBoDd1BlEtFqA2AqoEpDqElAEsEeB2BmADlDkqBtC1FnEpDqnEmFsFsAFnllBbFmDsDiCtDmAB2BmtCgpEplCpAEiBiEoFqFtEqsDcCnFtADnFlEgdkEgmEtEsCtDmADqFtAFrAtEcCqAE1BoFqC1F1DrFtBmFtAC2ACnFaoCgADcADcCcFfoFtDlAFgmFqBq2bpEoAEmkqnEeCtAE1bAEqgDfFfCrgEcBrACfAAABqAAB1AAClEnFeCtCgAADqDoBmtAAACbFiAAADsEtBqAB2FsDqpFqEmFsCeDtFlCeDtoEpClEqAAFrAFoCgFmFsFqEnAEcCqFeCtFtEnAEeFtAAEkFnErAABbFkADnAAeCtFeAfBoAEpFtAABtFqAApDcCGJ'),
            nutationLon2: function (t) {
                var a = -1.742 * t;
                var t2 = t * t;
                var dl = 0;
                for (var i = 0, j = this.NUT_B.length; i < j; i += 5) {
                    dl += (this.NUT_B[i + 3] + a) * Math.sin(this.NUT_B[i] + this.NUT_B[i + 1] * t + this.NUT_B[i + 2] * t2);
                    a = 0;
                }
                return dl / 100 / this.SECOND_PER_RAD;
            },
            eLon: function (t, n) {
                t /= 10;
                var v = 0;
                var tn = 1;
                var n1;
                var n2;
                var m;
                var c;
                var pn = 1;
                var n0;
                var m0 = this.XL0[pn + 1] - this.XL0[pn];
                for (var i = 0; i < 6; i++, tn *= t) {
                    n1 = Math.floor(this.XL0[pn + i]);
                    n2 = Math.floor(this.XL0[pn + 1 + i]);
                    n0 = n2 - n1;
                    if (n0 === 0) {
                        continue;
                    }
                    if (n < 0) {
                        m = n2;
                    } else {
                        m = Math.floor((3 * n * n0) / m0 + 0.5 + n1);
                        if (i !== 0) {
                            m += 3;
                        }
                        if (m > n2) {
                            m = n2;
                        }
                    }
                    c = 0;
                    for (var j = n1; j < m; j += 3) {
                        c += this.XL0[j] * Math.cos(this.XL0[j + 1] + t * this.XL0[j + 2]);
                    }
                    v += c * tn;
                }
                v /= this.XL0[0];
                var t2 = t * t;
                v += (-0.0728 - 2.7702 * t - 1.1019 * t2 - 0.0996 * t2 * t) / this.SECOND_PER_RAD;
                return v;
            },
            mLon: function (t, n) {
                var ob = this.XL1;
                var obl = ob[0].length;
                var tn = 1;
                var v = 0;
                var j;
                var c;
                var t2 = t * t;
                var t3 = t2 * t;
                var t4 = t3 * t;
                var t5 = t4 * t;
                var tx = t - 10;
                v += (3.81034409 + 8399.684730072 * t - 3.319e-5 * t2 + 3.11e-8 * t3 - 2.033e-10 * t4) * this.SECOND_PER_RAD;
                v += 5028.792262 * t + 1.1124406 * t2 + 0.00007699 * t3 - 0.000023479 * t4 - 0.0000000178 * t5;
                if (tx > 0) {
                    v += -0.866 + 1.43 * tx + 0.054 * tx * tx;
                }
                t2 /= 1e4;
                t3 /= 1e8;
                t4 /= 1e8;

                n *= 6;
                if (n < 0) {
                    n = obl;
                }
                for (var i = 0, x = ob.length; i < x; i++, tn *= t) {
                    var f = ob[i];
                    var l = f.length;
                    var m = Math.floor((n * l) / obl + 0.5);
                    if (i > 0) {
                        m += 6;
                    }
                    if (m >= l) {
                        m = l;
                    }
                    for (j = 0, c = 0; j < m; j += 6) {
                        c += f[j] * Math.cos(f[j + 1] + t * f[j + 2] + t2 * f[j + 3] + t3 * f[j + 4] + t4 * f[j + 5]);
                    }
                    v += c * tn;
                }
                v /= this.SECOND_PER_RAD;
                return v;
            },
            gxcSunLon: function (t) {
                var t2 = t * t;
                var v = -0.043126 + 628.301955 * t - 0.000002732 * t2;
                var e = 0.016708634 - 0.000042037 * t - 0.0000001267 * t2;
                return (-20.49552 * (1 + e * Math.cos(v))) / this.SECOND_PER_RAD;
            },
            ev: function (t) {
                var f = 628.307585 * t;
                return 628.332 + 21 * Math.sin(1.527 + f) + 0.44 * Math.sin(1.48 + f * 2) + 0.129 * Math.sin(5.82 + f) * t + 0.00055 * Math.sin(4.21 + f) * t * t;
            },
            saLon: function (t, n) {
                return this.eLon(t, n) + this.nutationLon2(t) + this.gxcSunLon(t) + Math.PI;
            },
            dtExt: function (y, jsd) {
                var dy = (y - 1820) / 100;
                return -20 + jsd * dy * dy;
            },
            dtCalc: function (y) {
                var size = this.DT_AT.length;
                var y0 = this.DT_AT[size - 2];
                var t0 = this.DT_AT[size - 1];
                if (y >= y0) {
                    var jsd = 31;
                    if (y > y0 + 100) {
                        return this.dtExt(y, jsd);
                    }
                    return this.dtExt(y, jsd) - ((this.dtExt(y0, jsd) - t0) * (y0 + 100 - y)) / 100;
                }
                var i;
                for (i = 0; i < size; i += 5) {
                    if (y < this.DT_AT[i + 5]) {
                        break;
                    }
                }
                var t1 = ((y - this.DT_AT[i]) / (this.DT_AT[i + 5] - this.DT_AT[i])) * 10;
                var t2 = t1 * t1;
                var t3 = t2 * t1;
                return this.DT_AT[i + 1] + this.DT_AT[i + 2] * t1 + this.DT_AT[i + 3] * t2 + this.DT_AT[i + 4] * t3;
            },
            dtT: function (t) {
                return this.dtCalc(t / 365.2425 + 2000) / this.SECOND_PER_DAY;
            },
            mv: function (t) {
                var v = 8399.71 - 914 * Math.sin(0.7848 + 8328.691425 * t + 0.0001523 * t * t);
                v -= 179 * Math.sin(2.543 + 15542.7543 * t) + 160 * Math.sin(0.1874 + 7214.0629 * t) + 62 * Math.sin(3.14 + 16657.3828 * t) + 34 * Math.sin(4.827 + 16866.9323 * t) + 22 * Math.sin(4.9 + 23871.4457 * t) + 12 * Math.sin(2.59 + 14914.4523 * t) + 7 * Math.sin(0.23 + 6585.7609 * t) + 5 * Math.sin(0.9 + 25195.624 * t) + 5 * Math.sin(2.32 - 7700.3895 * t) + 5 * Math.sin(3.88 + 8956.9934 * t) + 5 * Math.sin(0.49 + 7771.3771 * t);
                return v;
            },
            saLonT: function (w) {
                var t;
                var v = 628.3319653318;
                t = (w - 1.75347 - Math.PI) / v;
                v = this.ev(t);
                t += (w - this.saLon(t, 10)) / v;
                v = this.ev(t);
                t += (w - this.saLon(t, -1)) / v;
                return t;
            },
            msaLon: function (t, mn, sn) {
                return this.mLon(t, mn) + -3.4e-6 - (this.eLon(t, sn) + this.gxcSunLon(t) + Math.PI);
            },
            msaLonT: function (w) {
                var t;
                var v = 7771.37714500204;
                t = (w + 1.08472) / v;
                t += (w - this.msaLon(t, 3, 3)) / v;
                v = this.mv(t) - this.ev(t);
                t += (w - this.msaLon(t, 20, 10)) / v;
                t += (w - this.msaLon(t, -1, 60)) / v;
                return t;
            },
            saLonT2: function (w) {
                var v = 628.3319653318;
                var t = (w - 1.75347 - Math.PI) / v;
                t -= (0.000005297 * t * t + 0.0334166 * Math.cos(4.669257 + 628.307585 * t) + 0.0002061 * Math.cos(2.67823 + 628.307585 * t) * t) / v;
                t += (w - ShouXingUtil.eLon(t, 8) - Math.PI + (20.5 + 17.2 * Math.sin(2.1824 - 33.75705 * t)) / this.SECOND_PER_RAD) / v;
                return t;
            },
            msaLonT2: function (w) {
                var t;
                var l;
                var v = 7771.37714500204;
                t = (w + 1.08472) / v;
                var t2 = t * t;
                t -= (-0.00003309 * t2 + 0.10976 * Math.cos(0.784758 + 8328.6914246 * t + 0.000152292 * t2) + 0.02224 * Math.cos(0.1874 + 7214.0628654 * t - 0.00021848 * t2) - 0.03342 * Math.cos(4.669257 + 628.307585 * t)) / v;
                t2 = t * t;
                l = this.mLon(t, 20) - (4.8950632 + 628.3319653318 * t + 0.000005297 * t2 + 0.0334166 * Math.cos(4.669257 + 628.307585 * t) + 0.0002061 * Math.cos(2.67823 + 628.307585 * t) * t + 0.000349 * Math.cos(4.6261 + 1256.61517 * t) - 20.5 / this.SECOND_PER_RAD);
                v = 7771.38 - 914 * Math.sin(0.7848 + 8328.691425 * t + 0.0001523 * t2) - 179 * Math.sin(2.543 + 15542.7543 * t) - 160 * Math.sin(0.1874 + 7214.0629 * t);
                t += (w - l) / v;
                return t;
            },
            qiHigh: function (w) {
                var t = this.saLonT2(w) * 36525;
                t = t - this.dtT(t) + this.ONE_THIRD;
                var v = ((t + 0.5) % 1) * this.SECOND_PER_DAY;
                if (v < 1200 || v > this.SECOND_PER_DAY - 1200) {
                    t = this.saLonT(w) * 36525 - this.dtT(t) + this.ONE_THIRD;
                }
                return t;
            },
            shuoHigh: function (w) {
                var t = this.msaLonT2(w) * 36525;
                t = t - this.dtT(t) + this.ONE_THIRD;
                var v = ((t + 0.5) % 1) * this.SECOND_PER_DAY;
                if (v < 1800 || v > this.SECOND_PER_DAY - 1800) {
                    t = this.msaLonT(w) * 36525 - this.dtT(t) + this.ONE_THIRD;
                }
                return t;
            },
            qiLow: function (w) {
                var v = 628.3319653318;
                var t = (w - 4.895062166) / v;
                t -= (53 * t * t + 334116 * Math.cos(4.67 + 628.307585 * t) + 2061 * Math.cos(2.678 + 628.3076 * t) * t) / v / 10000000;
                var n = 48950621.66 + 6283319653.318 * t + 53 * t * t + 334166 * Math.cos(4.669257 + 628.307585 * t) + 3489 * Math.cos(4.6261 + 1256.61517 * t) + 2060.6 * Math.cos(2.67823 + 628.307585 * t) * t - 994 - 834 * Math.sin(2.1824 - 33.75705 * t);
                t -= (n / 10000000 - w) / 628.332 + (32 * (t + 1.8) * (t + 1.8) - 20) / this.SECOND_PER_DAY / 36525;
                return t * 36525 + this.ONE_THIRD;
            },
            shuoLow: function (w) {
                var v = 7771.37714500204;
                var t = (w + 1.08472) / v;
                t -= (-0.0000331 * t * t + 0.10976 * Math.cos(0.785 + 8328.6914 * t) + 0.02224 * Math.cos(0.187 + 7214.0629 * t) - 0.03342 * Math.cos(4.669 + 628.3076 * t)) / v + (32 * (t + 1.8) * (t + 1.8) - 20) / this.SECOND_PER_DAY / 36525;
                return t * 36525 + this.ONE_THIRD;
            },
            calcShuo: function (jd) {
                var size = this.SHUO_KB.length;
                var d = 0;
                var pc = 14;
                var i;
                jd += Solar.J2000;
                var f1 = this.SHUO_KB[0] - pc,
                    f2 = this.SHUO_KB[size - 1] - pc,
                    f3 = 2436935;
                if (jd < f1 || jd >= f3) {
                    d = Math.floor(this.shuoHigh(Math.floor((jd + pc - 2451551) / 29.5306) * Math.PI * 2) + 0.5);
                } else if (jd >= f1 && jd < f2) {
                    for (i = 0; i < size; i += 2) {
                        if (jd + pc < this.SHUO_KB[i + 2]) {
                            break;
                        }
                    }
                    d = this.SHUO_KB[i] + this.SHUO_KB[i + 1] * Math.floor((jd + pc - this.SHUO_KB[i]) / this.SHUO_KB[i + 1]);
                    d = Math.floor(d + 0.5);
                    if (d === 1683460) {
                        d++;
                    }
                    d -= Solar.J2000;
                } else if (jd >= f2 && jd < f3) {
                    d = Math.floor(this.shuoLow(Math.floor((jd + pc - 2451551) / 29.5306) * Math.PI * 2) + 0.5);
                    var from = Math.floor((jd - f2) / 29.5306);
                    var n = this.SB.substr(from, 1);
                    if ('1' === n) {
                        d += 1;
                    } else if ('2' === n) {
                        d -= 1;
                    }
                }
                return d;
            },
            calcQi: function (jd) {
                var size = this.QI_KB.length;
                var d = 0;
                var pc = 7,
                    i;
                jd += Solar.J2000;
                var f1 = this.QI_KB[0] - pc,
                    f2 = this.QI_KB[size - 1] - pc,
                    f3 = 2436935;
                if (jd < f1 || jd >= f3) {
                    d = Math.floor(this.qiHigh((Math.floor(((jd + pc - 2451259) / 365.2422) * 24) * Math.PI) / 12) + 0.5);
                } else if (jd >= f1 && jd < f2) {
                    for (i = 0; i < size; i += 2) {
                        if (jd + pc < this.QI_KB[i + 2]) {
                            break;
                        }
                    }
                    d = this.QI_KB[i] + this.QI_KB[i + 1] * Math.floor((jd + pc - this.QI_KB[i]) / this.QI_KB[i + 1]);
                    d = Math.floor(d + 0.5);
                    if (d === 1683460) {
                        d++;
                    }
                    d -= Solar.J2000;
                } else if (jd >= f2 && jd < f3) {
                    d = Math.floor(this.qiLow((Math.floor(((jd + pc - 2451259) / 365.2422) * 24) * Math.PI) / 12) + 0.5);
                    var from = Math.floor(((jd - f2) / 365.2422) * 24);
                    var n = this.QB.substring(from, from + 1);
                    if ('1' === n) {
                        d += 1;
                    } else if ('2' === n) {
                        d -= 1;
                    }
                }
                return d;
            },
            qiAccurate: function (w) {
                var t = this.saLonT(w) * 36525;
                return t - this.dtT(t) + this.ONE_THIRD;
            },
            qiAccurate2: function (jd) {
                var d = Math.PI / 12;
                var w = Math.floor(((jd + 293) / 365.2422) * 24) * d;
                var a = this.qiAccurate(w);
                if (a - jd > 5) {
                    return this.qiAccurate(w - d);
                }
                if (a - jd < -5) {
                    return this.qiAccurate(w + d);
                }
                return a;
            }
        };
    })();
    var SolarUtil = (function () {
        return {
            WEEK: ['{w.sun}', '{w.mon}', '{w.tues}', '{w.wed}', '{w.thur}', '{w.fri}', '{w.sat}'],
            DAYS_OF_MONTH: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            FESTIVAL: {
                '1-1': '{jr.yuanDan}',
                '2-14': '{jr.qingRen}',
                '3-8': '{jr.fuNv}',
                '3-12': '{jr.zhiShu}',
                '3-15': '{jr.xiaoFei}',
                '4-1': '{jr.yuRen}',
                '5-1': '{jr.wuYi}',
                '5-4': '{jr.qingNian}',
                '6-1': '{jr.erTong}',
                '7-1': '{jr.jianDang}',
                '8-1': '{jr.jianJun}',
                '9-10': '{jr.jiaoShi}',
                '10-1': '{jr.guoQing}',
                '10-31': '{jr.wanShengYe}',
                '11-1': '{jr.wanSheng}',
                '12-24': '{jr.pingAn}',
                '12-25': '{jr.shengDan}'
            },
            XINGZUO: ['{xz.aries}', '{xz.taurus}', '{xz.gemini}', '{xz.cancer}', '{xz.leo}', '{xz.virgo}', '{xz.libra}', '{xz.scorpio}', '{xz.sagittarius}', '{xz.capricornus}', '{xz.aquarius}', '{xz.pisces}'],
            WEEK_FESTIVAL: {'3-0-1': '全国中小学生安全教育日', '5-2-0': '母亲节', '5-3-0': '全国助残日', '6-3-0': '父亲节', '9-3-6': '全民国防教育日', '10-1-1': '世界住房日', '11-4-4': '感恩节'},
            isLeapYear: function (year) {
                if (year < 1600) {
                    return year % 4 === 0;
                }
                return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
            },
            getDaysOfMonth: function (year, month) {
                var oy = year;
                var om = month;
                year *= 1;
                if (isNaN(year)) {
                    throw new Error('wrong solar year ' + oy);
                }
                month *= 1;
                if (isNaN(month)) {
                    throw new Error('wrong solar month ' + om);
                }
                if (1582 === year && 10 === month) {
                    return 21;
                }
                var m = month - 1;
                var d = this.DAYS_OF_MONTH[m];
                if (m === 1 && this.isLeapYear(year)) {
                    d++;
                }
                return d;
            },
            getDaysOfYear: function (year) {
                var oy = year;
                year *= 1;
                if (isNaN(year)) {
                    throw new Error('wrong solar year ' + oy);
                }
                if (1582 === year) {
                    return 355;
                }
                return this.isLeapYear(year) ? 366 : 365;
            },
            getDaysInYear: function (year, month, day) {
                var oy = year;
                var om = month;
                var od = day;
                year *= 1;
                if (isNaN(year)) {
                    throw new Error('wrong solar year ' + oy);
                }
                month *= 1;
                if (isNaN(month)) {
                    throw new Error('wrong solar month ' + om);
                }
                day *= 1;
                if (isNaN(day)) {
                    throw new Error('wrong solar day ' + od);
                }
                var days = 0;
                for (var i = 1; i < month; i++) {
                    days += this.getDaysOfMonth(year, i);
                }
                var d = day;
                if (1582 === year && 10 === month) {
                    if (day >= 15) {
                        d -= 10;
                    } else if (day > 4) {
                        throw new Error('wrong solar year ' + year + ' month ' + month + ' day ' + day);
                    }
                }
                days += d;
                return days;
            },
            getDaysBetween: function (ay, am, ad, by, bm, bd) {
                var oay = ay;
                var oam = am;
                var oad = ad;
                var oby = by;
                var obm = bm;
                var obd = bd;
                ay *= 1;
                if (isNaN(ay)) {
                    throw new Error('wrong solar year ' + oay);
                }
                am *= 1;
                if (isNaN(am)) {
                    throw new Error('wrong solar month ' + oam);
                }
                ad *= 1;
                if (isNaN(ad)) {
                    throw new Error('wrong solar day ' + oad);
                }
                by *= 1;
                if (isNaN(by)) {
                    throw new Error('wrong solar year ' + oby);
                }
                bm *= 1;
                if (isNaN(bm)) {
                    throw new Error('wrong solar month ' + obm);
                }
                bd *= 1;
                if (isNaN(bd)) {
                    throw new Error('wrong solar day ' + obd);
                }

                var n;
                var days;
                var i;
                if (ay === by) {
                    n = this.getDaysInYear(by, bm, bd) - this.getDaysInYear(ay, am, ad);
                } else if (ay > by) {
                    days = this.getDaysOfYear(by) - this.getDaysInYear(by, bm, bd);
                    for (i = by + 1; i < ay; i++) {
                        days += this.getDaysOfYear(i);
                    }
                    days += this.getDaysInYear(ay, am, ad);
                    n = -days;
                } else {
                    days = this.getDaysOfYear(ay) - this.getDaysInYear(ay, am, ad);
                    for (i = ay + 1; i < by; i++) {
                        days += this.getDaysOfYear(i);
                    }
                    days += this.getDaysInYear(by, bm, bd);
                    n = days;
                }
                return n;
            }
        };
    })();
    var LunarUtil = (function () {
        return {
            BASE_MONTH_ZHI_INDEX: 2,
            JIE_QI: ['{jq.dongZhi}', '{jq.xiaoHan}', '{jq.daHan}', '{jq.liChun}', '{jq.yuShui}', '{jq.jingZhe}', '{jq.chunFen}', '{jq.qingMing}', '{jq.guYu}', '{jq.liXia}', '{jq.xiaoMan}', '{jq.mangZhong}', '{jq.xiaZhi}', '{jq.xiaoShu}', '{jq.daShu}', '{jq.liQiu}', '{jq.chuShu}', '{jq.baiLu}', '{jq.qiuFen}', '{jq.hanLu}', '{jq.shuangJiang}', '{jq.liDong}', '{jq.xiaoXue}', '{jq.daXue}'],
            JIE_QI_IN_USE: ['DA_XUE', '{jq.dongZhi}', '{jq.xiaoHan}', '{jq.daHan}', '{jq.liChun}', '{jq.yuShui}', '{jq.jingZhe}', '{jq.chunFen}', '{jq.qingMing}', '{jq.guYu}', '{jq.liXia}', '{jq.xiaoMan}', '{jq.mangZhong}', '{jq.xiaZhi}', '{jq.xiaoShu}', '{jq.daShu}', '{jq.liQiu}', '{jq.chuShu}', '{jq.baiLu}', '{jq.qiuFen}', '{jq.hanLu}', '{jq.shuangJiang}', '{jq.liDong}', '{jq.xiaoXue}', '{jq.daXue}', 'DONG_ZHI', 'XIAO_HAN', 'DA_HAN', 'LI_CHUN', 'YU_SHUI', 'JING_ZHE'],

            MONTH_ZHI: ['', '{dz.yin}', '{dz.mao}', '{dz.chen}', '{dz.si}', '{dz.wu}', '{dz.wei}', '{dz.shen}', '{dz.you}', '{dz.xu}', '{dz.hai}', '{dz.zi}', '{dz.chou}'],
            CHANG_SHENG: ['{ds.changSheng}', '{ds.muYu}', '{ds.guanDai}', '{ds.linGuan}', '{ds.diWang}', '{ds.shuai}', '{ds.bing}', '{ds.si}', '{ds.mu}', '{ds.jue}', '{ds.tai}', '{ds.yang}'],
            XUN: ['{jz.jiaZi}', '{jz.jiaXu}', '{jz.jiaShen}', '{jz.jiaWu}', '{jz.jiaChen}', '{jz.jiaYin}'],
            XUN_KONG: ['{dz.xu}{dz.hai}', '{dz.shen}{dz.you}', '{dz.wu}{dz.wei}', '{dz.chen}{dz.si}', '{dz.yin}{dz.mao}', '{dz.zi}{dz.chou}'],
            GAN: ['', '{tg.jia}', '{tg.yi}', '{tg.bing}', '{tg.ding}', '{tg.wu}', '{tg.ji}', '{tg.geng}', '{tg.xin}', '{tg.ren}', '{tg.gui}'],

            POSITION_GAN: ['{bg.zhen}', '{bg.zhen}', '{bg.li}', '{bg.li}', '{ps.center}', '{ps.center}', '{bg.dui}', '{bg.dui}', '{bg.kan}', '{bg.kan}'],
            POSITION_ZHI: ['{bg.kan}', '{ps.center}', '{bg.zhen}', '{bg.zhen}', '{ps.center}', '{bg.li}', '{bg.li}', '{ps.center}', '{bg.dui}', '{bg.dui}', '{ps.center}', '{bg.kan}'],
            POSITION_TAI_DAY: ['{ts.zhan}{ts.men}{ts.dui} {ps.wai}{ps.dongNan}', '{ts.dui}{ts.mo}{ts.ce} {ps.wai}{ps.dongNan}', '{ts.chu}{ts.zao}{ts.lu} {ps.wai}{ps.zhengNan}', '{ts.cangKu}{ts.men} {ps.wai}{ps.zhengNan}', '{ts.fang}{ts.chuang}{ts.xi} {ps.wai}{ps.zhengNan}', '{ts.zhan}{ts.men}{ts.chuang} {ps.wai}{ps.zhengNan}', '{ts.zhan}{ts.dui}{ts.mo} {ps.wai}{ps.zhengNan}', '{ts.chu}{ts.zao}{ts.ce} {ps.wai}{ps.xiNan}', '{ts.cangKu}{ts.lu} {ps.wai}{ps.xiNan}', '{ts.fang}{ts.chuang}{ts.men} {ps.wai}{ps.xiNan}', '{ts.zhan}{ts.men}{ts.xi} {ps.wai}{ps.xiNan}', '{ts.dui}{ts.mo}{ts.chuang} {ps.wai}{ps.xiNan}', '{ts.chu}{ts.zao}{ts.dui} {ps.wai}{ps.xiNan}', '{ts.cangKu}{ts.ce} {ps.wai}{ps.zhengXi}', '{ts.fang}{ts.chuang}{ts.lu} {ps.wai}{ps.zhengXi}', '{ts.zhan}{ts.daMen} {ps.wai}{ps.zhengXi}', '{ts.dui}{ts.mo}{ts.xi} {ps.wai}{ps.zhengXi}', '{ts.chu}{ts.zao}{ts.chuang} {ps.wai}{ps.zhengXi}', '{ts.cangKu}{ts.dui} {ps.wai}{ps.xiBei}', '{ts.fang}{ts.chuang}{ts.ce} {ps.wai}{ps.xiBei}', '{ts.zhan}{ts.men}{ts.lu} {ps.wai}{ps.xiBei}', '{ts.dui}{ts.mo}{ts.men} {ps.wai}{ps.xiBei}', '{ts.chu}{ts.zao}{ts.xi} {ps.wai}{ps.xiBei}', '{ts.cangKu}{ts.chuang} {ps.wai}{ps.xiBei}', '{ts.fang}{ts.chuang}{ts.dui} {ps.wai}{ps.zhengBei}', '{ts.zhan}{ts.men}{ts.ce} {ps.wai}{ps.zhengBei}', '{ts.dui}{ts.mo}{ts.lu} {ps.wai}{ps.zhengBei}', '{ts.chu}{ts.zao}{ts.men} {ps.wai}{ps.zhengBei}', '{ts.cangKu}{ts.xi} {ps.wai}{ps.zhengBei}', '{ts.zhan}{ts.fang}{ts.chuang} {ps.fangNei}{ps.bei}', '{ts.zhan}{ts.men}{ts.dui} {ps.fangNei}{ps.bei}', '{ts.dui}{ts.mo}{ts.ce} {ps.fangNei}{ps.bei}', '{ts.chu}{ts.zao}{ts.lu} {ps.fangNei}{ps.bei}', '{ts.cangKu}{ts.men} {ps.fangNei}{ps.bei}', '{ts.fang}{ts.chuang}{ts.xi} {ps.fangNei}{ps.center}', '{ts.zhan}{ts.men}{ts.chuang} {ps.fangNei}{ps.center}', '{ts.zhan}{ts.dui}{ts.mo} {ps.fangNei}{ps.nan}', '{ts.chu}{ts.zao}{ts.ce} {ps.fangNei}{ps.nan}', '{ts.cangKu}{ts.lu} {ps.fangNei}{ps.nan}', '{ts.fang}{ts.chuang}{ts.men} {ps.fangNei}{ps.xi}', '{ts.zhan}{ts.men}{ts.xi} {ps.fangNei}{ps.dong}', '{ts.dui}{ts.mo}{ts.chuang} {ps.fangNei}{ps.dong}', '{ts.chu}{ts.zao}{ts.dui} {ps.fangNei}{ps.dong}', '{ts.cangKu}{ts.ce} {ps.fangNei}{ps.dong}', '{ts.fang}{ts.chuang}{ts.lu} {ps.fangNei}{ps.center}', '{ts.zhan}{ts.daMen} {ps.wai}{ps.dongBei}', '{ts.dui}{ts.mo}{ts.xi} {ps.wai}{ps.dongBei}', '{ts.chu}{ts.zao}{ts.chuang} {ps.wai}{ps.dongBei}', '{ts.cangKu}{ts.dui} {ps.wai}{ps.dongBei}', '{ts.fang}{ts.chuang}{ts.ce} {ps.wai}{ps.dongBei}', '{ts.zhan}{ts.men}{ts.lu} {ps.wai}{ps.dongBei}', '{ts.dui}{ts.mo}{ts.men} {ps.wai}{ps.zhengDong}', '{ts.chu}{ts.zao}{ts.xi} {ps.wai}{ps.zhengDong}', '{ts.cangKu}{ts.chuang} {ps.wai}{ps.zhengDong}', '{ts.fang}{ts.chuang}{ts.dui} {ps.wai}{ps.zhengDong}', '{ts.zhan}{ts.men}{ts.ce} {ps.wai}{ps.zhengDong}', '{ts.dui}{ts.mo}{ts.lu} {ps.wai}{ps.dongNan}', '{ts.chu}{ts.zao}{ts.men} {ps.wai}{ps.dongNan}', '{ts.cangKu}{ts.xi} {ps.wai}{ps.dongNan}', '{ts.zhan}{ts.fang}{ts.chuang} {ps.wai}{ps.dongNan}'],
            POSITION_TAI_MONTH: ['{ts.zhan}{ts.fang}{ts.chuang}', '{ts.zhan}{ts.hu}{ts.win}', '{ts.zhan}{ts.men}{ts.tang}', '{ts.zhan}{ts.chu}{ts.zao}', '{ts.zhan}{ts.fang}{ts.chuang}', '{ts.zhan}{ts.chuang}{ts.cang}', '{ts.zhan}{ts.dui}{ts.mo}', '{ts.zhan}{ts.ce}{ts.hu}', '{ts.zhan}{ts.men}{ts.fang}', '{ts.zhan}{ts.fang}{ts.chuang}', '{ts.zhan}{ts.zao}{ts.lu}', '{ts.zhan}{ts.fang}{ts.chuang}'],
            ZHI: ['', '{dz.zi}', '{dz.chou}', '{dz.yin}', '{dz.mao}', '{dz.chen}', '{dz.si}', '{dz.wu}', '{dz.wei}', '{dz.shen}', '{dz.you}', '{dz.xu}', '{dz.hai}'],
            ZHI_XING: ['', '{zx.jian}', '{zx.chu}', '{zx.man}', '{zx.ping}', '{zx.ding}', '{zx.zhi}', '{zx.po}', '{zx.wei}', '{zx.cheng}', '{zx.shou}', '{zx.kai}', '{zx.bi}'],
            JIA_ZI: ['{jz.jiaZi}', '{jz.yiChou}', '{jz.bingYin}', '{jz.dingMao}', '{jz.wuChen}', '{jz.jiSi}', '{jz.gengWu}', '{jz.xinWei}', '{jz.renShen}', '{jz.guiYou}', '{jz.jiaXu}', '{jz.yiHai}', '{jz.bingZi}', '{jz.dingChou}', '{jz.wuYin}', '{jz.jiMao}', '{jz.gengChen}', '{jz.xinSi}', '{jz.renWu}', '{jz.guiWei}', '{jz.jiaShen}', '{jz.yiYou}', '{jz.bingXu}', '{jz.dingHai}', '{jz.wuZi}', '{jz.jiChou}', '{jz.gengYin}', '{jz.xinMao}', '{jz.renChen}', '{jz.guiSi}', '{jz.jiaWu}', '{jz.yiWei}', '{jz.bingShen}', '{jz.dingYou}', '{jz.wuXu}', '{jz.jiHai}', '{jz.gengZi}', '{jz.xinChou}', '{jz.renYin}', '{jz.guiMao}', '{jz.jiaChen}', '{jz.yiSi}', '{jz.bingWu}', '{jz.dingWei}', '{jz.wuShen}', '{jz.jiYou}', '{jz.gengXu}', '{jz.xinHai}', '{jz.renZi}', '{jz.guiChou}', '{jz.jiaYin}', '{jz.yiMao}', '{jz.bingChen}', '{jz.dingSi}', '{jz.wuWu}', '{jz.jiWei}', '{jz.gengShen}', '{jz.xinYou}', '{jz.renXu}', '{jz.guiHai}'],

            NUMBER: ['{n.zero}', '{n.one}', '{n.two}', '{n.three}', '{n.four}', '{n.five}', '{n.six}', '{n.seven}', '{n.eight}', '{n.nine}', '{n.ten}', '{n.eleven}', '{n.twelve}'],
            MONTH: ['', '{m.one}', '{m.two}', '{m.three}', '{m.four}', '{m.five}', '{m.six}', '{m.seven}', '{m.eight}', '{m.nine}', '{m.ten}', '{m.eleven}', '{m.twelve}'],
            SEASON: ['', '{od.first}{sz.chun}', '{od.second}{sz.chun}', '{od.third}{sz.chun}', '{od.first}{sz.xia}', '{od.second}{sz.xia}', '{od.third}{sz.xia}', '{od.first}{sz.qiu}', '{od.second}{sz.qiu}', '{od.third}{sz.qiu}', '{od.first}{sz.dong}', '{od.second}{sz.dong}', '{od.third}{sz.dong}'],
            SHENGXIAO: ['', '{sx.rat}', '{sx.ox}', '{sx.tiger}', '{sx.rabbit}', '{sx.dragon}', '{sx.snake}', '{sx.horse}', '{sx.goat}', '{sx.monkey}', '{sx.rooster}', '{sx.dog}', '{sx.pig}'],
            DAY: ['', '{d.one}', '{d.two}', '{d.three}', '{d.four}', '{d.five}', '{d.six}', '{d.seven}', '{d.eight}', '{d.nine}', '{d.ten}', '{d.eleven}', '{d.twelve}', '{d.thirteen}', '{d.fourteen}', '{d.fifteen}', '{d.sixteen}', '{d.seventeen}', '{d.eighteen}', '{d.nighteen}', '{d.twenty}', '{d.twentyOne}', '{d.twentyTwo}', '{d.twentyThree}', '{d.twentyFour}', '{d.twentyFive}', '{d.twentySix}', '{d.twentySeven}', '{d.twentyEight}', '{d.twentyNine}', '{d.thirty}'],

            CHONG: ['{dz.wu}', '{dz.wei}', '{dz.shen}', '{dz.you}', '{dz.xu}', '{dz.hai}', '{dz.zi}', '{dz.chou}', '{dz.yin}', '{dz.mao}', '{dz.chen}', '{dz.si}'],
            CHONG_GAN: ['{tg.wu}', '{tg.ji}', '{tg.geng}', '{tg.xin}', '{tg.ren}', '{tg.gui}', '{tg.jia}', '{tg.yi}', '{tg.bing}', '{tg.ding}'],
            CHONG_GAN_TIE: ['{tg.ji}', '{tg.wu}', '{tg.xin}', '{tg.geng}', '{tg.gui}', '{tg.ren}', '{tg.yi}', '{tg.jia}', '{tg.ding}', '{tg.bing}'],
            CHONG_GAN_4: ['{tg.geng}', '{tg.xin}', '{tg.ren}', '{tg.gui}', '', '', '{tg.jia}', '{tg.yi}', '{tg.bing}', '{tg.ding}'],
            HE_GAN_5: ['{tg.ji}', '{tg.geng}', '{tg.xin}', '{tg.ren}', '{tg.gui}', '{tg.jia}', '{tg.yi}', '{tg.bing}', '{tg.ding}', '{tg.wu}'],
            HE_ZHI_6: ['{dz.chou}', '{dz.zi}', '{dz.hai}', '{dz.xu}', '{dz.you}', '{dz.shen}', '{dz.wei}', '{dz.wu}', '{dz.si}', '{dz.chen}', '{dz.mao}', '{dz.yin}'],

            NAYIN: {
                '{jz.jiaZi}': '{ny.haiZhong}{wx.jin}',
                '{jz.jiaWu}': '{ny.shaZhong}{wx.jin}',
                '{jz.bingYin}': '{ny.luZhong}{wx.huo}',
                '{jz.bingShen}': '{ny.shanXia}{wx.huo}',
                '{jz.wuChen}': '{ny.daLin}{wx.mu}',
                '{jz.wuXu}': '{ny.pingDi}{wx.mu}',
                '{jz.gengWu}': '{ny.luPang}{wx.tu}',
                '{jz.gengZi}': '{ny.biShang}{wx.tu}',
                '{jz.renShen}': '{ny.jianFeng}{wx.jin}',
                '{jz.renYin}': '{ny.jinBo}{wx.jin}',
                '{jz.jiaXu}': '{ny.shanTou}{wx.huo}',
                '{jz.jiaChen}': '{ny.fuDeng}{wx.huo}',
                '{jz.bingZi}': '{ny.jianXia}{wx.shui}',
                '{jz.bingWu}': '{ny.tianHe}{wx.shui}',
                '{jz.wuYin}': '{ny.chengTou}{wx.tu}',
                '{jz.wuShen}': '{ny.daYi}{wx.tu}',
                '{jz.gengChen}': '{ny.baiLa}{wx.jin}',
                '{jz.gengXu}': '{ny.chaiChuan}{wx.jin}',
                '{jz.renWu}': '{ny.yangLiu}{wx.mu}',
                '{jz.renZi}': '{ny.sangZhe}{wx.mu}',
                '{jz.jiaShen}': '{ny.quanZhong}{wx.shui}',
                '{jz.jiaYin}': '{ny.daXi}{wx.shui}',
                '{jz.bingXu}': '{ny.wuShang}{wx.tu}',
                '{jz.bingChen}': '{ny.shaZhong}{wx.tu}',
                '{jz.wuZi}': '{ny.piLi}{wx.huo}',
                '{jz.wuWu}': '{ny.tianShang}{wx.huo}',
                '{jz.gengYin}': '{ny.songBo}{wx.mu}',
                '{jz.gengShen}': '{ny.shiLiu}{wx.mu}',
                '{jz.renChen}': '{ny.changLiu}{wx.shui}',
                '{jz.renXu}': '{ny.daHai}{wx.shui}',
                '{jz.yiChou}': '{ny.haiZhong}{wx.jin}',
                '{jz.yiWei}': '{ny.shaZhong}{wx.jin}',
                '{jz.dingMao}': '{ny.luZhong}{wx.huo}',
                '{jz.dingYou}': '{ny.shanXia}{wx.huo}',
                '{jz.jiSi}': '{ny.daLin}{wx.mu}',
                '{jz.jiHai}': '{ny.pingDi}{wx.mu}',
                '{jz.xinWei}': '{ny.luPang}{wx.tu}',
                '{jz.xinChou}': '{ny.biShang}{wx.tu}',
                '{jz.guiYou}': '{ny.jianFeng}{wx.jin}',
                '{jz.guiMao}': '{ny.jinBo}{wx.jin}',
                '{jz.yiHai}': '{ny.shanTou}{wx.huo}',
                '{jz.yiSi}': '{ny.fuDeng}{wx.huo}',
                '{jz.dingChou}': '{ny.jianXia}{wx.shui}',
                '{jz.dingWei}': '{ny.tianHe}{wx.shui}',
                '{jz.jiMao}': '{ny.chengTou}{wx.tu}',
                '{jz.jiYou}': '{ny.daYi}{wx.tu}',
                '{jz.xinSi}': '{ny.baiLa}{wx.jin}',
                '{jz.xinHai}': '{ny.chaiChuan}{wx.jin}',
                '{jz.guiWei}': '{ny.yangLiu}{wx.mu}',
                '{jz.guiChou}': '{ny.sangZhe}{wx.mu}',
                '{jz.yiYou}': '{ny.quanZhong}{wx.shui}',
                '{jz.yiMao}': '{ny.daXi}{wx.shui}',
                '{jz.dingHai}': '{ny.wuShang}{wx.tu}',
                '{jz.dingSi}': '{ny.shaZhong}{wx.tu}',
                '{jz.jiChou}': '{ny.piLi}{wx.huo}',
                '{jz.jiWei}': '{ny.tianShang}{wx.huo}',
                '{jz.xinMao}': '{ny.songBo}{wx.mu}',
                '{jz.xinYou}': '{ny.shiLiu}{wx.mu}',
                '{jz.guiSi}': '{ny.changLiu}{wx.shui}',
                '{jz.guiHai}': '{ny.daHai}{wx.shui}'
            },
            WU_XING_GAN: {
                '{tg.jia}': '{wx.mu}',
                '{tg.yi}': '{wx.mu}',
                '{tg.bing}': '{wx.huo}',
                '{tg.ding}': '{wx.huo}',
                '{tg.wu}': '{wx.tu}',
                '{tg.ji}': '{wx.tu}',
                '{tg.geng}': '{wx.jin}',
                '{tg.xin}': '{wx.jin}',
                '{tg.ren}': '{wx.shui}',
                '{tg.gui}': '{wx.shui}'
            },
            WU_XING_ZHI: {
                '{dz.yin}': '{wx.mu}',
                '{dz.mao}': '{wx.mu}',
                '{dz.si}': '{wx.huo}',
                '{dz.wu}': '{wx.huo}',
                '{dz.chen}': '{wx.tu}',
                '{dz.chou}': '{wx.tu}',
                '{dz.xu}': '{wx.tu}',
                '{dz.wei}': '{wx.tu}',
                '{dz.shen}': '{wx.jin}',
                '{dz.you}': '{wx.jin}',
                '{dz.hai}': '{wx.shui}',
                '{dz.zi}': '{wx.shui}'
            },
            SHI_SHEN_GAN: {
                '{tg.jia}{tg.jia}': '{ss.biJian}',
                '{tg.jia}{tg.yi}': '{ss.jieCai}',
                '{tg.jia}{tg.bing}': '{ss.shiShen}',
                '{tg.jia}{tg.ding}': '{ss.shangGuan}',
                '{tg.jia}{tg.wu}': '{ss.pianCai}',
                '{tg.jia}{tg.ji}': '{ss.zhengCai}',
                '{tg.jia}{tg.geng}': '{ss.qiSha}',
                '{tg.jia}{tg.xin}': '{ss.zhengGuan}',
                '{tg.jia}{tg.ren}': '{ss.pianYin}',
                '{tg.jia}{tg.gui}': '{ss.zhengYin}',
                '{tg.yi}{tg.yi}': '{ss.biJian}',
                '{tg.yi}{tg.jia}': '{ss.jieCai}',
                '{tg.yi}{tg.ding}': '{ss.shiShen}',
                '{tg.yi}{tg.bing}': '{ss.shangGuan}',
                '{tg.yi}{tg.ji}': '{ss.pianCai}',
                '{tg.yi}{tg.wu}': '{ss.zhengCai}',
                '{tg.yi}{tg.xin}': '{ss.qiSha}',
                '{tg.yi}{tg.geng}': '{ss.zhengGuan}',
                '{tg.yi}{tg.gui}': '{ss.pianYin}',
                '{tg.yi}{tg.ren}': '{ss.zhengYin}',
                '{tg.bing}{tg.bing}': '{ss.biJian}',
                '{tg.bing}{tg.ding}': '{ss.jieCai}',
                '{tg.bing}{tg.wu}': '{ss.shiShen}',
                '{tg.bing}{tg.ji}': '{ss.shangGuan}',
                '{tg.bing}{tg.geng}': '{ss.pianCai}',
                '{tg.bing}{tg.xin}': '{ss.zhengCai}',
                '{tg.bing}{tg.ren}': '{ss.qiSha}',
                '{tg.bing}{tg.gui}': '{ss.zhengGuan}',
                '{tg.bing}{tg.jia}': '{ss.pianYin}',
                '{tg.bing}{tg.yi}': '{ss.zhengYin}',
                '{tg.ding}{tg.ding}': '{ss.biJian}',
                '{tg.ding}{tg.bing}': '{ss.jieCai}',
                '{tg.ding}{tg.ji}': '{ss.shiShen}',
                '{tg.ding}{tg.wu}': '{ss.shangGuan}',
                '{tg.ding}{tg.xin}': '{ss.pianCai}',
                '{tg.ding}{tg.geng}': '{ss.zhengCai}',
                '{tg.ding}{tg.gui}': '{ss.qiSha}',
                '{tg.ding}{tg.ren}': '{ss.zhengGuan}',
                '{tg.ding}{tg.yi}': '{ss.pianYin}',
                '{tg.ding}{tg.jia}': '{ss.zhengYin}',
                '{tg.wu}{tg.wu}': '{ss.biJian}',
                '{tg.wu}{tg.ji}': '{ss.jieCai}',
                '{tg.wu}{tg.geng}': '{ss.shiShen}',
                '{tg.wu}{tg.xin}': '{ss.shangGuan}',
                '{tg.wu}{tg.ren}': '{ss.pianCai}',
                '{tg.wu}{tg.gui}': '{ss.zhengCai}',
                '{tg.wu}{tg.jia}': '{ss.qiSha}',
                '{tg.wu}{tg.yi}': '{ss.zhengGuan}',
                '{tg.wu}{tg.bing}': '{ss.pianYin}',
                '{tg.wu}{tg.ding}': '{ss.zhengYin}',
                '{tg.ji}{tg.ji}': '{ss.biJian}',
                '{tg.ji}{tg.wu}': '{ss.jieCai}',
                '{tg.ji}{tg.xin}': '{ss.shiShen}',
                '{tg.ji}{tg.geng}': '{ss.shangGuan}',
                '{tg.ji}{tg.gui}': '{ss.pianCai}',
                '{tg.ji}{tg.ren}': '{ss.zhengCai}',
                '{tg.ji}{tg.yi}': '{ss.qiSha}',
                '{tg.ji}{tg.jia}': '{ss.zhengGuan}',
                '{tg.ji}{tg.ding}': '{ss.pianYin}',
                '{tg.ji}{tg.bing}': '{ss.zhengYin}',
                '{tg.geng}{tg.geng}': '{ss.biJian}',
                '{tg.geng}{tg.xin}': '{ss.jieCai}',
                '{tg.geng}{tg.ren}': '{ss.shiShen}',
                '{tg.geng}{tg.gui}': '{ss.shangGuan}',
                '{tg.geng}{tg.jia}': '{ss.pianCai}',
                '{tg.geng}{tg.yi}': '{ss.zhengCai}',
                '{tg.geng}{tg.bing}': '{ss.qiSha}',
                '{tg.geng}{tg.ding}': '{ss.zhengGuan}',
                '{tg.geng}{tg.wu}': '{ss.pianYin}',
                '{tg.geng}{tg.ji}': '{ss.zhengYin}',
                '{tg.xin}{tg.xin}': '{ss.biJian}',
                '{tg.xin}{tg.geng}': '{ss.jieCai}',
                '{tg.xin}{tg.gui}': '{ss.shiShen}',
                '{tg.xin}{tg.ren}': '{ss.shangGuan}',
                '{tg.xin}{tg.yi}': '{ss.pianCai}',
                '{tg.xin}{tg.jia}': '{ss.zhengCai}',
                '{tg.xin}{tg.ding}': '{ss.qiSha}',
                '{tg.xin}{tg.bing}': '{ss.zhengGuan}',
                '{tg.xin}{tg.ji}': '{ss.pianYin}',
                '{tg.xin}{tg.wu}': '{ss.zhengYin}',
                '{tg.ren}{tg.ren}': '{ss.biJian}',
                '{tg.ren}{tg.gui}': '{ss.jieCai}',
                '{tg.ren}{tg.jia}': '{ss.shiShen}',
                '{tg.ren}{tg.yi}': '{ss.shangGuan}',
                '{tg.ren}{tg.bing}': '{ss.pianCai}',
                '{tg.ren}{tg.ding}': '{ss.zhengCai}',
                '{tg.ren}{tg.wu}': '{ss.qiSha}',
                '{tg.ren}{tg.ji}': '{ss.zhengGuan}',
                '{tg.ren}{tg.geng}': '{ss.pianYin}',
                '{tg.ren}{tg.xin}': '{ss.zhengYin}',
                '{tg.gui}{tg.gui}': '{ss.biJian}',
                '{tg.gui}{tg.ren}': '{ss.jieCai}',
                '{tg.gui}{tg.yi}': '{ss.shiShen}',
                '{tg.gui}{tg.jia}': '{ss.shangGuan}',
                '{tg.gui}{tg.ding}': '{ss.pianCai}',
                '{tg.gui}{tg.bing}': '{ss.zhengCai}',
                '{tg.gui}{tg.ji}': '{ss.qiSha}',
                '{tg.gui}{tg.wu}': '{ss.zhengGuan}',
                '{tg.gui}{tg.xin}': '{ss.pianYin}',
                '{tg.gui}{tg.geng}': '{ss.zhengYin}'
            },
            SHI_SHEN_ZHI: {
                '{tg.jia}{tg.gui}': '{ss.zhengYin}',
                '{tg.jia}{tg.ji}': '{ss.zhengCai}',
                '{tg.jia}{tg.xin}': '{ss.zhengGuan}',
                '{tg.jia}{tg.bing}': '{ss.shiShen}',
                '{tg.jia}{tg.jia}': '{ss.biJian}',
                '{tg.jia}{tg.wu}': '{ss.pianCai}',
                '{tg.jia}{tg.yi}': '{ss.jieCai}',
                '{tg.jia}{tg.geng}': '{ss.qiSha}',
                '{tg.jia}{tg.ding}': '{ss.shangGuan}',
                '{tg.jia}{tg.ren}': '{ss.pianYin}',
                '{tg.yi}{tg.gui}': '{ss.pianYin}',
                '{tg.yi}{tg.ji}': '{ss.pianCai}',
                '{tg.yi}{tg.xin}': '{ss.qiSha}',
                '{tg.yi}{tg.bing}': '{ss.shangGuan}',
                '{tg.yi}{tg.jia}': '{ss.jieCai}',
                '{tg.yi}{tg.wu}': '{ss.zhengCai}',
                '{tg.yi}{tg.yi}': '{ss.biJian}',
                '{tg.yi}{tg.geng}': '{ss.zhengGuan}',
                '{tg.yi}{tg.ding}': '{ss.shiShen}',
                '{tg.yi}{tg.ren}': '{ss.zhengYin}',
                '{tg.bing}{tg.gui}': '{ss.zhengGuan}',
                '{tg.bing}{tg.ji}': '{ss.shangGuan}',
                '{tg.bing}{tg.xin}': '{ss.zhengCai}',
                '{tg.bing}{tg.bing}': '{ss.biJian}',
                '{tg.bing}{tg.jia}': '{ss.pianYin}',
                '{tg.bing}{tg.wu}': '{ss.shiShen}',
                '{tg.bing}{tg.yi}': '{ss.zhengYin}',
                '{tg.bing}{tg.geng}': '{ss.pianCai}',
                '{tg.bing}{tg.ding}': '{ss.jieCai}',
                '{tg.bing}{tg.ren}': '{ss.qiSha}',
                '{tg.ding}{tg.gui}': '{ss.qiSha}',
                '{tg.ding}{tg.ji}': '{ss.shiShen}',
                '{tg.ding}{tg.xin}': '{ss.pianCai}',
                '{tg.ding}{tg.bing}': '{ss.jieCai}',
                '{tg.ding}{tg.jia}': '{ss.zhengYin}',
                '{tg.ding}{tg.wu}': '{ss.shangGuan}',
                '{tg.ding}{tg.yi}': '{ss.pianYin}',
                '{tg.ding}{tg.geng}': '{ss.zhengCai}',
                '{tg.ding}{tg.ding}': '{ss.biJian}',
                '{tg.ding}{tg.ren}': '{ss.zhengGuan}',
                '{tg.wu}{tg.gui}': '{ss.zhengCai}',
                '{tg.wu}{tg.ji}': '{ss.jieCai}',
                '{tg.wu}{tg.xin}': '{ss.shangGuan}',
                '{tg.wu}{tg.bing}': '{ss.pianYin}',
                '{tg.wu}{tg.jia}': '{ss.qiSha}',
                '{tg.wu}{tg.wu}': '{ss.biJian}',
                '{tg.wu}{tg.yi}': '{ss.zhengGuan}',
                '{tg.wu}{tg.geng}': '{ss.shiShen}',
                '{tg.wu}{tg.ding}': '{ss.zhengYin}',
                '{tg.wu}{tg.ren}': '{ss.pianCai}',
                '{tg.ji}{tg.gui}': '{ss.pianCai}',
                '{tg.ji}{tg.ji}': '{ss.biJian}',
                '{tg.ji}{tg.xin}': '{ss.shiShen}',
                '{tg.ji}{tg.bing}': '{ss.zhengYin}',
                '{tg.ji}{tg.jia}': '{ss.zhengGuan}',
                '{tg.ji}{tg.wu}': '{ss.jieCai}',
                '{tg.ji}{tg.yi}': '{ss.qiSha}',
                '{tg.ji}{tg.geng}': '{ss.shangGuan}',
                '{tg.ji}{tg.ding}': '{ss.pianYin}',
                '{tg.ji}{tg.ren}': '{ss.zhengCai}',
                '{tg.geng}{tg.gui}': '{ss.shangGuan}',
                '{tg.geng}{tg.ji}': '{ss.zhengYin}',
                '{tg.geng}{tg.xin}': '{ss.jieCai}',
                '{tg.geng}{tg.bing}': '{ss.qiSha}',
                '{tg.geng}{tg.jia}': '{ss.pianCai}',
                '{tg.geng}{tg.wu}': '{ss.pianYin}',
                '{tg.geng}{tg.yi}': '{ss.zhengCai}',
                '{tg.geng}{tg.geng}': '{ss.biJian}',
                '{tg.geng}{tg.ding}': '{ss.zhengGuan}',
                '{tg.geng}{tg.ren}': '{ss.shiShen}',
                '{tg.xin}{tg.gui}': '{ss.shiShen}',
                '{tg.xin}{tg.ji}': '{ss.pianYin}',
                '{tg.xin}{tg.xin}': '{ss.biJian}',
                '{tg.xin}{tg.bing}': '{ss.zhengGuan}',
                '{tg.xin}{tg.jia}': '{ss.zhengCai}',
                '{tg.xin}{tg.wu}': '{ss.zhengYin}',
                '{tg.xin}{tg.yi}': '{ss.pianCai}',
                '{tg.xin}{tg.geng}': '{ss.jieCai}',
                '{tg.xin}{tg.ding}': '{ss.qiSha}',
                '{tg.xin}{tg.ren}': '{ss.shangGuan}',
                '{tg.ren}{tg.gui}': '{ss.jieCai}',
                '{tg.ren}{tg.ji}': '{ss.zhengGuan}',
                '{tg.ren}{tg.xin}': '{ss.zhengYin}',
                '{tg.ren}{tg.bing}': '{ss.pianCai}',
                '{tg.ren}{tg.jia}': '{ss.shiShen}',
                '{tg.ren}{tg.wu}': '{ss.qiSha}',
                '{tg.ren}{tg.yi}': '{ss.shangGuan}',
                '{tg.ren}{tg.geng}': '{ss.pianYin}',
                '{tg.ren}{tg.ding}': '{ss.zhengCai}',
                '{tg.ren}{tg.ren}': '{ss.biJian}',
                '{tg.gui}{tg.gui}': '{ss.biJian}',
                '{tg.gui}{tg.ji}': '{ss.qiSha}',
                '{tg.gui}{tg.xin}': '{ss.pianYin}',
                '{tg.gui}{tg.bing}': '{ss.zhengCai}',
                '{tg.gui}{tg.jia}': '{ss.shangGuan}',
                '{tg.gui}{tg.wu}': '{ss.zhengGuan}',
                '{tg.gui}{tg.yi}': '{ss.shiShen}',
                '{tg.gui}{tg.geng}': '{ss.zhengYin}',
                '{tg.gui}{tg.ding}': '{ss.pianCai}',
                '{tg.gui}{tg.ren}': '{ss.jieCai}'
            },
            ZHI_HIDE_GAN: {
                '{dz.zi}': ['{tg.gui}'],
                '{dz.chou}': ['{tg.ji}', '{tg.gui}', '{tg.xin}'],
                '{dz.yin}': ['{tg.jia}', '{tg.bing}', '{tg.wu}'],
                '{dz.mao}': ['{tg.yi}'],
                '{dz.chen}': ['{tg.wu}', '{tg.yi}', '{tg.gui}'],
                '{dz.si}': ['{tg.bing}', '{tg.geng}', '{tg.wu}'],
                '{dz.wu}': ['{tg.ding}', '{tg.ji}'],
                '{dz.wei}': ['{tg.ji}', '{tg.ding}', '{tg.yi}'],
                '{dz.shen}': ['{tg.geng}', '{tg.ren}', '{tg.wu}'],
                '{dz.you}': ['{tg.xin}'],
                '{dz.xu}': ['{tg.wu}', '{tg.xin}', '{tg.ding}'],
                '{dz.hai}': ['{tg.ren}', '{tg.jia}']
            },
            LU: {
                '{tg.jia}': '{dz.yin}',
                '{tg.yi}': '{dz.mao}',
                '{tg.bing}': '{dz.si}',
                '{tg.ding}': '{dz.wu}',
                '{tg.wu}': '{dz.si}',
                '{tg.ji}': '{dz.wu}',
                '{tg.geng}': '{dz.shen}',
                '{tg.xin}': '{dz.you}',
                '{tg.ren}': '{dz.hai}',
                '{tg.gui}': '{dz.zi}',
                '{dz.yin}': '{tg.jia}',
                '{dz.mao}': '{tg.yi}',
                '{dz.si}': '{tg.bing},{tg.wu}',
                '{dz.wu}': '{tg.ding},{tg.ji}',
                '{dz.shen}': '{tg.geng}',
                '{dz.you}': '{tg.xin}',
                '{dz.hai}': '{tg.ren}',
                '{dz.zi}': '{tg.gui}'
            },
            getTimeZhiIndex: function (hm) {
                if (!hm) {
                    return 0;
                }
                if (hm.length > 5) {
                    hm = hm.substr(0, 5);
                }
                var x = 1;
                for (var i = 1; i < 22; i += 2) {
                    if (hm >= (i < 10 ? '0' : '') + i + ':00' && hm <= (i + 1 < 10 ? '0' : '') + (i + 1) + ':59') {
                        return x;
                    }
                    x++;
                }
                return 0;
            },
            convertTime: function (hm) {
                return this.ZHI[this.getTimeZhiIndex(hm) + 1];
            },
            getJiaZiIndex: function (ganZhi) {
                for (var i = 0, j = this.JIA_ZI.length; i < j; i++) {
                    if (this.JIA_ZI[i] === ganZhi) {
                        return i;
                    }
                }
                return -1;
            },

            getXunIndex: function (ganZhi) {
                var gan = ganZhi.substr(0, 1);
                var zhi = ganZhi.substr(1);
                var ganIndex = 0;
                var zhiIndex = 0;
                var i;
                var j;
                for (i = 0, j = this.GAN.length; i < j; i++) {
                    if (this.GAN[i] === gan) {
                        ganIndex = i;
                        break;
                    }
                }
                for (i = 0, j = this.ZHI.length; i < j; i++) {
                    if (this.ZHI[i] === zhi) {
                        zhiIndex = i;
                        break;
                    }
                }
                var diff = ganIndex - zhiIndex;
                if (diff < 0) {
                    diff += 12;
                }
                return diff / 2;
            },
            getXun: function (ganZhi) {
                return this.XUN[this.getXunIndex(ganZhi)];
            },
            getXunKong: function (ganZhi) {
                return this.XUN_KONG[this.getXunIndex(ganZhi)];
            },
            find: function (s, arr) {
                for (var i = 0, j = arr.length; i < j; i++) {
                    var v = arr[i];
                    if (v.length < 1) {
                        continue;
                    }
                    if (s.indexOf(v) > -1) {
                        return {
                            index: i,
                            value: v
                        };
                    }
                }
                return null;
            }
        };
    })();

    var EightChar = (function () {
        var _fromLunar = function (lunar) {
            return {
                _p: {sect: 2, lunar: lunar},
                setSect: function (sect) {
                    sect *= 1;
                    this._p.sect = 1 === sect ? 1 : 2;
                },
                getSect: function () {
                    return this._p.sect;
                },
                getDayGanIndex: function () {
                    return 2 === this._p.sect ? this._p.lunar.getDayGanIndexExact2() : this._p.lunar.getDayGanIndexExact();
                },
                getDayZhiIndex: function () {
                    return 2 === this._p.sect ? this._p.lunar.getDayZhiIndexExact2() : this._p.lunar.getDayZhiIndexExact();
                },
                getYear: function () {
                    return this._p.lunar.getYearInGanZhiExact();
                },
                getYearGan: function () {
                    return this._p.lunar.getYearGanExact();
                },
                getYearZhi: function () {
                    return this._p.lunar.getYearZhiExact();
                },
                getYearHideGan: function () {
                    return LunarUtil.ZHI_HIDE_GAN[this.getYearZhi()];
                },
                getYearWuXing: function () {
                    return LunarUtil.WU_XING_GAN[this.getYearGan()] + LunarUtil.WU_XING_ZHI[this.getYearZhi()];
                },
                getYearNaYin: function () {
                    return LunarUtil.NAYIN[this.getYear()];
                },
                getYearShiShenGan: function () {
                    return LunarUtil.SHI_SHEN_GAN[this.getDayGan() + this.getYearGan()];
                },
                getYearShiShenZhi: function () {
                    var dayGan = this.getDayGan();
                    var hideGan = LunarUtil.ZHI_HIDE_GAN[this.getYearZhi()];
                    var l = [];
                    for (var i = 0, j = hideGan.length; i < j; i++) {
                        l.push(LunarUtil.SHI_SHEN_ZHI[dayGan + hideGan[i]]);
                    }
                    return l;
                },

                getYearXun: function () {
                    return this._p.lunar.getYearXunExact();
                },
                getYearXunKong: function () {
                    return this._p.lunar.getYearXunKongExact();
                },
                getMonth: function () {
                    return this._p.lunar.getMonthInGanZhiExact();
                },
                getMonthGan: function () {
                    return this._p.lunar.getMonthGanExact();
                },
                getMonthZhi: function () {
                    return this._p.lunar.getMonthZhiExact();
                },
                getMonthHideGan: function () {
                    return LunarUtil.ZHI_HIDE_GAN[this.getMonthZhi()];
                },
                getMonthWuXing: function () {
                    return LunarUtil.WU_XING_GAN[this.getMonthGan()] + LunarUtil.WU_XING_ZHI[this.getMonthZhi()];
                },
                getMonthNaYin: function () {
                    return LunarUtil.NAYIN[this.getMonth()];
                },
                getMonthShiShenGan: function () {
                    return LunarUtil.SHI_SHEN_GAN[this.getDayGan() + this.getMonthGan()];
                },
                getMonthShiShenZhi: function () {
                    var dayGan = this.getDayGan();
                    var hideGan = LunarUtil.ZHI_HIDE_GAN[this.getMonthZhi()];
                    var l = [];
                    for (var i = 0, j = hideGan.length; i < j; i++) {
                        l.push(LunarUtil.SHI_SHEN_ZHI[dayGan + hideGan[i]]);
                    }
                    return l;
                },
                getMonthDiShi: function () {
                    return this._getDiShi(this._p.lunar.getMonthZhiIndexExact());
                },
                getMonthXun: function () {
                    return this._p.lunar.getMonthXunExact();
                },
                getMonthXunKong: function () {
                    return this._p.lunar.getMonthXunKongExact();
                },
                getDay: function () {
                    return 2 === this._p.sect ? this._p.lunar.getDayInGanZhiExact2() : this._p.lunar.getDayInGanZhiExact();
                },
                getDayGan: function () {
                    return 2 === this._p.sect ? this._p.lunar.getDayGanExact2() : this._p.lunar.getDayGanExact();
                },
                getDayZhi: function () {
                    return 2 === this._p.sect ? this._p.lunar.getDayZhiExact2() : this._p.lunar.getDayZhiExact();
                },
                getDayHideGan: function () {
                    return LunarUtil.ZHI_HIDE_GAN[this.getDayZhi()];
                },
                getDayWuXing: function () {
                    return LunarUtil.WU_XING_GAN[this.getDayGan()] + LunarUtil.WU_XING_ZHI[this.getDayZhi()];
                },
                getDayNaYin: function () {
                    return LunarUtil.NAYIN[this.getDay()];
                },
                getDayShiShenGan: function () {
                    return '日主';
                },
                getDayShiShenZhi: function () {
                    var dayGan = this.getDayGan();
                    var hideGan = LunarUtil.ZHI_HIDE_GAN[this.getDayZhi()];
                    var l = [];
                    for (var i = 0, j = hideGan.length; i < j; i++) {
                        l.push(LunarUtil.SHI_SHEN_ZHI[dayGan + hideGan[i]]);
                    }
                    return l;
                },
                getDayDiShi: function () {
                    return this._getDiShi(this.getDayZhiIndex());
                },
                getDayXun: function () {
                    return 2 === this._p.sect ? this._p.lunar.getDayXunExact2() : this._p.lunar.getDayXunExact();
                },
                getDayXunKong: function () {
                    return 2 === this._p.sect ? this._p.lunar.getDayXunKongExact2() : this._p.lunar.getDayXunKongExact();
                },
                getTime: function () {
                    return this._p.lunar.getTimeInGanZhi();
                },
                getTimeGan: function () {
                    return this._p.lunar.getTimeGan();
                },
                getTimeZhi: function () {
                    return this._p.lunar.getTimeZhi();
                },
                getTimeHideGan: function () {
                    return LunarUtil.ZHI_HIDE_GAN[this.getTimeZhi()];
                },
                getTimeWuXing: function () {
                    return LunarUtil.WU_XING_GAN[this.getTimeGan()] + LunarUtil.WU_XING_ZHI[this.getTimeZhi()];
                },
                getTimeNaYin: function () {
                    return LunarUtil.NAYIN[this.getTime()];
                },
                getTimeShiShenGan: function () {
                    return LunarUtil.SHI_SHEN_GAN[this.getDayGan() + this.getTimeGan()];
                },
                getTimeShiShenZhi: function () {
                    var dayGan = this.getDayGan();
                    var hideGan = LunarUtil.ZHI_HIDE_GAN[this.getTimeZhi()];
                    var l = [];
                    for (var i = 0, j = hideGan.length; i < j; i++) {
                        l.push(LunarUtil.SHI_SHEN_ZHI[dayGan + hideGan[i]]);
                    }
                    return l;
                },
                getTimeDiShi: function () {
                    return this._getDiShi(this._p.lunar.getTimeZhiIndex());
                },
                getTimeXun: function () {
                    return this._p.lunar.getTimeXun();
                },
                getTimeXunKong: function () {
                    return this._p.lunar.getTimeXunKong();
                },
                getTaiYuan: function () {
                    var ganIndex = this._p.lunar.getMonthGanIndexExact() + 1;
                    if (ganIndex >= 10) {
                        ganIndex -= 10;
                    }
                    var zhiIndex = this._p.lunar.getMonthZhiIndexExact() + 3;
                    if (zhiIndex >= 12) {
                        zhiIndex -= 12;
                    }
                    return LunarUtil.GAN[ganIndex + 1] + LunarUtil.ZHI[zhiIndex + 1];
                },
                getTaiYuanNaYin: function () {
                    return LunarUtil.NAYIN[this.getTaiYuan()];
                },
                getTaiXi: function () {
                    var lunar = this._p.lunar;
                    var ganIndex = 2 === this._p.sect ? lunar.getDayGanIndexExact2() : lunar.getDayGanIndexExact();
                    var zhiIndex = 2 === this._p.sect ? lunar.getDayZhiIndexExact2() : lunar.getDayZhiIndexExact();
                    return LunarUtil.HE_GAN_5[ganIndex] + LunarUtil.HE_ZHI_6[zhiIndex];
                },
                getTaiXiNaYin: function () {
                    return LunarUtil.NAYIN[this.getTaiXi()];
                },
                getMingGong: function () {
                    var monthZhiIndex = 0;
                    var timeZhiIndex = 0;
                    for (var i = 0, j = LunarUtil.MONTH_ZHI.length; i < j; i++) {
                        var zhi = LunarUtil.MONTH_ZHI[i];
                        if (lunar.getMonthZhiExact() === zhi) {
                            monthZhiIndex = i;
                        }
                        if (lunar.getTimeZhi() === zhi) {
                            timeZhiIndex = i;
                        }
                    }
                    var zhiIndex = 26 - (monthZhiIndex + timeZhiIndex);
                    if (zhiIndex > 12) {
                        zhiIndex -= 12;
                    }
                    var jiaZiIndex = LunarUtil.getJiaZiIndex(lunar.getMonthInGanZhiExact()) - (monthZhiIndex - zhiIndex);
                    if (jiaZiIndex >= 60) {
                        jiaZiIndex -= 60;
                    }
                    if (jiaZiIndex < 0) {
                        jiaZiIndex += 60;
                    }
                    return LunarUtil.JIA_ZI[jiaZiIndex];
                },
                getMingGongNaYin: function () {
                    return LunarUtil.NAYIN[this.getMingGong()];
                },
                getShenGong: function () {
                    var monthZhiIndex = 0;
                    var timeZhiIndex = 0;
                    for (var i = 0, j = LunarUtil.MONTH_ZHI.length; i < j; i++) {
                        var zhi = LunarUtil.MONTH_ZHI[i];
                        if (lunar.getMonthZhiExact() === zhi) {
                            monthZhiIndex = i;
                        }
                        if (lunar.getTimeZhi() === zhi) {
                            timeZhiIndex = i;
                        }
                    }
                    var zhiIndex = 2 + monthZhiIndex + timeZhiIndex;
                    if (zhiIndex > 12) {
                        zhiIndex -= 12;
                    }
                    var jiaZiIndex = LunarUtil.getJiaZiIndex(lunar.getMonthInGanZhiExact()) - (monthZhiIndex - zhiIndex);
                    if (jiaZiIndex >= 60) {
                        jiaZiIndex -= 60;
                    }
                    if (jiaZiIndex < 0) {
                        jiaZiIndex += 60;
                    }
                    return LunarUtil.JIA_ZI[jiaZiIndex];
                },
                getShenGongNaYin: function () {
                    return LunarUtil.NAYIN[this.getShenGong()];
                },
                getLunar: function () {
                    return this._p.lunar;
                },
                getYun: function (gender, sect) {
                    sect *= 1;
                    sect = 2 === sect ? sect : 1;
                    var lunar = this.getLunar();
                    var yang = 0 === lunar.getYearGanIndexExact() % 2;
                    var man = 1 === gender;
                    var forward = (yang && man) || (!yang && !man);
                    var start = (function () {
                        var prev = lunar.getPrevJie();
                        var next = lunar.getNextJie();
                        var current = lunar.getSolar();
                        var start = forward ? current : prev.getSolar();
                        var end = forward ? next.getSolar() : current;

                        var year;
                        var month;
                        var day;
                        var hour = 0;

                        if (2 === sect) {
                            var minutes = end.subtractMinute(start);
                            year = Math.floor(minutes / 4320);
                            minutes -= year * 4320;
                            month = Math.floor(minutes / 360);
                            minutes -= month * 360;
                            day = Math.floor(minutes / 12);
                            minutes -= day * 12;
                            hour = minutes * 2;
                        } else {
                            var endTimeZhiIndex = end.getHour() === 23 ? 11 : LunarUtil.getTimeZhiIndex(end.toYmdHms().substr(11, 5));
                            var startTimeZhiIndex = start.getHour() === 23 ? 11 : LunarUtil.getTimeZhiIndex(start.toYmdHms().substr(11, 5));
                            // 时辰差
                            var hourDiff = endTimeZhiIndex - startTimeZhiIndex;
                            // 天数差
                            var dayDiff = end.subtract(start);
                            if (hourDiff < 0) {
                                hourDiff += 12;
                                dayDiff--;
                            }
                            var monthDiff = Math.floor((hourDiff * 10) / 30);
                            month = dayDiff * 4 + monthDiff;
                            day = hourDiff * 10 - monthDiff * 30;
                            year = Math.floor(month / 12);
                            month = month - year * 12;
                        }

                        return {
                            year: year,
                            month: month,
                            day: day,
                            hour: hour
                        };
                    })();
                    var buildLiuYue = function (liuNian, index) {
                        return {
                            _p: {
                                index: index,
                                liuNian: liuNian
                            },
                            getIndex: function () {
                                return this._p.index;
                            },

                            getGanZhi: function () {
                                var yearGanIndex = LunarUtil.find(this._p.liuNian.getGanZhi(), LunarUtil.GAN).index - 1;
                                var offset = [2, 4, 6, 8, 0][yearGanIndex % 5];
                                var gan = LunarUtil.GAN[((this._p.index + offset) % 10) + 1];
                                var zhi = LunarUtil.ZHI[((this._p.index + LunarUtil.BASE_MONTH_ZHI_INDEX) % 12) + 1];
                                return gan + zhi;
                            },
                            getXun: function () {
                                return LunarUtil.getXun(this.getGanZhi());
                            },
                            getXunKong: function () {
                                return LunarUtil.getXunKong(this.getGanZhi());
                            }
                        };
                    };
                    var buildLiuNian = function (daYun, index) {
                        return {
                            _p: {
                                year: daYun.getStartYear() + index,
                                age: daYun.getStartAge() + index,
                                index: index,
                                daYun: daYun,
                                lunar: daYun.getLunar()
                            },
                            getYear: function () {
                                return this._p.year;
                            },
                            getAge: function () {
                                return this._p.age;
                            },
                            getIndex: function () {
                                return this._p.index;
                            },
                            getLunar: function () {
                                return this._p.lunar;
                            },
                            getGanZhi: function () {
                                var offset = LunarUtil.getJiaZiIndex(this._p.lunar.getJieQiTable()[I18n.getMessage('jq.liChun')].getLunar().getYearInGanZhiExact()) + this._p.index;
                                if (this._p.daYun.getIndex() > 0) {
                                    offset += this._p.daYun.getStartAge() - 1;
                                }
                                offset %= LunarUtil.JIA_ZI.length;
                                return LunarUtil.JIA_ZI[offset];
                            },
                            getXun: function () {
                                return LunarUtil.getXun(this.getGanZhi());
                            },
                            getXunKong: function () {
                                return LunarUtil.getXunKong(this.getGanZhi());
                            },
                            getLiuYue: function () {
                                var l = [];
                                for (var i = 0; i < 12; i++) {
                                    l.push(buildLiuYue(this, i));
                                }
                                return l;
                            }
                        };
                    };
                    var buildXiaoYun = function (daYun, index, forward) {
                        return {
                            _p: {
                                year: daYun.getStartYear() + index,
                                age: daYun.getStartAge() + index,
                                index: index,
                                daYun: daYun,
                                forward: forward,
                                lunar: daYun.getLunar()
                            },
                            getYear: function () {
                                return this._p.year;
                            },
                            getAge: function () {
                                return this._p.age;
                            },
                            getIndex: function () {
                                return this._p.index;
                            },
                            getGanZhi: function () {
                                var offset = LunarUtil.getJiaZiIndex(this._p.lunar.getTimeInGanZhi());
                                var add = this._p.index + 1;
                                if (this._p.daYun.getIndex() > 0) {
                                    add += this._p.daYun.getStartAge() - 1;
                                }
                                offset += this._p.forward ? add : -add;
                                var size = LunarUtil.JIA_ZI.length;
                                while (offset < 0) {
                                    offset += size;
                                }
                                offset %= size;
                                return LunarUtil.JIA_ZI[offset];
                            },
                            getXun: function () {
                                return LunarUtil.getXun(this.getGanZhi());
                            },
                            getXunKong: function () {
                                return LunarUtil.getXunKong(this.getGanZhi());
                            }
                        };
                    };
                    var buildDaYun = function (yun, index) {
                        var birthYear = yun.getLunar().getSolar().getYear();
                        var year = yun.getStartSolar().getYear();
                        var startYear;
                        var startAge;
                        var endYear;
                        var endAge;
                        if (index < 1) {
                            startYear = birthYear;
                            startAge = 1;
                            endYear = year - 1;
                            endAge = year - birthYear;
                        } else {
                            var add = (index - 1) * 10;
                            startYear = year + add;
                            startAge = startYear - birthYear + 1;
                            endYear = startYear + 9;
                            endAge = startAge + 9;
                        }
                        return {
                            _p: {
                                startYear: startYear,
                                endYear: endYear,
                                startAge: startAge,
                                endAge: endAge,
                                index: index,
                                yun: yun,
                                lunar: yun.getLunar()
                            },
                            getStartYear: function () {
                                return this._p.startYear;
                            },
                            getEndYear: function () {
                                return this._p.endYear;
                            },
                            getStartAge: function () {
                                return this._p.startAge;
                            },
                            getEndAge: function () {
                                return this._p.endAge;
                            },
                            getIndex: function () {
                                return this._p.index;
                            },
                            getLunar: function () {
                                return this._p.lunar;
                            },
                            getGanZhi: function () {
                                if (this._p.index < 1) {
                                    return '';
                                }
                                var offset = LunarUtil.getJiaZiIndex(this._p.lunar.getMonthInGanZhiExact());
                                offset += this._p.yun.isForward() ? this._p.index : -this._p.index;
                                var size = LunarUtil.JIA_ZI.length;
                                if (offset >= size) {
                                    offset -= size;
                                }
                                if (offset < 0) {
                                    offset += size;
                                }
                                return LunarUtil.JIA_ZI[offset];
                            },
                            getXun: function () {
                                return LunarUtil.getXun(this.getGanZhi());
                            },
                            getXunKong: function () {
                                return LunarUtil.getXunKong(this.getGanZhi());
                            },
                            getLiuNian: function (n) {
                                if (!n) {
                                    n = 10;
                                }
                                if (this._p.index < 1) {
                                    n = this._p.endYear - this._p.startYear + 1;
                                }
                                var l = [];
                                for (var i = 0; i < n; i++) {
                                    l.push(buildLiuNian(this, i));
                                }
                                return l;
                            },
                            getXiaoYun: function (n) {
                                if (!n) {
                                    n = 10;
                                }
                                if (this._p.index < 1) {
                                    n = this._p.endYear - this._p.startYear + 1;
                                }
                                var l = [];
                                for (var i = 0; i < n; i++) {
                                    l.push(buildXiaoYun(this, i, this._p.yun.isForward()));
                                }
                                return l;
                            }
                        };
                    };
                    return {
                        _p: {
                            gender: gender,
                            startYear: start.year,
                            startMonth: start.month,
                            startDay: start.day,
                            startHour: start.hour,
                            forward: forward,
                            lunar: lunar
                        },
                        getGender: function () {
                            return this._p.gender;
                        },
                        getStartYear: function () {
                            return this._p.startYear;
                        },
                        getStartMonth: function () {
                            return this._p.startMonth;
                        },
                        getStartDay: function () {
                            return this._p.startDay;
                        },
                        getStartHour: function () {
                            return this._p.startHour;
                        },
                        isForward: function () {
                            return this._p.forward;
                        },
                        getLunar: function () {
                            return this._p.lunar;
                        },
                        getStartSolar: function () {
                            var solar = this._p.lunar.getSolar();
                            solar = solar.nextYear(this._p.startYear);
                            solar = solar.nextMonth(this._p.startMonth);
                            solar = solar.next(this._p.startDay);
                            return solar.nextHour(this._p.startHour);
                        },
                        getDaYun: function (n) {
                            if (!n) {
                                n = 10;
                            }
                            var l = [];
                            for (var i = 0; i < n; i++) {
                                l.push(buildDaYun(this, i));
                            }
                            return l;
                        }
                    };
                },
                toString: function () {
                    return this.getYear() + ' ' + this.getMonth() + ' ' + this.getDay() + ' ' + this.getTime();
                }
            };
        };
        return {
            fromLunar: function (lunar) {
                return _fromLunar(lunar);
            }
        };
    })();

    var I18n = (function () {
        var _defaultLang = 'chs';
        var _lang = _defaultLang;
        var _inited = false;
        var _messages = {
            chs: {
                'tg.jia': '甲',
                'tg.yi': '乙',
                'tg.bing': '丙',
                'tg.ding': '丁',
                'tg.wu': '戊',
                'tg.ji': '己',
                'tg.geng': '庚',
                'tg.xin': '辛',
                'tg.ren': '壬',
                'tg.gui': '癸',
                'dz.zi': '子',
                'dz.chou': '丑',
                'dz.yin': '寅',
                'dz.mao': '卯',
                'dz.chen': '辰',
                'dz.si': '巳',
                'dz.wu': '午',
                'dz.wei': '未',
                'dz.shen': '申',
                'dz.you': '酉',
                'dz.xu': '戌',
                'dz.hai': '亥',
                'zx.jian': '建',
                'zx.chu': '除',
                'zx.man': '满',
                'zx.ping': '平',
                'zx.ding': '定',
                'zx.zhi': '执',
                'zx.po': '破',
                'zx.wei': '危',
                'zx.cheng': '成',
                'zx.shou': '收',
                'zx.kai': '开',
                'zx.bi': '闭',
                'jz.jiaZi': '甲子',
                'jz.yiChou': '乙丑',
                'jz.bingYin': '丙寅',
                'jz.dingMao': '丁卯',
                'jz.wuChen': '戊辰',
                'jz.jiSi': '己巳',
                'jz.gengWu': '庚午',
                'jz.xinWei': '辛未',
                'jz.renShen': '壬申',
                'jz.guiYou': '癸酉',
                'jz.jiaXu': '甲戌',
                'jz.yiHai': '乙亥',
                'jz.bingZi': '丙子',
                'jz.dingChou': '丁丑',
                'jz.wuYin': '戊寅',
                'jz.jiMao': '己卯',
                'jz.gengChen': '庚辰',
                'jz.xinSi': '辛巳',
                'jz.renWu': '壬午',
                'jz.guiWei': '癸未',
                'jz.jiaShen': '甲申',
                'jz.yiYou': '乙酉',
                'jz.bingXu': '丙戌',
                'jz.dingHai': '丁亥',
                'jz.wuZi': '戊子',
                'jz.jiChou': '己丑',
                'jz.gengYin': '庚寅',
                'jz.xinMao': '辛卯',
                'jz.renChen': '壬辰',
                'jz.guiSi': '癸巳',
                'jz.jiaWu': '甲午',
                'jz.yiWei': '乙未',
                'jz.bingShen': '丙申',
                'jz.dingYou': '丁酉',
                'jz.wuXu': '戊戌',
                'jz.jiHai': '己亥',
                'jz.gengZi': '庚子',
                'jz.xinChou': '辛丑',
                'jz.renYin': '壬寅',
                'jz.guiMao': '癸卯',
                'jz.jiaChen': '甲辰',
                'jz.yiSi': '乙巳',
                'jz.bingWu': '丙午',
                'jz.dingWei': '丁未',
                'jz.wuShen': '戊申',
                'jz.jiYou': '己酉',
                'jz.gengXu': '庚戌',
                'jz.xinHai': '辛亥',
                'jz.renZi': '壬子',
                'jz.guiChou': '癸丑',
                'jz.jiaYin': '甲寅',
                'jz.yiMao': '乙卯',
                'jz.bingChen': '丙辰',
                'jz.dingSi': '丁巳',
                'jz.wuWu': '戊午',
                'jz.jiWei': '己未',
                'jz.gengShen': '庚申',
                'jz.xinYou': '辛酉',
                'jz.renXu': '壬戌',
                'jz.guiHai': '癸亥',
                'sx.rat': '鼠',
                'sx.ox': '牛',
                'sx.tiger': '虎',
                'sx.rabbit': '兔',
                'sx.dragon': '龙',
                'sx.snake': '蛇',
                'sx.horse': '马',
                'sx.goat': '羊',
                'sx.monkey': '猴',
                'sx.rooster': '鸡',
                'sx.dog': '狗',
                'sx.pig': '猪',
                'dw.long': '龙',
                'dw.niu': '牛',
                'dw.gou': '狗',
                'dw.yang': '羊',
                'dw.tu': '兔',
                'dw.shu': '鼠',
                'dw.ji': '鸡',
                'dw.ma': '马',
                'dw.hu': '虎',
                'dw.zhu': '猪',
                'dw.hou': '猴',
                'dw.she': '蛇',
                'dw.huLi': '狐',
                'dw.yan': '燕',
                'dw.bao': '豹',
                'dw.yuan': '猿',
                'dw.yin': '蚓',
                'dw.lu': '鹿',
                'dw.wu': '乌',
                'dw.jiao': '蛟',
                'dw.lang': '狼',
                'dw.fu': '蝠',
                'dw.zhang': '獐',
                'dw.xu': '獝',
                'dw.xie': '獬',
                'dw.han': '犴',
                'dw.he': '貉',
                'dw.zhi': '彘',
                'wx.jin': '金',
                'wx.mu': '木',
                'wx.shui': '水',
                'wx.huo': '火',
                'wx.tu': '土',
                'wx.ri': '日',
                'wx.yue': '月',
                'n.zero': '〇',
                'n.one': '一',
                'n.two': '二',
                'n.three': '三',
                'n.four': '四',
                'n.five': '五',
                'n.six': '六',
                'n.seven': '七',
                'n.eight': '八',
                'n.nine': '九',
                'n.ten': '十',
                'n.eleven': '十一',
                'n.twelve': '十二',
                'd.one': '初一',
                'd.two': '初二',
                'd.three': '初三',
                'd.four': '初四',
                'd.five': '初五',
                'd.six': '初六',
                'd.seven': '初七',
                'd.eight': '初八',
                'd.nine': '初九',
                'd.ten': '初十',
                'd.eleven': '十一',
                'd.twelve': '十二',
                'd.thirteen': '十三',
                'd.fourteen': '十四',
                'd.fifteen': '十五',
                'd.sixteen': '十六',
                'd.seventeen': '十七',
                'd.eighteen': '十八',
                'd.nighteen': '十九',
                'd.twenty': '二十',
                'd.twentyOne': '廿一',
                'd.twentyTwo': '廿二',
                'd.twentyThree': '廿三',
                'd.twentyFour': '廿四',
                'd.twentyFive': '廿五',
                'd.twentySix': '廿六',
                'd.twentySeven': '廿七',
                'd.twentyEight': '廿八',
                'd.twentyNine': '廿九',
                'd.thirty': '三十',
                'm.one': '正',
                'm.two': '二',
                'm.three': '三',
                'm.four': '四',
                'm.five': '五',
                'm.six': '六',
                'm.seven': '七',
                'm.eight': '八',
                'm.nine': '九',
                'm.ten': '十',
                'm.eleven': '冬',
                'm.twelve': '腊',
                'w.sun': '日',
                'w.mon': '一',
                'w.tues': '二',
                'w.wed': '三',
                'w.thur': '四',
                'w.fri': '五',
                'w.sat': '六',
                'xz.aries': '白羊',
                'xz.taurus': '金牛',
                'xz.gemini': '双子',
                'xz.cancer': '巨蟹',
                'xz.leo': '狮子',
                'xz.virgo': '处女',
                'xz.libra': '天秤',
                'xz.scorpio': '天蝎',
                'xz.sagittarius': '射手',
                'xz.capricornus': '摩羯',
                'xz.aquarius': '水瓶',
                'xz.pisces': '双鱼',
                'bg.qian': '乾',
                'bg.kun': '坤',
                'bg.zhen': '震',
                'bg.xun': '巽',
                'bg.kan': '坎',
                'bg.li': '离',
                'bg.gen': '艮',
                'bg.dui': '兑',
                'ps.center': '中',
                'ps.dong': '东',
                'ps.nan': '南',
                'ps.xi': '西',
                'ps.bei': '北',
                'ps.zhong': '中宫',
                'ps.zhengDong': '正东',
                'ps.zhengNan': '正南',
                'ps.zhengXi': '正西',
                'ps.zhengBei': '正北',
                'ps.dongBei': '东北',
                'ps.dongNan': '东南',
                'ps.xiBei': '西北',
                'ps.xiNan': '西南',
                'ps.wai': '外',
                'ps.fangNei': '房内',
                'jq.dongZhi': '冬至',
                'jq.xiaoHan': '小寒',
                'jq.daHan': '大寒',
                'jq.liChun': '立春',
                'jq.yuShui': '雨水',
                'jq.jingZhe': '惊蛰',
                'jq.chunFen': '春分',
                'jq.qingMing': '清明',
                'jq.guYu': '谷雨',
                'jq.liXia': '立夏',
                'jq.xiaoMan': '小满',
                'jq.mangZhong': '芒种',
                'jq.xiaZhi': '夏至',
                'jq.xiaoShu': '小暑',
                'jq.daShu': '大暑',
                'jq.liQiu': '立秋',
                'jq.chuShu': '处暑',
                'jq.baiLu': '白露',
                'jq.qiuFen': '秋分',
                'jq.hanLu': '寒露',
                'jq.shuangJiang': '霜降',
                'jq.liDong': '立冬',
                'jq.xiaoXue': '小雪',
                'jq.daXue': '大雪',
                'sn.qingLong': '青龙',
                'sn.baiHu': '白虎',
                'sn.zhuQue': '朱雀',
                'sn.xuanWu': '玄武',
                'sn.mingTang': '明堂',
                'sn.tianXing': '天刑',
                'sn.tianDe': '天德',
                'sn.jinKui': '金匮',
                'sn.yuTang': '玉堂',
                'sn.siMing': '司命',
                'sn.tianLao': '天牢',
                'sn.gouChen': '勾陈',
                'sn.tianEn': '天恩',
                'sn.muCang': '母仓',
                'sn.shiYang': '时阳',
                'sn.shengQi': '生气',
                'sn.yiHou': '益后',
                'sn.zaiSha': '灾煞',
                'sn.tianHuo': '天火',
                'sn.siJi': '四忌',
                'sn.baLong': '八龙',
                'sn.fuRi': '复日',
                'sn.xuShi': '续世',
                'sn.yueSha': '月煞',
                'sn.yueXu': '月虚',
                'sn.xueZhi': '血支',
                'sn.tianZei': '天贼',
                'sn.wuXu': '五虚',
                'sn.tuFu': '土符',
                'sn.guiJi': '归忌',
                'sn.xueJi': '血忌',
                'sn.yueDe': '月德',
                'sn.yueEn': '月恩',
                'sn.siXiang': '四相',
                'sn.wangRi': '王日',
                'sn.tianCang': '天仓',
                'sn.buJiang': '不将',
                'sn.wuHe': '五合',
                'sn.mingFeiDui': '鸣吠对',
                'sn.yueJian': '月建',
                'sn.xiaoShi': '小时',
                'sn.tuHu': '土府',
                'sn.wangWang': '往亡',
                'sn.yaoAn': '要安',
                'sn.siShen': '死神',
                'sn.tianMa': '天马',
                'sn.jiuHu': '九虎',
                'sn.qiNiao': '七鸟',
                'sn.liuShe': '六蛇',
                'sn.guanRi': '官日',
                'sn.jiQi': '吉期',
                'sn.yuYu': '玉宇',
                'sn.daShi': '大时',
                'sn.daBai': '大败',
                'sn.xianChi': '咸池',
                'sn.shouRi': '守日',
                'sn.tianWu': '天巫',
                'sn.fuDe': '福德',
                'sn.liuYi': '六仪',
                'sn.jinTang': '金堂',
                'sn.yanDui': '厌对',
                'sn.zhaoYao': '招摇',
                'sn.jiuKong': '九空',
                'sn.jiuKan': '九坎',
                'sn.jiuJiao': '九焦',
                'sn.xiangRi': '相日',
                'sn.baoGuang': '宝光',
                'sn.tianGang': '天罡',
                'sn.yueXing': '月刑',
                'sn.yueHai': '月害',
                'sn.youHuo': '游祸',
                'sn.chongRi': '重日',
                'sn.shiDe': '时德',
                'sn.minRi': '民日',
                'sn.sanHe': '三合',
                'sn.linRi': '临日',
                'sn.shiYin': '时阴',
                'sn.mingFei': '鸣吠',
                'sn.siQi': '死气',
                'sn.diNang': '地囊',
                'sn.yueDeHe': '月德合',
                'sn.jingAn': '敬安',
                'sn.puHu': '普护',
                'sn.jieShen': '解神',
                'sn.xiaoHao': '小耗',
                'sn.tianDeHe': '天德合',
                'sn.yueKong': '月空',
                'sn.yiMa': '驿马',
                'sn.tianHou': '天后',
                'sn.chuShen': '除神',
                'sn.yuePo': '月破',
                'sn.daHao': '大耗',
                'sn.wuLi': '五离',
                'sn.yinDe': '阴德',
                'sn.fuSheng': '福生',
                'sn.tianLi': '天吏',
                'sn.zhiSi': '致死',
                'sn.yuanWu': '元武',
                'sn.yangDe': '阳德',
                'sn.tianXi': '天喜',
                'sn.tianYi': '天医',
                'sn.yueYan': '月厌',
                'sn.diHuo': '地火',
                'sn.fourHit': '四击',
                'sn.daSha': '大煞',
                'sn.daHui': '大会',
                'sn.tianYuan': '天愿',
                'sn.liuHe': '六合',
                'sn.wuFu': '五富',
                'sn.shengXin': '圣心',
                'sn.heKui': '河魁',
                'sn.jieSha': '劫煞',
                'sn.siQiong': '四穷',
                'sn.chuShuiLong': '触水龙',
                'sn.baFeng': '八风',
                'sn.tianShe': '天赦',
                'sn.wuMu': '五墓',
                'sn.baZhuan': '八专',
                'sn.yinCuo': '阴错',
                'sn.siHao': '四耗',
                'sn.yangCuo': '阳错',
                'sn.siFei': '四废',
                'sn.sanYin': '三阴',
                'sn.xiaoHui': '小会',
                'sn.yinDaoChongYang': '阴道冲阳',
                'sn.danYin': '单阴',
                'sn.guChen': '孤辰',
                'sn.yinWei': '阴位',
                'sn.xingHen': '行狠',
                'sn.liaoLi': '了戾',
                'sn.jueYin': '绝阴',
                'sn.chunYang': '纯阳',
                'sn.suiBo': '岁薄',
                'sn.yinYangJiaoPo': '阴阳交破',
                'sn.yinYangJuCuo': '阴阳俱错',
                'sn.yinYangJiChong': '阴阳击冲',
                'sn.zhuZhen': '逐阵',
                'sn.yangCuoYinChong': '阳错阴冲',
                'sn.qiFu': '七符',
                'sn.tianGou': '天狗',
                'sn.chengRi': '成日',
                'sn.tianFu': '天符',
                'sn.guYang': '孤阳',
                'sn.jueYang': '绝阳',
                'sn.chunYin': '纯阴',
                'sn.yinShen': '阴神',
                'sn.jieChu': '解除',
                'sn.yangPoYinChong': '阳破阴冲',
                'ss.biJian': '比肩',
                'ss.jieCai': '劫财',
                'ss.shiShen': '食神',
                'ss.shangGuan': '伤官',
                'ss.pianCai': '偏财',
                'ss.zhengCai': '正财',
                'ss.qiSha': '七杀',
                'ss.zhengGuan': '正官',
                'ss.pianYin': '偏印',
                'ss.zhengYin': '正印',
                's.none': '无',
                's.huangDao': '黄道',
                's.heiDao': '黑道',
                's.goodLuck': '吉',
                's.badLuck': '凶',
                's.yin': '阴',
                's.yang': '阳',
                's.white': '白',
                's.black': '黑',
                's.blue': '碧',
                's.green': '绿',
                's.yellow': '黄',
                's.red': '赤',
                's.purple': '紫',
                'jr.chuXi': '除夕',
                'jr.chunJie': '春节',
                'jr.yuanXiao': '元宵节',
                'jr.longTou': '龙头节',
                'jr.duanWu': '端午节',
                'jr.qiXi': '七夕节',
                'jr.zhongQiu': '中秋节',
                'jr.chongYang': '重阳节',
                'jr.laBa': '腊八节',
                'jr.yuanDan': '元旦节',
                'jr.qingRen': '情人节',
                'jr.fuNv': '妇女节',
                'jr.zhiShu': '植树节',
                'jr.xiaoFei': '消费者权益日',
                'jr.wuYi': '劳动节',
                'jr.qingNian': '青年节',
                'jr.erTong': '儿童节',
                'jr.yuRen': '愚人节',
                'jr.jianDang': '建党节',
                'jr.jianJun': '建军节',
                'jr.jiaoShi': '教师节',
                'jr.guoQing': '国庆节',
                'jr.wanShengYe': '万圣节前夜',
                'jr.wanSheng': '万圣节',
                'jr.pingAn': '平安夜',
                'jr.shengDan': '圣诞节',
                'ds.changSheng': '长生',
                'ds.muYu': '沐浴',
                'ds.guanDai': '冠带',
                'ds.linGuan': '临官',
                'ds.diWang': '帝旺',
                'ds.shuai': '衰',
                'ds.bing': '病',
                'ds.si': '死',
                'ds.mu': '墓',
                'ds.jue': '绝',
                'ds.tai': '胎',
                'ds.yang': '养',
                'h.first': '初候',
                'h.second': '二候',
                'h.third': '三候',
                'h.qiuYinJie': '蚯蚓结',
                'h.miJiao': '麋角解',
                'h.shuiQuan': '水泉动',
                'h.yanBei': '雁北乡',
                'h.queShi': '鹊始巢',
                'h.zhiShi': '雉始雊',
                'h.jiShi': '鸡始乳',
                'h.zhengNiao': '征鸟厉疾',
                'h.shuiZe': '水泽腹坚',
                'h.dongFeng': '东风解冻',
                'h.zheChongShiZhen': '蛰虫始振',
                'h.yuZhi': '鱼陟负冰',
                'h.taJi': '獭祭鱼',
                'h.houYan': '候雁北',
                'h.caoMuMengDong': '草木萌动',
                'h.taoShi': '桃始华',
                'h.cangGeng': '仓庚鸣',
                'h.yingHua': '鹰化为鸠',
                'h.xuanNiaoZhi': '玄鸟至',
                'h.leiNai': '雷乃发声',
                'h.shiDian': '始电',
                'h.tongShi': '桐始华',
                'h.tianShu': '田鼠化为鴽',
                'h.hongShi': '虹始见',
                'h.pingShi': '萍始生',
                'h.mingJiu': '鸣鸠拂奇羽',
                'h.daiSheng': '戴胜降于桑',
                'h.louGuo': '蝼蝈鸣',
                'h.qiuYinChu': '蚯蚓出',
                'h.wangGua': '王瓜生',
                'h.kuCai': '苦菜秀',
                'h.miCao': '靡草死',
                'h.maiQiu': '麦秋至',
                'h.tangLang': '螳螂生',
                'h.juShi': '鵙始鸣',
                'h.fanShe': '反舌无声',
                'h.luJia': '鹿角解',
                'h.tiaoShi': '蜩始鸣',
                'h.banXia': '半夏生',
                'h.wenFeng': '温风至',
                'h.xiShuai': '蟋蟀居壁',
                'h.yingShi': '鹰始挚',
                'h.fuCao': '腐草为萤',
                'h.tuRun': '土润溽暑',
                'h.daYu': '大雨行时',
                'h.liangFeng': '凉风至',
                'h.baiLu': '白露降',
                'h.hanChan': '寒蝉鸣',
                'h.yingNai': '鹰乃祭鸟',
                'h.tianDi': '天地始肃',
                'h.heNai': '禾乃登',
                'h.hongYanLai': '鸿雁来',
                'h.xuanNiaoGui': '玄鸟归',
                'h.qunNiao': '群鸟养羞',
                'h.leiShi': '雷始收声',
                'h.zheChongPiHu': '蛰虫坯户',
                'h.shuiShiHe': '水始涸',
                'h.hongYanLaiBin': '鸿雁来宾',
                'h.queRu': '雀入大水为蛤',
                'h.juYou': '菊有黄花',
                'h.caiNai': '豺乃祭兽',
                'h.caoMuHuangLuo': '草木黄落',
                'h.zheChongXianFu': '蛰虫咸俯',
                'h.shuiShiBing': '水始冰',
                'h.diShi': '地始冻',
                'h.zhiRu': '雉入大水为蜃',
                'h.hongCang': '虹藏不见',
                'h.tianQi': '天气上升地气下降',
                'h.biSe': '闭塞而成冬',
                'h.heDan': '鹖鴠不鸣',
                'h.huShi': '虎始交',
                'h.liTing': '荔挺出',
                'ts.zhan': '占',
                'ts.hu': '户',
                'ts.win': '窗',
                'ts.fang': '房',
                'ts.chuang': '床',
                'ts.lu': '炉',
                'ts.zao': '灶',
                'ts.dui': '碓',
                'ts.mo': '磨',
                'ts.xi': '栖',
                'ts.chu': '厨',
                'ts.ce': '厕',
                'ts.cang': '仓',
                'ts.cangKu': '仓库',
                'ts.daMen': '大门',
                'ts.men': '门',
                'ts.tang': '堂',
                'ly.xianSheng': '先胜',
                'ly.xianFu': '先负',
                'ly.youYin': '友引',
                'ly.foMie': '佛灭',
                'ly.daAn': '大安',
                'ly.chiKou': '赤口',
                'yj.jiSi': '祭祀',
                'yj.qiFu': '祈福',
                'yj.qiuSi': '求嗣',
                'yj.kaiGuang': '开光',
                'yj.suHui': '塑绘',
                'yj.qiJiao': '齐醮',
                'yj.zhaiJiao': '斋醮',
                'yj.muYu': '沐浴',
                'yj.chouShen': '酬神',
                'yj.zaoMiao': '造庙',
                'yj.siZhao': '祀灶',
                'yj.fenXiang': '焚香',
                'yj.xieTu': '谢土',
                'yj.chuHuo': '出火',
                'yj.diaoKe': '雕刻',
                'yj.jiaQu': '嫁娶',
                'yj.DingHun': '订婚',
                'yj.naCai': '纳采',
                'yj.wenMing': '问名',
                'yj.naXu': '纳婿',
                'yj.guiNing': '归宁',
                'yj.anChuang': '安床',
                'yj.heZhang': '合帐',
                'yj.guanJi': '冠笄',
                'yj.dingMeng': '订盟',
                'yj.jinRenKou': '进人口',
                'yj.caiYi': '裁衣',
                'yj.wanMian': '挽面',
                'yj.kaiRong': '开容',
                'yj.xiuFen': '修坟',
                'yj.qiZuan': '启钻',
                'yj.poTu': '破土',
                'yj.anZang': '安葬',
                'yj.liBei': '立碑',
                'yj.chengFu': '成服',
                'yj.chuFu': '除服',
                'yj.kaiShengFen': '开生坟',
                'yj.heShouMu': '合寿木',
                'yj.ruLian': '入殓',
                'yj.yiJiu': '移柩',
                'yj.puDu': '普渡',
                'yj.ruZhai': '入宅',
                'yj.anXiang': '安香',
                'yj.anMen': '安门',
                'yj.xiuZao': '修造',
                'yj.qiJi': '起基',
                'yj.dongTu': '动土',
                'yj.shangLiang': '上梁',
                'yj.shuZhu': '竖柱',
                'yj.kaiJing': '开井开池',
                'yj.zuoBei': '作陂放水',
                'yj.chaiXie': '拆卸',
                'yj.poWu': '破屋',
                'yj.huaiYuan': '坏垣',
                'yj.buYuan': '补垣',
                'yj.faMuZuoLiang': '伐木做梁',
                'yj.zuoZhao': '作灶',
                'yj.jieChu': '解除',
                'yj.kaiZhuYan': '开柱眼',
                'yj.chuanPing': '穿屏扇架',
                'yj.gaiWuHeJi': '盖屋合脊',
                'yj.kaiCe': '开厕',
                'yj.zaoCang': '造仓',
                'yj.saiXue': '塞穴',
                'yj.pingZhi': '平治道涂',
                'yj.zaoQiao': '造桥',
                'yj.zuoCe': '作厕',
                'yj.zhuDi': '筑堤',
                'yj.kaiChi': '开池',
                'yj.faMu': '伐木',
                'yj.kaiQu': '开渠',
                'yj.jueJing': '掘井',
                'yj.saoShe': '扫舍',
                'yj.fangShui': '放水',
                'yj.zaoWu': '造屋',
                'yj.heJi': '合脊',
                'yj.zaoChuChou': '造畜稠',
                'yj.xiuMen': '修门',
                'yj.dingSang': '定磉',
                'yj.zuoLiang': '作梁',
                'yj.xiuShi': '修饰垣墙',
                'yj.jiaMa': '架马',
                'yj.kaiShi': '开市',
                'yj.guaBian': '挂匾',
                'yj.naChai': '纳财',
                'yj.qiuCai': '求财',
                'yj.kaiCang': '开仓',
                'yj.maiChe': '买车',
                'yj.zhiChan': '置产',
                'yj.guYong': '雇庸',
                'yj.chuHuoCai': '出货财',
                'yj.anJiXie': '安机械',
                'yj.zaoCheQi': '造车器',
                'yj.jingLuo': '经络',
                'yj.yunNiang': '酝酿',
                'yj.zuoRan': '作染',
                'yj.guZhu': '鼓铸',
                'yj.zaoChuan': '造船',
                'yj.geMi': '割蜜',
                'yj.zaiZhong': '栽种',
                'yj.quYu': '取渔',
                'yj.jieWang': '结网',
                'yj.muYang': '牧养',
                'yj.anDuiWei': '安碓磑',
                'yj.xiYi': '习艺',
                'yj.ruXue': '入学',
                'yj.liFa': '理发',
                'yj.tanBing': '探病',
                'yj.jianGui': '见贵',
                'yj.chengChuan': '乘船',
                'yj.duShui': '渡水',
                'yj.zhenJiu': '针灸',
                'yj.chuXing': '出行',
                'yj.yiXi': '移徙',
                'yj.fenJu': '分居',
                'yj.TiTou': '剃头',
                'yj.zhengShou': '整手足甲',
                'yj.naChu': '纳畜',
                'yj.buZhuo': '捕捉',
                'yj.tianLie': '畋猎',
                'yj.jiaoNiuMa': '教牛马',
                'yj.huiQinYou': '会亲友',
                'yj.fuRen': '赴任',
                'yj.qiuYi': '求医',
                'yj.zhiBing': '治病',
                'yj.ciSong': '词讼',
                'yj.qiJiDongTu': '起基动土',
                'yj.poWuHuaiYuan': '破屋坏垣',
                'yj.gaiWu': '盖屋',
                'yj.zaoCangKu': '造仓库',
                'yj.liQuanJiaoYi': '立券交易',
                'yj.jiaoYi': '交易',
                'yj.liQuan': '立券',
                'yj.anJi': '安机',
                'yj.huiYou': '会友',
                'yj.qiuYiLiaoBing': '求医疗病',
                'yj.zhuShi': '诸事不宜',
                'yj.yuShi': '馀事勿取',
                'yj.xingSang': '行丧',
                'yj.duanYi': '断蚁',
                'yj.guiXiu': '归岫',
                'xx.bi': '毕',
                'xx.yi': '翼',
                'xx.ji': '箕',
                'xx.kui': '奎',
                'xx.gui': '鬼',
                'xx.di': '氐',
                'xx.xu': '虚',
                'xx.wei': '危',
                'xx.zi': '觜',
                'xx.zhen': '轸',
                'xx.dou': '斗',
                'xx.lou': '娄',
                'xx.liu': '柳',
                'xx.fang': '房',
                'xx.xin': '心',
                'xx.shi': '室',
                'xx.can': '参',
                'xx.jiao': '角',
                'xx.niu': '牛',
                'xx.vei': '胃',
                'xx.xing': '星',
                'xx.zhang': '张',
                'xx.tail': '尾',
                'xx.qiang': '壁',
                'xx.jing': '井',
                'xx.kang': '亢',
                'xx.nv': '女',
                'xx.mao': '昴',
                'sz.chun': '春',
                'sz.xia': '夏',
                'sz.qiu': '秋',
                'sz.dong': '冬',
                'od.first': '孟',
                'od.second': '仲',
                'od.third': '季',
                'yx.shuo': '朔',
                'yx.jiShuo': '既朔',
                'yx.eMeiXin': '蛾眉新',
                'yx.eMei': '蛾眉',
                'yx.xi': '夕',
                'yx.shangXian': '上弦',
                'yx.jiuYe': '九夜',
                'yx.night': '宵',
                'yx.jianYingTu': '渐盈凸',
                'yx.xiaoWang': '小望',
                'yx.wang': '望',
                'yx.jiWang': '既望',
                'yx.liDai': '立待',
                'yx.juDai': '居待',
                'yx.qinDai': '寝待',
                'yx.gengDai': '更待',
                'yx.jianKuiTu': '渐亏凸',
                'yx.xiaXian': '下弦',
                'yx.youMing': '有明',
                'yx.eMeiCan': '蛾眉残',
                'yx.can': '残',
                'yx.xiao': '晓',
                'yx.hui': '晦',
                'ny.sangZhe': '桑柘',
                'ny.baiLa': '白蜡',
                'ny.yangLiu': '杨柳',
                'ny.jinBo': '金箔',
                'ny.haiZhong': '海中',
                'ny.daHai': '大海',
                'ny.shaZhong': '沙中',
                'ny.luZhong': '炉中',
                'ny.shanXia': '山下',
                'ny.daLin': '大林',
                'ny.pingDi': '平地',
                'ny.luPang': '路旁',
                'ny.biShang': '壁上',
                'ny.jianFeng': '剑锋',
                'ny.shanTou': '山头',
                'ny.fuDeng': '覆灯',
                'ny.jianXia': '涧下',
                'ny.tianHe': '天河',
                'ny.chengTou': '城头',
                'ny.daYi': '大驿',
                'ny.chaiChuan': '钗钏',
                'ny.quanZhong': '泉中',
                'ny.daXi': '大溪',
                'ny.wuShang': '屋上',
                'ny.piLi': '霹雳',
                'ny.tianShang': '天上',
                'ny.songBo': '松柏',
                'ny.shiLiu': '石榴',
                'ny.changLiu': '长流'
            },
            en: {
                'tg.jia': 'Jia',
                'tg.yi': 'Yi',
                'tg.bing': 'Bing',
                'tg.ding': 'Ding',
                'tg.wu': 'Wu',
                'tg.ji': 'Ji',
                'tg.geng': 'Geng',
                'tg.xin': 'Xin',
                'tg.ren': 'Ren',
                'tg.gui': 'Gui',
                'dz.zi': 'Zi',
                'dz.chou': 'Chou',
                'dz.yin': 'Yin',
                'dz.mao': 'Mao',
                'dz.chen': 'Chen',
                'dz.si': 'Si',
                'dz.wu': 'Wu',
                'dz.wei': 'Wei',
                'dz.shen': 'Shen',
                'dz.you': 'You',
                'dz.xu': 'Xu',
                'dz.hai': 'Hai',
                'zx.jian': 'Build',
                'zx.chu': 'Remove',
                'zx.man': 'Full',
                'zx.ping': 'Flat',
                'zx.ding': 'Stable',
                'zx.zhi': 'Hold',
                'zx.po': 'Break',
                'zx.wei': 'Danger',
                'zx.cheng': 'Complete',
                'zx.shou': 'Collect',
                'zx.kai': 'Open',
                'zx.bi': 'Close',
                'jz.jiaZi': 'JiaZi',
                'jz.yiChou': 'YiChou',
                'jz.bingYin': 'BingYin',
                'jz.dingMao': 'DingMao',
                'jz.wuChen': 'WuChen',
                'jz.jiSi': 'JiSi',
                'jz.gengWu': 'GengWu',
                'jz.xinWei': 'XinWei',
                'jz.renShen': 'RenShen',
                'jz.guiYou': 'GuiYou',
                'jz.jiaXu': 'JiaXu',
                'jz.yiHai': 'YiHai',
                'jz.bingZi': 'BingZi',
                'jz.dingChou': 'DingChou',
                'jz.wuYin': 'WuYin',
                'jz.jiMao': 'JiMao',
                'jz.gengChen': 'GengChen',
                'jz.xinSi': 'XinSi',
                'jz.renWu': 'RenWu',
                'jz.guiWei': 'GuiWei',
                'jz.jiaShen': 'JiaShen',
                'jz.yiYou': 'YiYou',
                'jz.bingXu': 'BingXu',
                'jz.dingHai': 'DingHai',
                'jz.wuZi': 'WuZi',
                'jz.jiChou': 'JiChou',
                'jz.gengYin': 'GengYin',
                'jz.xinMao': 'XinMao',
                'jz.renChen': 'RenChen',
                'jz.guiSi': 'GuiSi',
                'jz.jiaWu': 'JiaWu',
                'jz.yiWei': 'YiWei',
                'jz.bingShen': 'BingShen',
                'jz.dingYou': 'DingYou',
                'jz.wuXu': 'WuXu',
                'jz.jiHai': 'JiHai',
                'jz.gengZi': 'GengZi',
                'jz.xinChou': 'XinChou',
                'jz.renYin': 'RenYin',
                'jz.guiMao': 'GuiMao',
                'jz.jiaChen': 'JiaChen',
                'jz.yiSi': 'YiSi',
                'jz.bingWu': 'BingWu',
                'jz.dingWei': 'DingWei',
                'jz.wuShen': 'WuShen',
                'jz.jiYou': 'JiYou',
                'jz.gengXu': 'GengXu',
                'jz.xinHai': 'XinHai',
                'jz.renZi': 'RenZi',
                'jz.guiChou': 'GuiChou',
                'jz.jiaYin': 'JiaYin',
                'jz.yiMao': 'YiMao',
                'jz.bingChen': 'BingChen',
                'jz.dingSi': 'DingSi',
                'jz.wuWu': 'WuWu',
                'jz.jiWei': 'JiWei',
                'jz.gengShen': 'GengShen',
                'jz.xinYou': 'XinYou',
                'jz.renXu': 'RenXu',
                'jz.guiHai': 'GuiHai',
                'sx.rat': 'Rat',
                'sx.ox': 'Ox',
                'sx.tiger': 'Tiger',
                'sx.rabbit': 'Rabbit',
                'sx.dragon': 'Dragon',
                'sx.snake': 'Snake',
                'sx.horse': 'Horse',
                'sx.goat': 'Goat',
                'sx.monkey': 'Monkey',
                'sx.rooster': 'Rooster',
                'sx.dog': 'Dog',
                'sx.pig': 'Pig',
                'dw.long': 'Dragon',
                'dw.niu': 'Ox',
                'dw.gou': 'Dog',
                'dw.yang': 'Goat',
                'dw.tu': 'Rabbit',
                'dw.shu': 'Rat',
                'dw.ji': 'Rooster',
                'dw.ma': 'Horse',
                'dw.hu': 'Tiger',
                'dw.zhu': 'Pig',
                'dw.hou': 'Monkey',
                'dw.she': 'Snake',
                'dw.huLi': 'Fox',
                'dw.yan': 'Swallow',
                'dw.bao': 'Leopard',
                'dw.yuan': 'Ape',
                'dw.yin': 'Earthworm',
                'dw.lu': 'Deer',
                'dw.wu': 'Crow',
                'dw.lang': 'Wolf',
                'dw.fu': 'Bat',
                'wx.jin': 'Metal',
                'wx.mu': 'Wood',
                'wx.shui': 'Water',
                'wx.huo': 'Fire',
                'wx.tu': 'Earth',
                'wx.ri': 'Sun',
                'wx.yue': 'Moon',
                'n.zero': '0',
                'n.one': '1',
                'n.two': '2',
                'n.three': '3',
                'n.four': '4',
                'n.five': '5',
                'n.six': '6',
                'n.seven': '7',
                'n.eight': '8',
                'n.nine': '9',
                'n.ten': '10',
                'n.eleven': '11',
                'n.twelve': '12',
                'w.sun': 'Sunday',
                'w.mon': 'Monday',
                'w.tues': 'Tuesday',
                'w.wed': 'Wednesday',
                'w.thur': 'Thursday',
                'w.fri': 'Friday',
                'w.sat': 'Saturday',
                'xz.aries': 'Aries',
                'xz.taurus': 'Taurus',
                'xz.gemini': 'Gemini',
                'xz.cancer': 'Cancer',
                'xz.leo': 'Leo',
                'xz.virgo': 'Virgo',
                'xz.libra': 'Libra',
                'xz.scorpio': 'Scorpio',
                'xz.sagittarius': 'Sagittarius',
                'xz.capricornus': 'Capricornus',
                'xz.aquarius': 'Aquarius',
                'xz.pisces': 'Pisces',
                'bg.qian': 'Qian',
                'bg.kun': 'Kun',
                'bg.zhen': 'Zhen',
                'bg.xun': 'Xun',
                'bg.kan': 'Kan',
                'bg.li': 'Li',
                'bg.gen': 'Gen',
                'bg.dui': 'Dui',
                'ps.center': 'Center',
                'ps.dong': 'East',
                'ps.nan': 'South',
                'ps.xi': 'West',
                'ps.bei': 'North',
                'ps.zhong': 'Center',
                'ps.zhengDong': 'East',
                'ps.zhengNan': 'South',
                'ps.zhengXi': 'West',
                'ps.zhengBei': 'North',
                'ps.dongBei': 'Northeast',
                'ps.dongNan': 'Southeast',
                'ps.xiBei': 'Northwest',
                'ps.xiNan': 'Southwest',
                'jq.dongZhi': 'Winter Solstice',
                'jq.xiaoHan': 'Lesser Cold',
                'jq.daHan': 'Great Cold',
                'jq.liChun': 'Spring Beginning',
                'jq.yuShui': 'Rain Water',
                'jq.jingZhe': 'Awakening from Hibernation',
                'jq.chunFen': 'Spring Equinox',
                'jq.qingMing': 'Fresh Green',
                'jq.guYu': 'Grain Rain',
                'jq.liXia': 'Beginning of Summer',
                'jq.xiaoMan': 'Lesser Fullness',
                'jq.mangZhong': 'Grain in Ear',
                'jq.xiaZhi': 'Summer Solstice',
                'jq.xiaoShu': 'Lesser Heat',
                'jq.daShu': 'Greater Heat',
                'jq.liQiu': 'Beginning of Autumn',
                'jq.chuShu': 'End of Heat',
                'jq.baiLu': 'White Dew',
                'jq.qiuFen': 'Autumnal Equinox',
                'jq.hanLu': 'Cold Dew',
                'jq.shuangJiang': 'First Frost',
                'jq.liDong': 'Beginning of Winter',
                'jq.xiaoXue': 'Light Snow',
                'jq.daXue': 'Heavy Snow',
                'sn.qingLong': 'Azure Dragon',
                'sn.baiHu': 'White Tiger',
                'sn.zhuQue': 'Rosefinch',
                'sn.xuanWu': 'Black Tortoise',
                'sn.tianEn': 'Serene Grace',
                'sn.siShen': 'Death',
                'sn.tianMa': 'Pegasus',
                'sn.baLong': 'Eight Dragon',
                'sn.jiuHu': 'Nine Tiger',
                'sn.qiNiao': 'Seven Bird',
                'sn.liuShe': 'Six Snake',
                's.none': 'None',
                's.goodLuck': 'Good luck',
                's.badLuck': 'Bad luck',
                's.yin': 'Yin',
                's.yang': 'Yang',
                's.white': 'White',
                's.black': 'Black',
                's.blue': 'Blue',
                's.green': 'Green',
                's.yellow': 'Yellow',
                's.red': 'Red',
                's.purple': 'Purple',
                'jr.chuXi': "Chinese New Year's Eve",
                'jr.chunJie': 'Luna New Year',
                'jr.yuanXiao': 'Lantern Festival',
                'jr.duanWu': 'Dragon Boat Festival',
                'jr.qiXi': 'Begging Festival',
                'jr.zhongQiu': 'Mid-Autumn Festival',
                'jr.laBa': 'Laba Festival',
                'jr.yuanDan': "New Year's Day",
                'jr.qingRen': "Valentine's Day",
                'jr.fuNv': "Women's Day",
                'jr.xiaoFei': 'Consumer Rights Day',
                'jr.zhiShu': 'Arbor Day',
                'jr.wuYi': "International Worker's Day",
                'jr.erTong': "Children's Day",
                'jr.qingNian': 'Youth Day',
                'jr.yuRen': "April Fools' Day",
                'jr.jianDang': "Party's Day",
                'jr.jianJun': 'Army Day',
                'jr.jiaoShi': "Teachers' Day",
                'jr.guoQing': 'National Day',
                'jr.wanShengYe': "All Saints' Eve",
                'jr.wanSheng': "All Saints' Day",
                'jr.pingAn': 'Christmas Eve',
                'jr.shengDan': 'Christmas Day',
                'ts.zhan': 'At',
                'ts.hu': 'Household',
                'ts.zao': 'Cooker',
                'ts.dui': 'Pestle',
                'ts.xi': 'Habitat',
                'ts.win': 'Window',
                'ts.fang': 'Room',
                'ts.chuang': 'Bed',
                'ts.lu': 'Stove',
                'ts.mo': 'Mill',
                'ts.chu': 'Kitchen',
                'ts.ce': 'Toilet',
                'ts.cang': 'Depot',
                'ts.cangKu': 'Depot',
                'ts.daMen': 'Gate',
                'ts.men': 'Door',
                'ts.tang': 'Hall',
                'ly.xianSheng': 'Win first',
                'ly.xianFu': 'Lose first',
                'ly.youYin': "Friend's referral",
                'ly.foMie': "Buddhism's demise",
                'ly.daAn': 'Great safety',
                'ly.chiKou': 'Chikagoro',
                'yj.jiSi': 'Sacrifice',
                'yj.qiFu': 'Pray',
                'yj.qiuSi': 'Seek heirs',
                'yj.kaiGuang': 'Consecretion',
                'yj.suHui': 'Paint sculptural',
                'yj.qiJiao': 'Build altar',
                'yj.zhaiJiao': 'Taoist rites',
                'yj.muYu': 'Bathing',
                'yj.chouShen': 'Reward gods',
                'yj.zaoMiao': 'Build temple',
                'yj.siZhao': 'Offer kitchen god',
                'yj.fenXiang': 'Burn incense',
                'yj.xieTu': 'Earth gratitude',
                'yj.chuHuo': 'Expel the flame',
                'yj.diaoKe': 'Carving',
                'yj.jiaQu': 'Marriage',
                'yj.DingHun': 'Engagement',
                'yj.naCai': 'Proposing',
                'yj.wenMing': 'Ask name',
                'yj.naXu': 'Uxorilocal marriage',
                'yj.guiNing': 'Visit parents',
                'yj.anChuang': 'Bed placing',
                'yj.heZhang': 'Make up accounts',
                'yj.guanJi': 'Crowning adulthood',
                'yj.dingMeng': 'Make alliance',
                'yj.jinRenKou': 'Adopt',
                'yj.caiYi': 'Dressmaking',
                'yj.wanMian': 'Cosmeticsurgery',
                'yj.kaiRong': 'Open face',
                'yj.xiuFen': 'Grave repair',
                'yj.qiZuan': 'Open coffin',
                'yj.poTu': 'Break earth',
                'yj.anZang': 'Burial',
                'yj.liBei': 'Tombstone erecting',
                'yj.chengFu': 'Formation of clothes',
                'yj.chuFu': 'Mourning clothes removal',
                'yj.kaiShengFen': 'Open grave',
                'yj.heShouMu': 'Make coffin',
                'yj.ruLian': 'Body placing',
                'yj.yiJiu': 'Move coffin',
                'yj.puDu': 'Save soul',
                'yj.ruZhai': 'Enter house',
                'yj.anXiang': 'Incenst placement',
                'yj.anMen': 'Door placing',
                'yj.xiuZao': 'Repair',
                'yj.qiJi': 'Digging',
                'yj.dongTu': 'Break ground',
                'yj.shangLiang': 'Beam placing',
                'yj.shuZhu': 'Erecting pillars',
                'yj.kaiJing': 'Open pond and well',
                'yj.zuoBei': 'Make pond and fill water',
                'yj.chaiXie': 'Smash house',
                'yj.poWu': 'Break house',
                'yj.huaiYuan': 'Demolish',
                'yj.buYuan': 'Mending',
                'yj.faMuZuoLiang': 'Make beams',
                'yj.zuoZhao': 'Make stove',
                'yj.jieChu': 'Removal',
                'yj.kaiZhuYan': 'Build beam',
                'yj.chuanPing': 'Build door',
                'yj.gaiWuHeJi': 'Cover house',
                'yj.kaiCe': 'Open toilet',
                'yj.zaoCang': 'Build depot',
                'yj.saiXue': 'Block nest',
                'yj.pingZhi': 'Repair roads',
                'yj.zaoQiao': 'Build bridge',
                'yj.zuoCe': 'Build toilet',
                'yj.zhuDi': 'Fill',
                'yj.kaiChi': 'Open pond',
                'yj.faMu': 'Lumbering',
                'yj.kaiQu': 'Canalization',
                'yj.jueJing': 'Dig well',
                'yj.saoShe': 'Sweep house',
                'yj.fangShui': 'Drainage',
                'yj.zaoWu': 'Build house',
                'yj.heJi': 'Close ridge',
                'yj.zaoChuChou': 'Livestock thickening',
                'yj.xiuMen': 'Repair door',
                'yj.dingSang': 'Fix stone',
                'yj.zuoLiang': 'Beam construction',
                'yj.xiuShi': 'Decorate wall',
                'yj.jiaMa': 'Erect horse',
                'yj.kaiShi': 'Opening',
                'yj.guaBian': 'Hang plaque',
                'yj.naChai': 'Accept wealth',
                'yj.qiuCai': 'Seek wealth',
                'yj.kaiCang': 'Open depot',
                'yj.maiChe': 'Buy car',
                'yj.zhiChan': 'Buy property',
                'yj.guYong': 'Hire',
                'yj.chuHuoCai': 'Delivery',
                'yj.anJiXie': 'Build machine',
                'yj.zaoCheQi': 'Build car',
                'yj.jingLuo': 'Build loom',
                'yj.yunNiang': 'Brew',
                'yj.zuoRan': 'Dye',
                'yj.guZhu': 'Cast',
                'yj.zaoChuan': 'Build boat',
                'yj.geMi': 'Harvest honey',
                'yj.zaiZhong': 'Farming',
                'yj.quYu': 'Fishing',
                'yj.jieWang': 'Netting',
                'yj.muYang': 'Graze',
                'yj.anDuiWei': 'Build rub',
                'yj.xiYi': 'Learn',
                'yj.ruXue': 'Enter school',
                'yj.liFa': 'Haircut',
                'yj.tanBing': 'Visiting',
                'yj.jianGui': 'Meet noble',
                'yj.chengChuan': 'Ride boat',
                'yj.duShui': 'Cross water',
                'yj.zhenJiu': 'Acupuncture',
                'yj.chuXing': 'Travel',
                'yj.yiXi': 'Move',
                'yj.fenJu': 'Live apart',
                'yj.TiTou': 'Shave',
                'yj.zhengShou': 'Manicure',
                'yj.naChu': 'Feed livestock',
                'yj.buZhuo': 'Catch',
                'yj.tianLie': 'Hunt',
                'yj.jiaoNiuMa': 'Train horse',
                'yj.huiQinYou': 'Meet friends',
                'yj.fuRen': 'Go post',
                'yj.qiuYi': 'See doctor',
                'yj.zhiBing': 'Treat',
                'yj.ciSong': 'Litigation',
                'yj.qiJiDongTu': 'Lay foundation',
                'yj.poWuHuaiYuan': 'Demolish',
                'yj.gaiWu': 'Build house',
                'yj.zaoCangKu': 'Build depot',
                'yj.liQuanJiaoYi': 'Covenant trade',
                'yj.jiaoYi': 'Trade',
                'yj.liQuan': 'Covenant',
                'yj.anJi': 'Install machine',
                'yj.huiYou': 'Meet friends',
                'yj.qiuYiLiaoBing': 'Seek treatment',
                'yj.zhuShi': 'Everything Sucks',
                'yj.yuShi': 'Do nothing else',
                'yj.xingSang': 'Funeral',
                'yj.duanYi': 'Block ant hole',
                'yj.guiXiu': 'Place beam',
                'xx.bi': 'Finish',
                'xx.yi': 'Wing',
                'xx.ji': 'Sieve',
                'xx.kui': 'Qui',
                'xx.gui': 'Ghost',
                'xx.di': 'Foundation',
                'xx.xu': 'Virtual',
                'xx.wei': 'Danger',
                'xx.zi': 'Mouth',
                'xx.zhen': 'Cross-bar',
                'xx.dou': 'Fight',
                'xx.lou': 'Weak',
                'xx.liu': 'Willow',
                'xx.fang': 'House',
                'xx.xin': 'Heart',
                'xx.shi': 'Room',
                'xx.can': 'Join',
                'xx.jiao': 'Horn',
                'xx.niu': 'Ox',
                'xx.vei': 'Stomach',
                'xx.xing': 'Star',
                'xx.zhang': 'Chang',
                'xx.tail': 'Tail',
                'xx.qiang': 'Wall',
                'xx.jing': 'Well',
                'xx.kang': 'Kang',
                'xx.nv': 'Female',
                'xx.mao': 'Mao',
                'sz.chun': 'Spring',
                'sz.xia': 'Summer',
                'sz.qiu': 'Autumn',
                'sz.dong': 'Winter',
                'yx.shuo': 'New',
                'yx.eMeiXin': 'New waxing',
                'yx.eMei': 'Waxing',
                'yx.xi': 'Evening',
                'yx.shangXian': 'First quarter',
                'yx.jiuYe': 'Nine night',
                'yx.night': 'Night',
                'yx.jianYingTu': 'Gibbous',
                'yx.xiaoWang': 'Little full',
                'yx.wang': 'Full',
                'yx.jianKuiTu': 'Disseminating',
                'yx.xiaXian': 'Third quarter',
                'yx.eMeiCan': 'Waning waxing',
                'yx.can': 'Waning',
                'yx.xiao': 'Daybreak',
                'yx.hui': 'Obscure',
                'ny.sangZhe': 'Cudrania',
                'ny.baiLa': 'Wax',
                'ny.yangLiu': 'Willow',
                'ny.jinBo': 'Foil',
                'ny.haiZhong': 'Sea',
                'ny.daHai': 'Ocean',
                'ny.shaZhong': 'Sand',
                'ny.luZhong': 'Stove',
                'ny.shanXia': 'Piedmont',
                'ny.daLin': 'Forest',
                'ny.pingDi': 'Land',
                'ny.luPang': 'Roadside',
                'ny.biShang': 'Wall',
                'ny.jianFeng': 'Blade',
                'ny.shanTou': 'Hilltop',
                'ny.fuDeng': 'Light',
                'ny.jianXia': 'Valleyn',
                'ny.tianHe': 'River',
                'ny.chengTou': 'City',
                'ny.daYi': 'Post',
                'ny.chaiChuan': 'Ornaments',
                'ny.quanZhong': 'Spring',
                'ny.daXi': 'Stream',
                'ny.wuShang': 'Roof',
                'ny.piLi': 'Thunderbolt',
                'ny.tianShang': 'Sky',
                'ny.songBo': 'Coniferin',
                'ny.shiLiu': 'Pomegranate',
                'ny.changLiu': 'Flows'
            }
        };

        var _objs = {
            LunarUtil: LunarUtil,
            SolarUtil: SolarUtil
        };
        var _dictString = {
            LunarUtil: {
                TIAN_SHEN_TYPE: {},
                TIAN_SHEN_TYPE_LUCK: {},
                XIU_LUCK: {},
                LU: {},
                XIU: {},
                SHA: {},
                POSITION_DESC: {},
                NAYIN: {},
                WU_XING_GAN: {},
                WU_XING_ZHI: {},
                SHOU: {},
                GONG: {},
                FESTIVAL: {},
                ZHENG: {},
                ANIMAL: {},
                SHI_SHEN_GAN: {},
                SHI_SHEN_ZHI: {},
                XIU_SONG: {}
            },
            SolarUtil: {
                FESTIVAL: {}
            }
        };
        var _dictNumber = {
            LunarUtil: {
                ZHI_TIAN_SHEN_OFFSET: {},
                CHANG_SHENG_OFFSET: {}
            }
        };
        var _dictArray = {
            LunarUtil: {
                ZHI_HIDE_GAN: {}
            }
        };
        var _arrays = {
            LunarUtil: {
                GAN: [],
                ZHI: [],
                JIA_ZI: [],
                ZHI_XING: [],
                XUN: [],
                XUN_KONG: [],
                CHONG: [],
                CHONG_GAN: [],
                CHONG_GAN_TIE: [],
                HE_GAN_5: [],
                HE_ZHI_6: [],
                SHENGXIAO: [],
                NUMBER: [],
                POSITION_XI: [],
                POSITION_YANG_GUI: [],
                POSITION_YIN_GUI: [],
                POSITION_FU: [],
                POSITION_FU_2: [],
                POSITION_CAI: [],
                POSITION_TAI_SUI_YEAR: [],
                POSITION_GAN: [],
                POSITION_ZHI: [],
                JIE_QI: [],
                JIE_QI_IN_USE: [],
                TIAN_SHEN: [],
                SHEN_SHA: [],
                PENGZU_GAN: [],
                PENGZU_ZHI: [],
                MONTH_ZHI: [],
                CHANG_SHENG: [],
                HOU: [],
                WU_HOU: [],
                POSITION_TAI_DAY: [],
                POSITION_TAI_MONTH: [],
                YI_JI: [],
                LIU_YAO: [],
                MONTH: [],
                SEASON: [],
                DAY: [],
                YUE_XIANG: []
            },
            SolarUtil: {
                WEEK: [],
                XINGZUO: []
            }
        };

        var _updateArray = function (c) {
            var v = _arrays[c];
            var o = _objs[c];
            for (var k in v) {
                var arr = v[k];
                for (var i = 0, j = arr.length; i < j; i++) {
                    o[k][i] = arr[i].replace(/{(.[^}]*)}/g, function ($0, $1) {
                        return _getMessage($1);
                    });
                }
            }
        };

        var _updateStringDictionary = function (c) {
            var v = _dictString[c];
            var o = _objs[c];
            for (var k in v) {
                var dict = v[k];
                for (var key in dict) {
                    var i = key.replace(/{(.[^}]*)}/g, function ($0, $1) {
                        return _getMessage($1);
                    });
                    o[k][i] = dict[key].replace(/{(.[^}]*)}/g, function ($0, $1) {
                        return _getMessage($1);
                    });
                }
            }
        };

        var _updateNumberDictionary = function (c) {
            var v = _dictNumber[c];
            var o = _objs[c];
            for (var k in v) {
                var dict = v[k];
                for (var key in dict) {
                    var i = key.replace(/{(.[^}]*)}/g, function ($0, $1) {
                        return _getMessage($1);
                    });
                    o[k][i] = dict[key];
                }
            }
        };

        var _updateArrayDictionary = function (c) {
            var v = _dictArray[c];
            var o = _objs[c];
            for (var k in v) {
                var dict = v[k];
                for (var key in dict) {
                    var x = key.replace(/{(.[^}]*)}/g, function ($0, $1) {
                        return _getMessage($1);
                    });
                    var arr = dict[key];
                    for (var i = 0, j = arr.length; i < j; i++) {
                        arr[i] = arr[i].replace(/{(.[^}]*)}/g, function ($0, $1) {
                            return _getMessage($1);
                        });
                    }
                    o[k][x] = arr;
                }
            }
        };

        var _update = function () {
            var c;
            for (c in _arrays) {
                _updateArray(c);
            }
            for (c in _dictString) {
                _updateStringDictionary(c);
            }
            for (c in _dictNumber) {
                _updateNumberDictionary(c);
            }
            for (c in _dictArray) {
                _updateArrayDictionary(c);
            }
        };

        var _setLanguage = function (lang) {
            if (_messages[lang]) {
                _lang = lang;
                _update();
            }
        };

        var _getLanguage = function () {
            return _lang;
        };

        var _setMessages = function (lang, messages) {
            if (!messages) {
                return;
            }
            if (!_messages[lang]) {
                _messages[lang] = {};
            }
            for (var key in messages) {
                _messages[lang][key] = messages[key];
            }
            _update();
        };

        var _getMessage = function (key) {
            var s = _messages[_lang][key];
            if (undefined === s) {
                s = _messages[_defaultLang][key];
            }
            if (undefined === s) {
                s = key;
            }
            return s;
        };

        var _initArray = function (c) {
            var v = _arrays[c];
            var o = _objs[c];

            for (var k in v) {
                v[k].length = 0;
                var arr = o[k];
                if (arr) {
                    for (var i = 0, j = arr.length; i < j; i++) {
                        v[k].push(arr[i]);
                    }
                }
            }
        };

        var _initDictionary = function (c, type) {
            var v;
            switch (type) {
                case 'string':
                    v = _dictString[c];
                    break;
                case 'number':
                    v = _dictNumber[c];
                    break;
                case 'array':
                    v = _dictArray[c];
                    break;
                default:
            }
            var o = _objs[c];
            for (var k in v) {
                var dict = o[k];
                for (var key in dict) {
                    v[k][key] = dict[key];
                }
            }
        };

        var _init = function () {
            if (_inited) {
                return;
            }
            _inited = true;
            var c;
            for (c in _arrays) {
                _initArray(c);
            }
            for (c in _dictString) {
                _initDictionary(c, 'string');
            }
            for (c in _dictNumber) {
                _initDictionary(c, 'number');
            }
            for (c in _dictArray) {
                _initDictionary(c, 'array');
            }
            _setLanguage(_defaultLang);
        };
        _init();
        return {
            getLanguage: function () {
                return _getLanguage();
            },
            setLanguage: function (lang) {
                _setLanguage(lang);
            },
            getMessage: function (key) {
                return _getMessage(key);
            },
            setMessages: function (lang, messages) {
                _setMessages(lang, messages);
            }
        };
    })();
    return {
        // ShouXingUtil: ShouXingUtil,
        // SolarUtil: SolarUtil,
        // LunarUtil: LunarUtil,
        Solar: Solar,
        Lunar: Lunar,
        // Foto: Foto,
        // Tao: Tao,
        // NineStar: NineStar,
        EightChar: EightChar
        // SolarWeek: SolarWeek,
        // SolarMonth: SolarMonth,
        // SolarSeason: SolarSeason,
        // SolarHalfYear: SolarHalfYear,
        // SolarYear: SolarYear,
        // LunarMonth: LunarMonth,
        // LunarYear: LunarYear,
        // LunarTime: LunarTime,
        // I18n: I18n
    };
}
export {Lunar1};
