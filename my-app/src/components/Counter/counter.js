import React, { Component } from 'react'
import { socket, gameConfig } from '../../services'
import NP from 'number-precision'

import './counter.scss';

export class counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerList: [],
            total: {
                amount: 0,
                playerNum: 0
            },
            playerIssues: '',
            currentWinHeigh: 0,
            orderByUnit: 'betDetail'
        };
        this.isSocketOn = true;
        
        socket.afterReconnect = this.getListdata.bind(this);

        NP.enableBoundaryChecking(false);
    }

    componentWillUnmount() {
        clearTimeout(this.playTimer);
    }

    componentDidUpdate(prevProps) {
        
        if ((this.props.currentIssues !== prevProps.currentIssues) && prevProps.currentIssues === '') {
            // first update
            // console.log('new rs data');
            console.log('counter init',this.props.animationStatus);
            this.setState({
                playerIssues: this.props.currentIssues
            }, () => {
                this.getListdata();
            });
        }

        if ((this.props.playResult.currentIssues !== prevProps.playResult.currentIssues) && this.props.playResult.currentIssues) {
            // 更新 最新獎號
            // console.log('更新', this.props.playResult);
            this.showPlayerWin(this.props.playResult);
        }

        if ((this.props.animationStatus !== prevProps.animationStatus) && this.props.animationStatus === 'loading') {
            // 讀取時切換排序
            this.setState({
                orderByUnit: 'betDetail'
            });
            // console.log('socket.off')
            this.isSocketOn = false;
            socket.off('realTimeBetList');
        }
    }

    showPlayerWin (rs) {
        const duringTime = rs.time;
        const rsHeight = rs.height

        const updateTime = 500 // 間隔 .5 秒更新列表
        const eachAdd = Math.floor( rsHeight / (duringTime / updateTime) * 100) / 100; // 每秒更新高度

        // console.log('showPlayerWin', `${rsHeight} / (${duringTime} / ${updateTime}) = ${eachAdd}`);

        let currentH = 0
        const updatePlayListWin = () => {
            // console.log('update');
            currentH += eachAdd
            if (currentH > rsHeight) {
                currentH = rsHeight
            }

            this.setState({
                currentWinHeigh: currentH,
            });
            if (currentH === rsHeight) {
                // 更新開獎列表結束
                clearInterval(this.playTimer);
                // 等待顯示結果
                setTimeout(() => {
                    this.setState({
                        playerIssues: rs.currentIssues,
                        orderByUnit: 'betAmount',
                        currentWinHeigh: 0
                    }, () => {
                        this.isSocketOn = false
                        this.getListdata();
                    });
                }, 3000);
            }
        }



        this.playTimer = setInterval(updatePlayListWin, updateTime);
    }

    

    getListdata () {
        socket.emit('getBetListEvent', {webIssueCode: this.state.playerIssues},(response) => {
            // console.log(response);
            console.log('update list');
            this.setState({
                orderByUnit: 'betAmount',
                playerList: response.betList,
                total: {
                    amount: response.totalBetAmount,
                    playerNum: response.betList.length
                }
            }, () => {
                console.log('after load state');
                if (!this.isSocketOn) {
                    this.startReceiveList();
                }
                
            });
        });
    }

    

    startReceiveList(){
        console.log('socket.on realTimeBetList')
        this.isSocketOn = true;
        socket.on('realTimeBetList', data => {
            // const _state = this.state;
            const rsData = data.betList
            // console.log(rsData);
            // console.log('realTime', this.state.playerList);
            this.setState(state => {
                const playerList = [...state.playerList, rsData];
                const amount =  NP.plus(state.total.amount, Number(rsData.betAmount))
                const playerNum = Number(state.total.playerNum) + 1
                
                // console.log('realTime', playerNum, rsData.account);
                return {
                    playerList: playerList,
                    total: {
                        amount: amount,
                        playerNum: playerNum
                    },
                };
            });
        });
    }


    render() {
        const myNickName = gameConfig().userNickName;
        // const myNickName = 'tt1';// for dev
        const unit = this.state.orderByUnit;
        
        return (
            <div className="counter">
                <div className="counter-panel">
                    <div className="total-top">
                        <div className="number">{this.state.total.amount}</div>
                        <div className="title">单期投注额</div>
                    </div>
                    <div className="total-top">
                        <div className="number">{this.state.total.playerNum}</div>
                        <div className="title">单期投注人数</div>
                    </div>
                </div>
                <div className="player-list-panel">
                    <div className="current-issues">{this.state.playerIssues}期</div>
                    <div className="list-title">
                        <div className="th-name">用户名</div>
                        <div className="th-number">投注高度</div>   
                        <div className="th-amount">投注金额</div>
                    </div>
                    <div className="player-list"> 
                        <div className="list">
                            {this.state.playerList.sort(function (a, b) {
                                if (unit === 'betAmount') {
                                    if (myNickName === b.account && myNickName === a.account) {
                                        return Number(b[unit]) - Number(a[unit]);
                                    }
                                    if(myNickName === b.account) return 1;  
                                    if(myNickName === a.account) return -1;
                                }
                                
                                return Number(b[unit]) - Number(a[unit]);
                            }).map((item, index) => (
                                <div className={'list-item' + (myNickName === item.account && unit === 'betAmount' ? ' self':'')  + (this.state.currentWinHeigh >= item.betDetail ? ' win':'')} key={index}>
                                    <div className="td-name">{item.account}</div>
                                    <div className="td-number">{item.betDetail}</div>   
                                    <div className="td-amount">{'¥ ' + item.betAmount}</div>
                                </div>
                            ))}
                            {/* <div className="list-item">
                                <div className="td-name">User4222</div>
                                <div className="td-number">1</div>   
                                <div className="td-amount">&#165;12</div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default counter
