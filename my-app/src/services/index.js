import { message } from 'antd';

import io from 'socket.io-client';

const pageLocation = `${window.location.protocol + "//" + window.location.host}`;
let socketPort = ':3102';
if (window.location.protocol === 'https:') {
    socketPort = ':3103'
}
const isDev = window.location.port === '3000' ? true : false;
export let socket = {}
if (!isDev) {
    // console.log(`${pageLocation}${socketPort}`);
    socket = io(`${window.location.protocol + "//" + window.location.hostname}${socketPort}`, {path: '/socketio'});
} else {
    socket = io('http://10.12.175.14:4000');
}

// console.log(`${pageLocation}:3102`);

let firstConnected = false;
socket.on('connect', function () {
    // message.success('连接成功', 1);
    console.log('socket connect');
    if (!firstConnected) {
        firstConnected = true
    } else {
        console.log('reconnect');
        socket.afterReconnect();
    }
});
socket.on('disconnect', function () {
    // message.error('与服务器连接断开');
    console.log('socket disconnect');
});





export const gameConfig = () => {
    const rs = {}
    if (!isDev) {
        window.phoenix.Games.BTCCTP.getInstance();
        rs.gameConfigdata = window.phoenix.Games.getCurrentGame().getGameConfig().getInstance().defConfig
    } else {
        rs.gameConfigdata = {
            "gameType": "btcctp",
            "gameTypeCn": null,
            "lotteryId": 99901,
            "awardGroups": [{
                "gid": 238,
                "awardGroupId": 40437404,
                "awardName": "奖金组1800",
                "betType": 1,
                "directRet": 450,
                "threeoneRet": 0,
                "sbThreeOne": 0,
                "superRet": 0,
                "lhcYear": 0,
                "lhcColor": 0,
                "lhcFlatcode": 0,
                "lhcHalfwave": 0,
                "lhcOneyear": 0,
                "lhcNotin": 0,
                "lhcContinuein23": 0,
                "lhcContinuein4": 0,
                "lhcContinuein5": 0,
                "lhcContinuenotin23": 0,
                "lhcContinuenotin4": 0,
                "lhcContinuenotin5": 0,
                "lhcContinuecode": 0,
                "createTime": 1555991817000,
                "updateTimte": 1555991817000,
                "awardGroupRetStatus": 0
            }],
            "userId": 1339826,
            "userName": "hsia01",
            "userNickName": "tt1",
            "userLvl": 1,
            "awardRetStatus": null,
            "awardGroupRetStatus": null,
            "backOutStartFee": null,
            "backOutRadio": null,
            "isSupport2000": false,
            "isLotteryStopSale": false,
            "isfirstimeuse2000": null,
            "isfirstimeusediamond2000": null,
            "isSpecial": false,
            "betMoneyMode": ["1"],
            "helpLink": null,
            "sourceList": null
        }
    }
    
    return rs.gameConfigdata;
}



const apiUrl = {
    getmyip: 'http://httpbin.org/ip', // for example
    getGameConfig: '/gameBet/btcctp/config',
    getBetHistroy: '/gameTrend/betHistroyInfo',
    getBetRank: '/gameTrend/collectBtcctpGameDrawResult',
    getLastNumber: '/gameBet/btcctp/lastNumber',
    submitBet: '/gameBet/btcctp/submit',
    submitNickname: '/gameBet/saveUserHeadImg',
    getBetAward: '/gameBet/btcctp/getBetAward'
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
    const url = new URL(`${pageLocation}/${apiUrl[eventName]}`);
    url.search = new URLSearchParams(...args);
    
    return new Promise((resolve, reject) => {
        window.fetch(url,{
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: new Headers({
                'Content-Type': 'application/json',
                'pragma': 'no-cache',
                'cache-control': 'no-cache'
            })
        })
        .then(function(response){
            // console.log(response);
            try {
                return response.json();
            } catch(err) {
                reject(err)
            }
        })
        .then(function(data){
            // console.log(data);
            resolve(data);
        })
        .catch(function(err){
            console.log(err);
            reject(err)
            // message.error('请求超时无响应');
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
 * getGameConfig
 */
export const getGameConfig = () => {
    if (isDev) {
        
        return new Promise((resolve, reject) => {
            const data = {
                "gameType": null,
                "gameTypeCn": null,
                "defaultMethod": null,
                "lotteryId": null,
                "userLvl": 2,
                "userId": 1344839,
                "userName": "chris010",
                "awardRetStatus": null,
                "awardGroupRetStatus": null,
                "lhcStatus": null,
                "pk10Status": null,
                "backOutStartFee": null,
                "backOutRadio": null,
                "isSupport2000": null,
                "isfirstimeuse2000": null,
                "isfirstimeusediamond2000": null,
                "isSpecial": null,
                "betMoneyMode": null,
                "gameMethods": null,
                "awardGroups": null,
                "dynamicConfigUrl": null,
                "uploadPath": null,
                "queryUserBalUrl": null,
                "getUserOrdersUrl": null,
                "getUserPlansUrl": null,
                "getHandingChargeUrl": null,
                "getBetAwardUrl": null,
                "getHotColdUrl": null,
                "trendChartUrl": null,
                "getLotteryLogoPath": null,
                "queryGameUserAwardGroupByLotteryIdUrl": null,
                "saveProxyBetGameAwardGroupUrl": null,
                "sumbitUrl": null,
                "indexInit": null,
                "poolBouns": null,
                "isLotteryStopSale": null,
                "lastNumberUrl": null,
                "sourceList": null,
                "helpLink": null,
                "chips": [1, 2, 5, 10, 20, 50, 100, 500, 1000, 5000],
                "chipsSelected": [10, 20, 50, 100, 500],
                "ballLists": null,
                "gameOdds": null,
                "gameZodiac": null,
                "gameTips": null,
                "queryStraightOddsUrl": null,
                "playerBetUrl": null,
                "winningListUrl": null,
                "headImg": null,
                "userNickName": "柯里斯大",
                "uploadUserInfo": null,
                "historyLotteryAwardUrl": null
            }

            resolve(data);
            
        }).catch(err => {
            message.error('请求超时无响应');
            // throw err;
        });

    } else {
        return generateEvent('getGameConfig')();
        // const url = new URL(`${pageLocation}/${apiUrl['getGameConfig']}`);
        // url.search = new URLSearchParams({});
    
        // return new Promise((resolve, reject) => {
        //     fetch(url)
        //     .then(function(response){
        //         try {
        //             return response.json();
        //         } catch(err) {
        //             reject(err)
        //         }
        //     })
        //     .then(function(data){
        //         // console.log(data);
        //         resolve(data);
        //     })
        //     .catch(function(err){
        //         console.log(err);
        //         reject(err)
        //         // message.error('请求超时无响应');
        //     });
            
        // }).catch(err => {
        //     message.error('请求超时无响应');
        //     // throw err;
        // });
    }
    
}

/**
 * get betHistroy
 */
export const getBetHistroy = (...args) => {
    return generateEvent('getBetHistroy')(...args);

    // return new Promise((resolve, reject) => {
    //     const data = {
    //         "result": {
    //             "list": [
    //                 {
    //                     "code": "1",
    //                     "issue": "12344",
    //                     "lotteryid": 0,
    //                     "time": "111",
    //                     "number": "1.4"
    //                 },
    //                 {
    //                     "code": "1",
    //                     "issue": "12343",
    //                     "lotteryid": 0,
    //                     "time": "111",
    //                     "number": "4.9"
    //                 }
    //             ]
    //         }
    //     }
    //     resolve(data);
    // }).catch(err => {
    //     message.error('请求超时无响应');
    //     // throw err;
    // });
}

/**
 * get rank data
 */
export const getBetRank = (...args) => {
    return generateEvent('getBetRank')(...args);

    /* return new Promise((resolve, reject) => {
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
    }); */
}

/**
 * get lastNumber
 */
export const getLastNumber = (...args) => {
    if (isDev) {


        return new Promise((resolve, reject) => {
            const data = {
                "username": "hsia01",
                "lastnumber": "20190628-1297",
                "lastballs": "5.65",
                "ballInfo": null,
                "isstop": 0,
                "number": "20190628-1298",
                "issueCode": 201906289011298,
                "nowtime": "2019/06/28 14:07:07",
                "nowstoptime": "2019/06/28 14:07:27",
                "resulttime": "2019/06/28 14:06:46",
                "winlists": null,
                "prizeBet": null
            }
            resolve(data);
        }).catch(err => {
            message.error('请求超时无响应');
            // throw err;
        });
    } else {
        return generateEvent('getLastNumber')();

        // const url = new URL(`${pageLocation}/${apiUrl['getLastNumber']}`);
        // url.search = new URLSearchParams({});
    
        // return new Promise((resolve, reject) => {
        //     fetch(url)
        //     .then(function(response){
        //         try {
        //             return response.json();
        //         } catch(err) {
        //             reject(err)
        //         }
        //     })
        //     .then(function(data){
        //         // console.log(data);
        //         resolve(data);
        //     })
        //     .catch(function(err){
        //         console.log(err);
        //         reject(err)
        //         // message.error('请求超时无响应');
        //     });
            
        // }).catch(err => {
        //     message.error('请求超时无响应');
        //     // throw err;
        // });
    }

}

/**
 * get BetAward
 */
export const getBetAward = (...args) => {
    if (isDev) {
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

            setTimeout(()=>{
                resolve(data);
            },500)
            
        }).catch(err => {
            message.error('请求超时无响应');
            // throw err;
        });
    } else {
        return generateEvent('getBetAward')(...args);
    }

}

/**
 * submit bet
 */
export const submitBet = (...args) => {
    return new Promise((resolve, reject) => {
        window.fetch(apiUrl['submitBet'], {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(...args), // data can be `string` or {object}!
            mode: 'cors',
            credentials: 'include',
            headers: new Headers({
                'Content-Type': 'application/json',
                'pragma': 'no-cache',
                'cache-control': 'no-cache'
            })
        })
        .then(function(response){
            try {
                return response.json();
            } catch(err) {
                reject(err)
            }
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

        // const data = {
        //     "isSuccess": 1,
        //     "msg": "恭喜您投注成功~!",
        //     "type": "success",
        //     "balance": 0.0,
        //     "data": {
        //         "handingcharge": null,
        //         "projectId": "DCQC1906260355qd",
        //         "writeTime": "2019-06-26 15:35:53",
        //         "result": null,
        //         "totalprice": 200,
        //         "winMoney": null,
        //         "winNum": null,
        //         "orderId": 29395527,
        //         "number": "20190626-035",
        //         "diamondLv": null,
        //         "diamondTimes": null,
        //         "tplData": {
        //             "msg": "恭喜您投注成功~!",
        //             "lotteryType": null,
        //             "currentGameNumber": null,
        //             "balls": null,
        //             "bitDate": null
        //         },
        //         "blockadeInfo": null,
        //         "orderData": null,
        //         "overMutipleData": null,
        //         "list": null
        //     }
        // }
        // resolve(data);
    }).catch(err => {
        message.error('请求超时无响应');
        // throw err;
    });
}

/**
 * submit nick name
 */
export const submitNickname = (...args) => {
    return generateEvent('submitNickname')(...args);
}