import axios from 'axios';

const base = 'http://192.168.0.105';

// 添加请求拦截器
axios.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        console.log('111');
    }
);
// 添加响应拦截器
// axios.interceptors.response.use(
//     function (response) {
//         // 对响应数据做点什么
//         // if (response != undefined && response != '' && JSON.stringify(response) != '{}' && JSON.stringify(response) != '[]') {
//         return response;
//         // } else {
//         //     router.push({ name: 'notFound' })
//         // }
//     },
//     function (error) {
//         // 对响应错误做点什么
//         console.log(error);
//     }
// );

export const getUserData = params => {
    return axios.get(`${base}:8005/fetch_user_data`, {params: params}).then(res => res.data);
};
export const setUserData = params => {
    return axios.post(`${base}:8005/set_login_data`, params).then(res => console.log(res));
};
export const setBaziRecord = params => {
    return axios.post(`${base}:8006/set_bazi_record`, params).then(res => console.log(res));
};
export const getBaziRecord = params => {
    return axios.get(`${base}:8006/fetch_bazi_record`, {params: params}).then(res => res.data);
};
