import { message } from 'antd';

import io from 'socket.io-client';

const pageLocation = `${window.location.protocol + "//" + window.location.host}`;
let socketPort = ':3102';
if (window.location.protocol === 'https:') {
    socketPort = ':3103'
}

const isDev = window.location.hostname === 'localhost' ? true : false;
export let socket = {}
if (!isDev) {
    if (window.location.hostname === 'em.fhhd.net') {
        socket = io(`https://em.fhhd.net:8443`, {path: '/socketio'});
    } else {
        // console.log(`${pageLocation}${socketPort}`);
        socket = io(`${window.location.protocol + "//" + window.location.hostname}${socketPort}`, {path: '/socketio'});
    }
    
} else {
    socket = io('http://10.12.175.14:4000');
}

// console.log(`${pageLocation}:3102`);

socket.initConnected = false;
socket.on('connect', function () {
    // message.success('连接成功', 1);
    console.log('socket connect');
    console.log('socket log', new Date().getTime())
    if (!socket.initConnected) {
        socket.initConnected = true
    } else {
        console.log('reconnect');
        socket.afterReconnect();
    }
});
socket.on('disconnect', function () {
    // message.error('与服务器连接断开');
    console.log('socket disconnect');
    console.log('socket log', new Date().getTime())
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
            // console.log(err);
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
    }
    
}

/**
 * get betHistroy
 */
export const getBetHistroy = (...args) => {
    return generateEvent('getBetHistroy')(...args);
}

/**
 * get rank data
 */
export const getBetRank = (...args) => {
    return generateEvent('getBetRank')(...args);
}

/**
 * get lastNumber
 */
export const getLastNumber = (...args) => {
    if (isDev) {
        return new Promise((resolve, reject) => {
            const data = {
                ballInfo: null,
                isstop: 0,
                issueCode: 201907189011299,
                lastballs: "29.22",
                lastnumber: "20190718-1298",
                nowstoptime: "2019/07/18 14:08:23",
                nowtime: "2019/07/18 14:07:44",
                number: "20190718-1299",
                prizeBet: null,
                resulttime: "2019/07/18 14:07:37",
                username: "hsia01",
                winlists: null
            }
            resolve(data);
        }).catch(err => {
            message.error('请求超时无响应');
            // throw err;
        });
    } else {
        return generateEvent('getLastNumber')();
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