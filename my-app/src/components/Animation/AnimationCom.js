import React, { Component } from 'react'

import './AnimationCom.scss';

export default class AnimationCom extends Component {
    
    render() {
        return (
            <div className="animted-section">
                <div className="section-area">
                    <div className="bg-universe"></div>
                    <div className="ground">
                        <div className="launcher"></div>
                        <div className="launchpad"></div>
                    </div>
                    <div className="rocket">
                        <div className="am-fire"></div>
                    </div>
                </div>
            </div>
        )
    }
}
