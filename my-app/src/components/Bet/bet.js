import React, { Component } from 'react'

import iScroll from 'iscroll/build/iscroll-probe'
import ReactIScroll from 'react-iscroll'
import NP from 'number-precision'

import { setLastNumber, setIssues, setAnimationStatus } from '../../actions';
import { getLastNumber, submitBet } from '../../services'

import { Spin, Icon , message} from 'antd';

import './bet.scss';


export class bet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rulerStep: 1,
            iScrollOptions: {
                mouseWheel: true,
                scrollbars: false,
                scrollX: true,
                scrollY: false,
                bounce: false,
                // startX: -8.4,
                probeType: 2
            },
            isScrolling: false,
            rulerNumber: 1.01,
            winRate: 100,
            winPrize: 0,
            multiple: 1,
            openFastInput: false,
            readySubmit: false,
            showCountdown: false,
            countdownSec: 0,
            Loading: false,
            gameRetPoint: 0
        };

        NP.enableBoundaryChecking(false);
    }

    componentDidMount() {
        this.calcPayout();
    }

    componentDidUpdate(prevProps) {

        // 更新當期遊戲資料
        if ((this.props.lastNumberData !== prevProps.lastNumberData) && this.props.lastNumberData) {
            console.log(this.props.lastNumberData);
            this.betStatus(this.props.lastNumberData);
        }

        if ((this.props.betAwardData !== prevProps.betAwardData) && this.props.betAwardData) {
            console.log(this.props.betAwardData);
            this.setState({
                gameRetPoint: this.props.betAwardData.data.gameTips.retPoint / 100
            },() => {
                this.calcPayout();
            })
        }

    }

    componentWillUnmount() {
        clearTimeout(this.gameTimer)
    }

    betStatus(lastData) {
        const nowstoptime = new Date(lastData.nowstoptime).getTime()
        const nowtime = new Date(lastData.nowtime).getTime()
        const resulttime = new Date(lastData.resulttime).getTime()
        const countdownSec = nowstoptime - nowtime
   

        console.log('game time', countdownSec);
        
        if (resulttime > nowtime) {
            // 當期尚未開始
        } else {
            
            if (countdownSec > 0) {
                
                this.setState({
                    showCountdown: true,
                    countdownSec: Math.floor(countdownSec / 1000)
                }, ()=> {
                    this.gameCountdown();
                });
                
            } else {
                // 當期已結束
            }
        }
    }

    gameCountdown() {
        const countdown = () => {
            
            const timer_s = this.state.countdownSec - 1;
            // const timer_s_str = '' + timer_s;
            // if (timer_s < 10) {
            //     timer_s_str = '0' + timer_s;
            // }
            this.setState({
                countdownSec: timer_s,
            });

            if (timer_s === 0) {
                clearInterval(this.gameTimer);
                // end issues
                this.setState({showCountdown: false})
                this.startGetLastnumber();
            }
        }

        if (this.state.countdownSec > 0) {
            this.gameTimer = setInterval(countdown, 1000);
        }
    }

    getLastnumberData () {
        const currentIssues = this.props.issues
        const me = this
        console.log('call last number');
        getLastNumber().then(rs => {
            if (currentIssues === rs.lastnumber) {
                // 尚未更新獎期
                setTimeout(me.getLastnumberData.bind(me), 1000);
            } else {
                this.updateLastnumberData(rs);
            }
        }).catch(() => {
            console.log('startGetLastnumber error');
            // message.error(`第${issues}期区块链数据不稳定，故撤销单期，进入第期`, 5);
        });
    }

    // 更新獎期
    updateLastnumberData(data) {
        const { dispatch } = this.props;

        console.log('updateLastnumber');
        dispatch(setLastNumber(data));
        dispatch(setIssues(data.lastnumber));
        dispatch(setAnimationStatus(''));
        this.setState({
            Loading: false
        })
    }

    startGetLastnumber () {
        console.log('stop betting');

        message.warning(`第${this.props.issues}期已结束等待火箭升空开，您可进入下期投注`, 5);
        this.setState({
            Loading: true
        })
        
        this.getLastnumberData();
    }

    onScroll = (iScrollInstance) => {
        let distance = 8.4;
        let startDistance = 0;
        let iScrollInstanceDistance = iScrollInstance.x;
        let range = 10;

        // console.log('onScroll',iScrollInstanceDistance);
        // if (iScrollInstanceDistance >= -8.4) {
        //     iScrollInstanceDistance = -8.4
        // }
        
        // number 1 ~ 4
        if (iScrollInstanceDistance <= -250) {
            iScrollInstanceDistance += 250
            distance = 42;
            startDistance = 3;
            range = 1
        }
        // console.log(startDistance);

        const rulerOn = (startDistance + Math.abs((iScrollInstanceDistance) / distance) / range + 1).toFixed(1)
        // console.log(rulerOn);
        
        this.setState({
            rulerNumber: rulerOn <= 1 ? 1.01 : rulerOn,
        }, () => {
            this.calcPayout();
            
            // console.log(this.state.winRate);
        });
    }

    onScrollStart = () => {

        this.setState({
            isScrolling: true
        });
    }

    onScrollEnd = (iScrollInstance) => {

        // let iScrollInstanceDistance = iScrollInstance.x;
        // this.fixedScroll();
        // this.refs.iScroll.withIScroll(function(iScroll) {
        //     if (iScrollInstanceDistance >= -8.4) {
        //         iScrollInstanceDistance = -8.4
        //     }

        //     setTimeout(() => {
        //         iScroll.scrollTo(Math.floor(iScrollInstanceDistance * 10) / 10, 0)
        //     },300);
        // })

        this.setState({
            isScrolling: false
        });
    }
    

    calcPayout = () => {
        const rulerNumber = this.state.rulerNumber;
        const multiple = this.state.multiple
        const retPoint = this.state.gameRetPoint

        if (!retPoint) {
            console.log('retPoint didnt get yet');
            return ;
        }
        
        const win_prize = Math.floor((multiple * NP.plus(rulerNumber, ((rulerNumber / 0.9) * retPoint))) * 100) / 100;
        // console.log(`check payout (1 * ${rulerNumber} + ((${rulerNumber} / 0.9) * ${retPoint}) = ${win_prize}`);
        this.setState({
            winRate: Math.round((90 / rulerNumber) * 100) / 100,
            winPrize: win_prize
        }); 
    }

    setMultiple(num) {
        const MaxNum = 100000
        if (num < 1) {
            num = 1
        }

        if (num > MaxNum) {
            num = MaxNum
        }

        this.setState({
            multiple: num
        }, () => {
            this.calcPayout();
        });
    }

    multipleChange = (event) => {
        const num = (event.target.validity.valid) && event.target.value ? Math.floor(event.target.value) : 1

        this.setMultiple(num)
    }
    multipleMinus = () => {
        this.setMultiple(this.state.multiple - 1);
    }
    multiplePlus = () => {
        this.setMultiple(this.state.multiple + 1);
    }

    
    toggleFastPanel = () => {
        this.setState({
            openFastInput: !this.state.openFastInput
        },()=>{
            this.calcPayout();
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
                "multiple": this.state.multiple,
                "awardMode": 2,
                "num": 1
            }],
            "orders": [{
                "number": this.props.lastNumberData.lastnumber,
                "issueCode": this.props.lastNumberData.issueCode,
                "multiple": this.state.multiple
            }],
            "amount": `${this.state.multiple}.00`
        }
        console.log(submitForm);
        submitBet(submitForm).then(rs => {
            if (rs.isSuccess === 1) {
                message.success(rs.msg);
            } else {
                message.error(rs.msg);
            }
        })
    }

    render() {

        const antIcon = <Icon type="loading" style={{ fontSize: 62 }} spin />;
        
        const rulerStart = (<div className="ruler-start" key={1}>
            <span>1</span>
            <span>2</span>
            <span>3</span>
        </div>)

        const rulerContent = [];
        const ruleItem = [];
        let startDegree;
        let endDegree;

        if (this.state.rulerStep > 1) {
            startDegree = (this.state.rulerStep - 1) * 100
            endDegree = startDegree + 99
        } else {
            startDegree = 4;
            endDegree = 99
            rulerContent.push(rulerStart);
        }

        for (startDegree ; startDegree < endDegree; startDegree++) {
            ruleItem.push(<span key={startDegree}>{startDegree}</span>);
        }

        rulerContent.push(
            <div className="ruler" key={2}>{[...ruleItem]}</div>
        )

        
        return (
            <div className="bet">
                <Spin indicator={antIcon} spinning={this.state.Loading}></Spin>
                <div className="final-num">
                    <div className="number"></div>
                </div>
                <div className="status">
                    <div className="issues">{this.props.issues}期</div>
                    <div className="status-heigh hide">
                        <i className="icon-heigh "></i>
                        <span>30</span>
                    </div>
                    <div className={'countdown ' + (!this.state.showCountdown ? 'hide' : '')}>
                        <div className="title"></div>
                        <div className={'countdown-box ' + (this.state.countdownSec <= 5 ? 'blink' : '')}>
                            <div className="countdown-num">{this.state.countdownSec}</div>
                        </div>
                    </div>
                </div>
                <div className="bet-panel">
                    <div className="bet-statistics">
                        <div className="bet-number">{Number(this.state.rulerNumber).toFixed(2)}</div>
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
                                    <button className="btn btn-minus" onClick={this.multipleMinus}></button>
                                    <input type="text" className="input-amount" pattern="[0-9]*" value={this.state.multiple} onChange={this.multipleChange}/>
                                    <button className="btn btn-plus" onClick={this.multiplePlus}></button>
                                    <button className="btn btn-show-fast" onClick={this.toggleFastPanel}>快捷</button>
                                </div>
                                <div className={'fast-amount-panel ' + (this.state.openFastInput ? 'show' : '')}>
                                    <div className="amount-group">
                                        <button className="btn btn-set-amount" onClick={() => this.setMultiple(5)}>5</button>
                                        <button className="btn btn-set-amount" onClick={() => this.setMultiple(10)}>10</button>
                                        <button className="btn btn-set-amount" onClick={() => this.setMultiple(100)}>100</button>
                                        <button className="btn btn-set-amount" onClick={() => this.setMultiple(200)}>200</button>
                                        <button className="btn btn-set-amount" onClick={() => this.setMultiple(500)}>500</button>
                                        <button className="btn btn-set-amount" onClick={() => this.setMultiple(1000)}>1000</button>
                                        <button className="btn btn-set-amount" onClick={() => this.setMultiple(2000)}>2000</button>
                                        <button className="btn btn-set-amount" onClick={() => this.setMultiple(5000)}>5000</button>
                                        <button className="btn btn-set-amount" onClick={() => this.setMultiple(10000)}>1W</button>
                                    </div>
                                </div>
                            </div>
                            <div className="submit-group">
                                <button className={'btn btn-bet-confirm ' + (this.state.readySubmit ? 'hide' : '')} onClick={() => this.readyToSubmit(true)}>确认下注</button>
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
