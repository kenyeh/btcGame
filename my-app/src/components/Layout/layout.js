import React, { Component } from 'react';

import Header from '../Header/header'
import CounterContainer from '../../containers/counter'
import TrendContainer from '../../containers/trend'
import BetContainer from '../../containers/bet'

import { message } from 'antd';

import './layout.scss';

message.config({
    top: 40
});


class layout extends Component {
    render() {
        return (
            <div className="layout">
                <Header />
                <div className="game-layout">
                    <div className="left-panel">
                        <CounterContainer />
                    </div>
                    <div className="center-panel">
                        <BetContainer />
                    </div>
                    <div className="right-panel">
                        <TrendContainer />
                    </div>
                </div>
            </div>
        )
    }
}
export default layout;
