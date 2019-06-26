import React, { Component } from 'react'
import { socket } from '../../services'

import './counter.scss';

export class counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerList: [
                
            ],
            total: {
                amount: 0,
                playerNum: 0
            }
        };
        this.nickName = 'tt1'
    }

    componentDidMount() {
        console.log('getBetListEvent');
        var me = this;
        socket.on('getBetListEvent', data => {

            this.setState({
                playerList: data.betList,
                total: {
                    amount: data.totalBetAmount,
                    playerNum: data.betList.length
                }
            }, () => {
                console.log('after load state');
                me.startReceiveList();
            });
            
        });
    }

    startReceiveList(){
        socket.on('realTimeBetList', data => {
            // console.log(data);
            const _state = this.state;

            this.setState({
                playerList: [..._state.playerList, data.item],
                total: {
                    amount: _state.total.amount + Number(data.item.betAmount),
                    playerNum: Number(_state.total.playerNum + 1)
                }
            });
        });
    }

    render() {
        const nickName = this.nickName;
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
                    <div className="current-issues">{this.props.issues}期</div>
                    <div className="list-title">
                        <div className="th-name">用户名</div>
                        <div className="th-number">投注高度</div>   
                        <div className="th-amount">投注金额</div>
                    </div>
                    <div className="player-list"> 
                        <div className="list">
                            {this.state.playerList.sort(function (a, b) {
                                if(nickName === a.account) return -1;
                                if(nickName === b.account) return 1;   
                                
                                return Number(b.betAmount) - Number(a.betAmount);
                            }).map((item, index) => (
                                <div className={'list-item' + (nickName === item.account ? ' self':'')} key={index}>
                                    <div className="td-name">{item.account}</div>
                                    <div className="td-number">{item.betDetail}</div>   
                                    <div className="td-amount">{item.betAmount}</div>
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
