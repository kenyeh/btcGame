import React, { Component } from 'react'

import logo from '../../images/logo.png';
import './header.scss';

class header extends Component {
    render() {
        return (
            <div className="header">
                <div className="logo">
                    <img src={logo} alt=""/>
                </div>
                <a href="www.google.com" className="btn btn-link">玩法说明</a>
                <a href="www.google.com" className="btn btn-link">号源验证</a>
            </div>
        )
    }
}
export default header;
