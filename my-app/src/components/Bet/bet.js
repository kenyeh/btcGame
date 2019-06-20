import React, { Component } from 'react'

import './bet.scss';

export class bet extends Component {
    render() {
        return (
            <div className="bet">
                <div className="final-num">
                    <div className="number"></div>
                </div>
                <div className="status">
                    <div className="issues">20190523-12344期</div>
                    <div className="status-heigh">
                        <i className="icon-heigh"></i>
                        <span>30</span>
                    </div>
                    <div className="countdown">
                        <div className="title"></div>
                        <div className="countdown-box">
                            <div className="countdown-num"></div>
                        </div>
                    </div>
                </div>
                <div className="bet-panel">
                    <div className="bet-statistics">
                        <div className="bet-number">100</div>
                        <div className="bet-prize">100000</div>
                    </div>
                    <div className="bet-select-section">
                        <div className="set-number-section">
                            <div className="prize-rate">
                                <div className="rate-num">98.66%</div>
                            </div>
                            <div className="ruler-section">

                            </div>
                        </div>
                        <div className="submit-section">
                            <div className="set-amount">
                                <div className="set-group">
                                    <button className="btn btn-minus"></button>
                                    <input type="text" className="input-amount" value="1"/>
                                    <button className="btn btn-plus"></button>
                                    <button className="btn btn-show-fast">快捷</button>
                                </div>
                                <div className="fast-amount-panel">
                                    <div className="amount-group">
                                        <button className="btn btn-set-amount">5</button>
                                        <button className="btn btn-set-amount">10</button>
                                        <button className="btn btn-set-amount">100</button>
                                        <button className="btn btn-set-amount">200</button>
                                        <button className="btn btn-set-amount">500</button>
                                        <button className="btn btn-set-amount">1000</button>
                                        <button className="btn btn-set-amount">2000</button>
                                        <button className="btn btn-set-amount">5000</button>
                                        <button className="btn btn-set-amount">1W</button>
                                    </div>
                                </div>
                            </div>
                            <div className="submit-group">
                                <button className="btn btn-bet-confirm">确认下注</button>
                                <div className="submit-confirm">
                                    <button className="btn btn-bet-cancel">取消</button>
                                    <button className="btn btn-bet-submit">确认</button>
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
