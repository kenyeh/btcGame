import React, { Component } from 'react'

// import { Modal, Carousel } from 'antd';
import './header.scss';

class header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalInstruction: false
        };
    }

    openInstruction = () => {
        this.setState({
            modalInstruction: true
        })
    }

    render() {
        // const CarouselSettings = {
        //     arrows: true
        // };
        return (
            <div className="header">
                {/* <Modal
                    wrapClassName = "gameModalStyle"
                    title=""
                    width="860px"
                    footer={null}
                    visible={this.state.modalInstruction}
                >
                    <div className="title-img"></div>
                    
                    <div className="game-modal-content">
                        <div className="help">
                        详情可查看"<a href="./help.html" className="help-link">帮助中心</a>"
                        </div>
                        <div className="game-carousel-box">
                            <Carousel
                                {...CarouselSettings}
                            >
                                <div className="carousel-card">
                                    <h3>1</h3>
                                </div>
                                <div className="carousel-card">
                                    <h3>2</h3>
                                </div>
                                <div className="carousel-card">
                                    <h3>3</h3>
                                </div>
                                <div className="carousel-card">
                                    <h3>4</h3>
                                </div>
                            </Carousel>
                        </div>
                        <div className="modal-game-tips">温馨提示：如遇比特币网络不稳定情况，我们会进行平台撤单处理，退还您当期本金，请您谅解！</div>
                    </div>
                </Modal> */}
                <div className="logo"></div>
                {/* <button className="btn btn-link" onClick={this.openInstruction}>玩法说明</button>
                <button className="btn btn-link" >号源验证</button> */}
            </div>
        )
    }
}
export default header;
