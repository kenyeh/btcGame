import React, { Component } from 'react'
import Countup from './Countup'

import iScroll from 'iscroll/build/iscroll-probe'
import ReactIScroll from 'react-iscroll'
import NP from 'number-precision'

import { setLastNumber, setAnimationStatus, setPlayResult, setTrendIssueCode } from '../../actions';
import { getLastNumber, submitBet , getBetAward, isDev } from '../../services';


import { Spin, Icon , message} from 'antd';

import './bet.scss';


export class bet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            issues: '',
            betCurrentIssues: '',
            contdownIssues: '',
            betIssueCode: '',
            rulerStep: 1,
            iScrollOptions: {
                mouseWheel: true,
                scrollbars: false,
                scrollX: true,
                scrollY: false,
                bounce: false,
                // startX: -8.4,
                probeType: 3
            },
            AnimatedNumberProps: {
                value: 0,
                duration: 0,
                delay: 0.8
            },
            isScrolling: false,
            rulerNumber: 1.01,
            winRate: 100,
            winPrize: 0,
            amount: 1,
            openFastInput: false,
            readySubmit: false,
            showCountdown: false,
            showStatusHeigh: false,
            showResultHeight: false,
            countdownSec: 0,
            Loading: false,
            gameRetPoint: 0
        };

        this.scrollMax = 99999.9;
        this.trendIssueCode = 0;
        NP.enableBoundaryChecking(false);
    }

    componentDidMount() {
        // const { dispatch } = this.props;
        this.calcPayout();

        getBetAward({
            type: 'chungtienpao.chungtienpao.chungtienpao',
            extent: 'currentFre',
            line: 5,
            lenth: 30,
        }).then(rs => {
            // console.log('getBetAward', rs)
            this.setState({
                gameRetPoint: rs.data.gameTips.retPoint / 100
            },() => {
                this.calcPayout();
            })
        })

        // console.log(CountUp);
        this.getLastnumberData();
        
    }


    componentWillUnmount() {
        clearInterval(this.gameTimer);
    }


    betStatus(lastData) {
        const nowstoptime = new Date(lastData.nowstoptime).getTime()
        const nowtime = new Date(lastData.nowtime).getTime()
        const resulttime = new Date(lastData.resulttime).getTime()
        const countdownSec = nowstoptime - nowtime;

        // console.log(`resulttime=${resulttime}   nowtime=${nowtime}   countdownSec=${countdownSec}`);

        if (this.state.betCurrentIssues === '') {
            this.setState({
                betCurrentIssues: lastData.number
            })
        }
        
        if (resulttime > nowtime) {
            // 當期尚未開始
            this.reloadLastnumber();
        } else {
            if (countdownSec > 0) {
                this.setState({
                    countdownSec: Math.floor(countdownSec / 1000)
                }, ()=> {
                    this.gameCountdown();
                });
                
            } else {
                // 當期已結束
                this.reloadLastnumber();
            }
        }
    }

    reloadLastnumber () {
        console.log('reloadLastnumber');
        this.setState({
            showCountdown: false,
            Loading: true,
            betCurrentIssues: this.state.issues
        },() => {
            setTimeout(() => {
                this.getLastnumberData();
            }, 1000)
        })
    }

    gameCountdown() {
        const countdown = () => {
            
            const timer_s = this.state.countdownSec - 1;
            
            this.setState({
                countdownSec: timer_s,
            });

            if (timer_s === 0) {
                // end issues
                clearInterval(this.gameTimer);
                this.startGetLastnumber();
            }
        }

        if (this.state.countdownSec > 0) {
            this.gameTimer = setInterval(countdown, 1000);
        }
    }

    getLastnumberData () {
        const { dispatch } = this.props;
        const CurrentIssues = this.state.betCurrentIssues
        const me = this
        console.log('call last number');
        getLastNumber().then(rs => {
            if (rs) {
                if (isDev) {
                    // for dev localhost
                    setTimeout(()=> {
                        this.trendIssueCode = rs.issueCode;
                        const isInitUpdate = false
                        if (isInitUpdate) {
                            dispatch(setTrendIssueCode(this.trendIssueCode));
                        }
                        
                        this.setState({
                            issues: rs.lastnumber,
                            betCurrentIssues: rs.number,
                            betIssueCode: rs.issueCode,
                            contdownIssues: rs.lastnumber
                        }, () => {
                            this.betStatus(rs);
                            this.updateLastnumberData(rs);
                        })
                    },2000)
                } else {

                    if (CurrentIssues === rs.number) {
                        // 尚未更新獎期
                        console.log(`尚未更新獎期 ${CurrentIssues}=>${rs.number}`);
                        setTimeout(me.getLastnumberData.bind(me), 1500);
                        
                    } else {
                        this.trendIssueCode = rs.issueCode;
                        const isInitUpdate = this.state.issues === '' ? true : false
                        if (isInitUpdate) {
                            dispatch(setTrendIssueCode(this.trendIssueCode));
                        }
                        
                        this.setState({
                            issues: rs.lastnumber,
                            betCurrentIssues: rs.number,
                            betIssueCode: rs.issueCode,
                            contdownIssues: rs.lastnumber
                        }, () => {
                            this.betStatus(rs);
                            this.updateLastnumberData(rs);
                        })
                        
                    }
                }

            }
        }).catch((err) => {
            console.log('GetLastnumber error', err);
            // message.error(`第${lastIssues}期区块链数据不稳定，故撤销单期，进入第${currentIssues}期`, 5);
            // setTimeout(me.getLastnumberData.bind(me), 1000);
        });
    }

    // 更新獎期
    updateLastnumberData(data) {
        const { dispatch } = this.props;
        let trendIssueCode = this.trendIssueCode;
        const nowtime = new Date(data.nowtime).getTime()
        const rsHeight = Number(data.lastballs);
        const nowstoptime = new Date(data.nowstoptime).getTime()
        const resulttime = new Date(data.resulttime).getTime()
        
        const betTime = (nowstoptime - nowtime) / 1000;
        console.log('betTime', betTime);

        if (betTime <= 0 || resulttime > nowtime) {
            // for reload
            return ;
        }

        if (betTime <= 30) {
            dispatch(setLastNumber(data));
            this.gameRecover();
            return ;
        } else {
            // send last issues code 
            trendIssueCode = Number(data.lastnumber.split('-').join('901'));
            // console.log(trendIssueCode);

            dispatch(setLastNumber({
				...data,
				'number': data.lastnumber
			}));
        }

        const countupTime = NP.minus(betTime, 33);
        // console.log(`(nowstoptime - nowtime) / 1000 = ${(nowstoptime - nowtime) / 1000 }`);
        // console.log(`(${nowstoptime} - ${nowtime} ) / 1000 - 33 = ${countupTime}`);
        
        dispatch(setTrendIssueCode(trendIssueCode));
        dispatch(setAnimationStatus('launch'));
        
        // 開始計數高度
        this.setState({
            Loading: false,
            readySubmit: false,
            showCountdown: false,
            showStatusHeigh: true,
            AnimatedNumberProps: {
                value: rsHeight,
                duration: countupTime > 0 ? countupTime * 1000 : 200,
                delay: 800
            }
        }, () => {
            
            dispatch(setPlayResult({
                currentIssues: data.number,
                lastIssues: data.lastnumber,
                height: rsHeight,
                time: Math.floor((countupTime > 0.5 ? countupTime : 0.5) * 1000)
            }));
        })
    }

    startGetLastnumber () {
        const { dispatch } = this.props;
        console.log('stop betting');

        message.warning(`第${this.state.issues}期已结束等待火箭升空开，您可进入下期投注`, 5);
        this.setState({
            Loading: true,
            showCountdown: false
        });

        dispatch(setAnimationStatus('loading'));
        
        this.getLastnumberData();
    }

    getScrollRuler = (step, iScrollInstanceDistance) => {
        let distance = 8.4;
        let startDistance = 0;
        
        let range = 10;

        // number 1 ~ 4
        if (iScrollInstanceDistance <= -250 && step === 1) {
            iScrollInstanceDistance += 250
            distance = 42;
            startDistance = 3;
            range = 1
        }
        
        if (step > 1) {
            distance = 42;
            range = 1
        }

        let rulerOn = Number((startDistance + Math.abs((iScrollInstanceDistance) / distance) / range + 1).toFixed(1))

        return rulerOn
    }

    onScroll = (iScrollInstance) => {
        const maxOn = this.scrollMax // 最大值
        let iScrollInstanceDistance = iScrollInstance.x;
        let step = this.state.rulerStep
        let rulerLenth = 100 / 2;

        let rulerOn = this.getScrollRuler(step, iScrollInstanceDistance);
        
        if (step > 1) {
            rulerOn = rulerOn + ((step - 1) * rulerLenth) - 1
            // 預留尺標箭頭左邊 1
        }

        if (rulerOn >= maxOn) {
            rulerOn = maxOn
            this.refs.iScroll.withIScroll(function(iScroll) {
                iScroll.scrollTo(-2099, 0);
            })
        }

        this.setState({
            rulerNumber: rulerOn <= 1 ? 1.01 : rulerOn,
        }, () => {
            this.calcPayout();
        });
    }

    onScrollStart = () => {
        // this.setState({
        //     isScrolling: true
        // });
    }

    onScrollEnd = (iScrollInstance) => {
        // console.log('onScrollEnd');
        const maxOn = this.scrollMax // 最大值
        let iScrollInstanceDistance = iScrollInstance.x;
        let rulerLenth = 100 / 2;
        let step = this.state.rulerStep
        let rulerCheck = step * rulerLenth
        let lessSet = false
        let addSet = false
        // console.log(iScrollInstance.x);
        // console.log(` start rulerStep:${step}  rulerCheck:${rulerCheck} `);

        const scrollToSet = (lessOrAdd) => {
            // console.log(lessOrAdd);
            let setDistance = 0

            if (lessOrAdd === 'less') {
                if (step > 2) {
                    setDistance = -2100
                } else {
                    setDistance = -2183
                }
                
            } else {
                if (step === 2) {
                    setDistance = 2183
                } else {
                    setDistance = 2100
                }
            }
            // console.log(`step:${step}   withIScroll: ${iScrollInstanceDistance} + ${setDistance}`);
            this.refs.iScroll.withIScroll(function(iScroll) {
                iScroll.scrollTo(iScrollInstanceDistance + setDistance, 0);
            })
        }
        
        let rulerOn = this.getScrollRuler(step, iScrollInstanceDistance);
        // console.log('rulerOn:', rulerOn);
        if (step > 1) {
            // console.log(`${rulerOn} + ((${step} - 1) * ${rulerLenth}) - 1`);
            rulerOn = rulerOn + ((step - 1) * rulerLenth) - 1
            // 預留尺標箭頭左邊 1
            
            // console.log('rulerOn:', rulerOn);
        }

        // console.log('rulerOn:', rulerOn);
        if (rulerOn >= maxOn) {
            rulerOn = maxOn;
            this.refs.iScroll.withIScroll(function(iScroll) {
                iScroll.scrollTo(-2099, 0);
            })

            // console.log('rulerOn:', rulerOn);
        } else {
            // 每 rulerLenth 調整尺標  step判斷尺標階段 尺標長度 rulerLenth 
            if (rulerOn > rulerCheck) {
                step += 1
                addSet = true
            } else if ((rulerOn <= rulerCheck - rulerLenth) &&  step !== 1) {
                step -= 1
                lessSet = true
            }
            // console.log(`rulerStep:${step}  rulerOn:${rulerOn} rulerCheck:${rulerCheck} `);
        }

        this.setState({
            rulerStep: step,
            // isScrolling: false
        }, () => {
            this.calcPayout();
            // 設定尺標 更新尺標後 設定尺標位置
            if (lessSet) {
                scrollToSet('less');
            }
            if (addSet) {
                scrollToSet('add');
            }
        });
    }

    setScrollRuler = (num) => {
        // console.log('setScrollRuler');
        const rulerLenth = 100 / 2;
        let step = 1
        let distance = 8.4;
        let startOn = 0;
        let range = 10;
        let distanceScroll = 0
        let addDistance = 0

        if (num >= 4 && num <= rulerLenth) {
            distance = 42;
            startOn = 3;
            range = 1
            addDistance = 250
        }

        if (num > rulerLenth) {
            distance = 42;
            range = 1
        }

        step = Math.floor(num / rulerLenth);
        step = step > 1 ? step : 1
        if (num % 50 > 0 && num > 50) {
            step += 1
            
        }
        // console.log('step', step)
        if (step > 1) {
            // rulerOn = rulerOn + ((step - 1) * rulerLenth) - 1
            // 預留尺標箭頭左邊 1
            num = num + 1 - ((step - 1) * rulerLenth)
        }
        
        distanceScroll -=  NP.plus(((num - 1 - startOn) * range) * distance, addDistance);
        // console.log(`${distanceScroll} = ((${num} - 1 - ${startOn}) * ${range}) * ${distance} + ${addDistance} `);
        if (step === 1 && num >=4 ) {
            distanceScroll -= 2
        }

        this.setState({
            rulerStep: step,
        }, () => {
            this.refs.iScroll.withIScroll(function(iScroll) {
                iScroll.scrollTo(distanceScroll, 0);
            })
        });
    }
    

    calcPayout = () => {
        const rulerNumber = Number(this.state.rulerNumber) >= 1.01 ? Number(this.state.rulerNumber) : 1.01;
        const amount = Number(this.state.amount)
        const retPoint = this.state.gameRetPoint

        const prizeMode = Math.floor( (rulerNumber / 0.9) * 100) / 100

        
        const win_prize = Math.floor((amount * NP.plus(rulerNumber, (prizeMode * retPoint))) * 100) / 100;
        // console.log(`check payout (1 * ${rulerNumber} + ((${rulerNumber} / 0.9) * ${retPoint}) = ${win_prize}`);
        this.setState({
            winRate: Math.round((90 / rulerNumber) * 100) / 100,
            winPrize: win_prize
        }); 
    }

    setAmount(num) {
        const MaxNum = 100000
        if (num < 1) {
            num = 1
        }

        if (num > MaxNum) {
            num = MaxNum
        }
        
        this.setState({
            amount: num
        }, () => {
            this.calcPayout();
        });
    }

    amountChange = (event) => {
        let num = event.target.value;
        
        num = num.replace(/[^\d.]/g, "").replace(/^\./g, "").replace(/\.{2,}/g, ".").replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        num = num.replace(/^(-)*(\d+)\.(\d).*$/, '$1$2.$3');//只能输入个小数
        // console.log(Math.floor(Number(num) * 10));

        this.setAmount(num)
    }
    amountMinus = () => {
        this.setAmount(Number(this.state.amount) - 1);
    }
    amountPlus = () => {
        this.setAmount(Number(this.state.amount) + 1);
    }

    betNumberChange = (event) => {
        const MaxNum = this.scrollMax
        let num = event.target.value;

        if(/^\d+\.?\d{0,2}$/.test(num)){
            // num = num;
        } else {
            num = num.substring(0,num.length-1);
        } 
        
        if (Number(num) === 0) {
            num = 1.01
        }
        if (Number(num) >= MaxNum) {
            num = MaxNum
        }
        // console.log(num);
        this.setState({
            rulerNumber: num
        }, () => {
            this.setScrollRuler(Number(num));
            this.calcPayout();
        });
        
    }

    
    toggleFastPanel = () => {
        this.setState({
            openFastInput: !this.state.openFastInput
        });
    }

    readyToSubmit = (toggle) => {
        
        this.setState({
            readySubmit: toggle
        });
    }

    submitBet = () => {
        const submitForm = {
            "gameType": "btcctp",
            "isTrace": 0,
            "traceWinStop": 0,
            "traceStopValue": -1,
            "balls": [{
                "id": 1,
                "ball": `${this.state.rulerNumber}`,
                "type": "chungtienpao.chungtienpao.chungtienpao",
                "moneyunit": "1",
                "multiple": 1,
                "awardMode": 2,
                "num": 1
            }],
            "orders": [{
                "number": this.state.betCurrentIssues,
                "issueCode": this.state.betIssueCode,
                "multiple": 1
            }],
            "amount": `${Number(this.state.amount).toFixed(1)}0`
        }
        console.log('submitForm', submitForm);
        
        submitBet(submitForm).then(rs => {
            if (rs.isSuccess === 1) {
                message.success(rs.msg);
            } else {
                message.error(rs.msg);
            }

            this.setState({
                readySubmit: false
            });
        })
    }

    countupEnd = () => {
        const { dispatch } = this.props;
        console.log('countupEnd this Issues', this.state.betCurrentIssues);
        
        dispatch(setAnimationStatus('flyaway'));
        setTimeout(() => {
            this.setState({
                showResultHeight: true
            });
            setTimeout(() => {
                this.gameRecover();
            }, 1500);
        }, 500);
        
    }

    gameRecover = () => {
        const { dispatch } = this.props;
        this.setState({
            contdownIssues: this.state.betCurrentIssues,
            Loading: false,
            showCountdown: true,
            showStatusHeigh: false,
            showResultHeight: false,
            AnimatedNumberProps: {
                value: 0,
                duration: 0,
                delay: 0
            }
        }, () => {
            dispatch(setAnimationStatus(''));
            dispatch(setTrendIssueCode(this.trendIssueCode));
        });
    }
    

    render() {

        const antIcon = <Icon type="loading" style={{ fontSize: 62 }} spin />;

        const rulerStep = this.state.rulerStep
        let rulerLenth = 100
        // 初始尺標為 rulerStart + ruler
        // 每次尺標間距 100
        const rulerStart = (<div className="ruler-start" key={1}>
            <span>1</span>
            <span>2</span>
            <span>3</span>
        </div>)

        const rulerContent = [];
        const ruleItem = [];
        let startDegree;
        let endDegree;

        if (rulerStep > 1) {
            startDegree = (rulerStep - 1) * (rulerLenth / 2) // 起始尺標刻度
            endDegree = startDegree + rulerLenth // 結束尺標刻度

            startDegree -= 1
        } else {
            startDegree = 4; // rulerStart 刻度為 1-3
            endDegree = rulerLenth
            rulerContent.push(rulerStart);
        }

        // console.log(`make ruler startDegree:${startDegree} endDegree:${endDegree}`);
        for (startDegree ; startDegree < endDegree; startDegree++) {
            ruleItem.push(<span className={ startDegree >= 10000 ? 'small' : ''}  key={startDegree}>{startDegree}</span>);
        }

        rulerContent.push(
            <div className="ruler" key={2}>{[...ruleItem]}</div>
        )

        

        
        return (
            <div className="bet">
                <Spin indicator={antIcon} spinning={this.state.Loading}></Spin>
                <div className={'final-num ' + (this.state.showResultHeight ? 'show' : '')}>
                    <div className="number">{this.state.AnimatedNumberProps.value}</div>
                </div>
                <div className="status">
                    <div className="issues">{this.state.contdownIssues}期</div>
                    <div className={'status-heigh ' + (!this.state.showStatusHeigh ? 'hide' : '')}>
                        <i className="icon-heigh"></i>
                        <div>
                            <Countup {...this.state.AnimatedNumberProps} complete={this.countupEnd}/>
                        </div>
                    </div>
                    <div className={'betCountdown ' + (!this.state.showCountdown ? 'hide' : '')}>
                        <div className="title"></div>
                        <div className={'countdown-box ' + (this.state.countdownSec <= 5 ? 'blink' : '')}>
                            <div className="countdown-num">{this.state.countdownSec}</div>
                        </div>
                    </div>
                </div>
                <div className="bet-panel">
                    <div className="bet-statistics-panel">
                        <div className="bet-number">
                            {/* {Number(this.state.rulerNumber).toFixed(2)} */}
                            <input type="text" className="input-bet-number"  value={this.state.rulerNumber} onChange={this.betNumberChange}/>
                        </div>
                        <div className="bet-prize">{Number(this.state.winPrize).toFixed(2)}</div>
                    </div>
                    <div className="bet-select-section">
                        <div className="set-number-section">
                            <div className={'prize-rate ' + (this.state.isScrolling ? 'spin' : '')}>
                                <div className="rate-num">{Number(this.state.winRate).toFixed(2)}%</div>
                            </div>
                            <ReactIScroll className="ruler-section" 
                                            ref="iScroll"
                                            iScroll={iScroll}
                                            options={this.state.iScrollOptions}
                                            onScroll= {this.onScroll}
                                            onScrollStart = {this.onScrollStart}
                                            onScrollEnd = {this.onScrollEnd}>
                                    <div className="ruler-content">
                                        {rulerContent}
                                    </div>
                                        
                            </ReactIScroll>
                                
                            {/* <div className="ruler-section">
                                
                                <div className="ruler-content">
                                    <div className="ruler-start">
                                        <span>1</span>
                                        <span>2</span>
                                        <span>3</span>
                                    </div>
                                    <div className="ruler">
                                        <span>4</span>
                                        <span>5</span>
                                        <span>6</span>
                                        <span>7</span>
                                        <span>8</span>
                                        <span>9</span>
                                        <span>10</span>
                                    </div>
                                </div>
                                
                            </div> */}
                        </div>
                        <div className="submit-section">
                            <div className="set-amount">
                                <div className="set-group">
                                    <button className="btn btn-minus" onClick={this.amountMinus}></button>
                                    <input type="text" className="input-amount"  value={'¥ ' + this.state.amount} onChange={this.amountChange}/>
                                    <button className="btn btn-plus" onClick={this.amountPlus}></button>
                                    <button className="btn btn-show-fast" onClick={this.toggleFastPanel}>快捷</button>
                                </div>
                                <div className={'fast-amount-panel ' + (this.state.openFastInput ? 'show' : '')}>
                                    <div className="amount-group">
                                        <button className="btn btn-set-amount" onClick={() => {this.setAmount(5);this.toggleFastPanel()}}>5</button>
                                        <button className="btn btn-set-amount" onClick={() => {this.setAmount(10);this.toggleFastPanel()}}>10</button>
                                        <button className="btn btn-set-amount" onClick={() => {this.setAmount(100);this.toggleFastPanel()}}>100</button>
                                        <button className="btn btn-set-amount" onClick={() => {this.setAmount(200);this.toggleFastPanel()}}>200</button>
                                        <button className="btn btn-set-amount" onClick={() => {this.setAmount(500);this.toggleFastPanel()}}>500</button>
                                        <button className="btn btn-set-amount" onClick={() => {this.setAmount(1000);this.toggleFastPanel()}}>1000</button>
                                        <button className="btn btn-set-amount" onClick={() => {this.setAmount(2000);this.toggleFastPanel()}}>2000</button>
                                        <button className="btn btn-set-amount" onClick={() => {this.setAmount(5000);this.toggleFastPanel()}}>5000</button>
                                        <button className="btn btn-set-amount" onClick={() => {this.setAmount(10000);this.toggleFastPanel()}}>1W</button>
                                    </div>
                                </div>
                            </div>
                            <div className="submit-group">
                                <button className={'btn btn-bet-confirm ' + (this.state.readySubmit ? 'hide' : '')} onClick={() => this.readyToSubmit(true)}>
                                    <p>确认下注</p>
                                    <p className="issues">{this.state.betCurrentIssues}期</p>
                                </button>
                                <div className="submit-confirm">
                                    <button className="btn btn-bet-cancel" onClick={() => this.readyToSubmit(false)}></button>
                                    <button className="btn btn-bet-submit" onClick={this.submitBet}></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default bet
