import React, { Component } from 'react';

import Header from '../Header/header'
import Counter from '../Counter/couneter'
import Trend from '../Trend/trend'
import Bet from '../Bet/bet'

import './layout.scss';


class layout extends Component {
    render() {
        return (
            <div className="layout">
                <Header />
                <div className="game-layout">
                    <div className="left-panel">
                        <Counter />
                    </div>
                    <div className="center-panel">
                        <Bet />
                    </div>
                    <div className="right-panel">
                        <Trend />
                    </div>
                </div>
            </div>
        )
    }
}
export default layout;
