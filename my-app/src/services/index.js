import { message } from 'antd';

import io from 'socket.io-client';

export const socket = io('http://localhost:4000');
// export const socket = io('http://10.3.170.51:7001');

socket.on('connect', function () {
    message.success('连接成功', 1);
});
socket.on('disconnect', function () {
    message.fail('与服务器连接断开');
});


const apiUrl = {
    getmyip: 'http://httpbin.org/ip', // for example
    getBetHistroy: '/gameTrend/betHistroyInfo',
    getBetRank: '/gameTrend/collectBtcctpGameDrawResult',
    getLastNumber: '/gameBet/btcctp/lastNumber',
    submitBet: 'gameBet/btcctp/submit'
}

// socket.emit(eventName[, ...args][, ack])
// export const getPlayerBets = (...args) => {
//     return new Promise((resolve, reject) => {
//         socket.emit('makeNumber', ...args, function (res) {
//             resolve(res);
//             console.log(res);
//         });
//         setTimeout(() => {
//             reject('makeNumber 请求超时无响应');
//         }, 3000);
        
//     }).catch(err => {
//         message.error('请求超时无响应');
//         // throw err;
//     });
// }


/**
 * change to promise
 * usage:
 * login({user: 'robin', password: '123'}).then(res => {
 *    res.success === '1' && console.log('登录成功');
 *    // or
 *    dispatch(loginSuccess(res));
 * })
 * @param {*} args 
 */
// curry and exchange to Promise
const generateEvent = eventName => (...args) => {
    return new Promise((resolve, reject) => {
        fetch(apiUrl[eventName])
        .then(function(response){
            // console.log(response);

            // check isSuccess or throw reject
            return response.json();
        })
        .then(function(data){
            // console.log(data);
            resolve(data);
        })
        .catch(function(err){
            console.log(err);
            reject(err)
            message.error('请求超时无响应');
        });
        
    }).catch(err => {
        message.error('请求超时无响应');
        // throw err;
    });
}

/**
 * getip for example
 */
export const getmyip = (...args) => {
    return generateEvent('getmyip')(...args);
}

/**
 * get betHistroy
 */
export const getBetHistroy = (...args) => {
    // return generateEvent('getBetHistroy')(...args);

    return new Promise((resolve, reject) => {
        const data = {
            "result": {
                "list": [
                    {
                        "code": "1",
                        "issue": "12344",
                        "lotteryid": 0,
                        "time": "111",
                        "number": "1.4"
                    },
                    {
                        "code": "1",
                        "issue": "12343",
                        "lotteryid": 0,
                        "time": "111",
                        "number": "4.9"
                    },
                    {
                        "code": "1",
                        "issue": "12342",
                        "lotteryid": 0,
                        "time": "111",
                        "number": "4.9"
                    },
                    {
                        "code": "1",
                        "issue": "12341",
                        "lotteryid": 0,
                        "time": "111",
                        "number": "1.4"
                    },
                    {
                        "code": "1",
                        "issue": "12340",
                        "lotteryid": 0,
                        "time": "111",
                        "number": "1.4"
                    },
                    {
                        "code": "1",
                        "issue": "12343",
                        "lotteryid": 0,
                        "time": "111",
                        "number": "4.9"
                    },
                    {
                        "code": "1",
                        "issue": "12342",
                        "lotteryid": 0,
                        "time": "111",
                        "number": "4.9"
                    },
                    {
                        "code": "1",
                        "issue": "12341",
                        "lotteryid": 0,
                        "time": "111",
                        "number": "1.4"
                    },
                    {
                        "code": "1",
                        "issue": "12340",
                        "lotteryid": 0,
                        "time": "111",
                        "number": "1.4"
                    },
                    {
                        "code": "1",
                        "issue": "12343",
                        "lotteryid": 0,
                        "time": "111",
                        "number": "4.9"
                    },
                    {
                        "code": "1",
                        "issue": "12342",
                        "lotteryid": 0,
                        "time": "111",
                        "number": "4.9"
                    },
                    {
                        "code": "1",
                        "issue": "12341",
                        "lotteryid": 0,
                        "time": "111",
                        "number": "1.4"
                    },
                    {
                        "code": "1",
                        "issue": "12340",
                        "lotteryid": 0,
                        "time": "111",
                        "number": "1.4"
                    }
                ]
            }

        }
        resolve(data);
    }).catch(err => {
        message.error('请求超时无响应');
        // throw err;
    });
}

/**
 * get rank data
 */
export const getBetRank = (...args) => {
    // return generateEvent('getBetRank')(...args);

    return new Promise((resolve, reject) => {
        const data = {
            "1.00": 22,
            "1.01-1.50": 10,
            "1.51-1.99": 22,
            "2.00-2.99": 10,
            "3.00-4.99": 22,
            "5.00-9.99": 10,
            "10.00-49.99": 22,
            "50以上": 10
        }
        resolve(data);
    }).catch(err => {
        message.error('请求超时无响应');
        // throw err;
    });
}

/**
 * get lastNumber
 */
export const getLastNumber = (...args) => {
    // return generateEvent('getLastNumber')(...args);

    return new Promise((resolve, reject) => {
        const data = {
            "username": "hsia01",
            "lastnumber": "20190625-0875",
            "lastballs": "2,3,2,0,6",
            "ballInfo": null,
            "isstop": 0,
            "number": "20190625-0876",
            "issueCode": 201906251150876,
            "nowtime": "2019/06/25 14:35:12",
            "nowstoptime": "2019/06/25 14:35:55",
            "resulttime": "2019/06/25 14:34:55",
            "winlists": null,
            "prizeBet": null
        }
        resolve(data);
    }).catch(err => {
        message.error('请求超时无响应');
        // throw err;
    });
}

/**
 * get BetAward
 */
export const getBetAward = (...args) => {
    // return generateEvent('getBetAward')(...args);

    return new Promise((resolve, reject) => {
        const data = {
            "isSuccess": 1,
            "type": "userError",
            "msg": "success",
            "moreBouns": false,
            "data": {
                "gameTips": {
                    "example": "投注：**456</br>开奖：**456</br>奖金：\"1800\"元",
                    "tips": "每位至少选择一个号码，竞猜开奖号码的后三位，号码和位置都对应即中奖，奖金\"1800\"元",
                    "actualBonus": 1800.0,
                    "theoryBonus": 2000.0,
                    "retPoint": 4.5
                },
                "frequency": []
            }
        }
        resolve(data);
    }).catch(err => {
        message.error('请求超时无响应');
        // throw err;
    });
}

/**
 * submit bet
 */
export const submitBet = (...args) => {
    return new Promise((resolve, reject) => {
        /* fetch(apiUrl['submitBet'], {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(...args), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(function(response){
            // console.log(response);
            // check isSuccess or throw reject
            return response.json();
        })
        .then(function(data){
            // console.log(data);
            resolve(data);
        })
        .catch(function(err){
            console.log(err);
            reject(err)
            message.error('请求超时无响应');
        }); */

        const data = {
            "isSuccess": 1,
            "msg": "恭喜您投注成功~!",
            "type": "success",
            "balance": 0.0,
            "data": {
                "handingcharge": null,
                "projectId": "DCQC1906260355qd",
                "writeTime": "2019-06-26 15:35:53",
                "result": null,
                "totalprice": 200,
                "winMoney": null,
                "winNum": null,
                "orderId": 29395527,
                "number": "20190626-035",
                "diamondLv": null,
                "diamondTimes": null,
                "tplData": {
                    "msg": "恭喜您投注成功~!",
                    "lotteryType": null,
                    "currentGameNumber": null,
                    "balls": null,
                    "bitDate": null
                },
                "blockadeInfo": null,
                "orderData": null,
                "overMutipleData": null,
                "list": null
            }
        }
        resolve(data);
    }).catch(err => {
        message.error('请求超时无响应');
        // throw err;
    });
}