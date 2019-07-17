import React, { Component } from 'react'

import { Modal, Carousel } from 'antd';
import './header.scss';

class header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalInstruction: false,
            modalSourceInfo: false
        };
        this.helpLink = `${window.location.protocol}${window.indexServer}/help/queryLotteryDetail?helpId=2123`
        // console.log(this.helpLink);
    }

    ToggleInstruction = () => {
        this.setState({
            modalInstruction: !this.state.modalInstruction
        })
    }
    ToggleSourceInfo = () => {
        this.setState({
            modalSourceInfo: !this.state.modalSourceInfo
        })
    }
    

    render() {
        const CarouselSettings = {
            arrows: true
        };
        return (
            <div className="header">
                <Modal
                    wrapClassName = "gameModalStyle"
                    title=""
                    width="860px"
                    closable={true}
                    maskClosable={true}
                    footer={null}
                    visible={this.state.modalInstruction}
                    onCancel={this.ToggleInstruction}
                >
                    <div className="instruction-title-img"></div>
                    
                    <div className="game-modal-content instruction">
                        <div className="help">
                        详情可查看"<a href={this.helpLink} className="help-link">帮助中心</a>"
                        </div>
                        <div className="game-carousel-box">
                            <Carousel
                                {...CarouselSettings}
                            >
                                <div className="carousel-card c1">
                                    <div className="card">
                                        <div className="text-content">
                                            <p className="c-title">比特币游戏2.0</p>
                                            <p className="c-sub-title">全新模式 · 全新玩法</p>
                                            <p className="text">
                                                突破、极致是比特币游戏的生命源泉，比特币冲天炮是继比特币分分彩后，又一凤凰娱乐研发的全新力作游戏。
                                            </p>
                                        </div>
                                        <div className="pic"></div>
                                    </div>
                                </div>
                                <div className="carousel-card c2">
                                    <div className="card">
                                        <div className="text-content">
                                            <p className="c-title">获奖，只需为火箭升空呐喊助威</p>
                                            <p className="text">
                                                当火箭上升高度超过您选择的投注高度，您就是合格的航天英雄，可以收获不菲的奖金!
                                            </p>
                                        </div>
                                        <div className="pic"></div>
                                    </div>
                                </div>
                                <div className="carousel-card c3">
                                    <div className="card">
                                        <div className="text-content">
                                            <p className="c-title">极速开奖时间</p>
                                            <p className="text">
                                                每一次火箭升空的周期大概在30s--70s之间，让你省去等待的时间，极速投注成为可能！
                                            </p>
                                        </div>
                                        <div className="pic"></div>
                                    </div>
                                </div>
                                <div className="carousel-card c4">
                                    <div className="card">
                                        <div className="text-content">
                                            <p className="c-title">中奖金额你做主</p>
                                            <p className="text">
                                                与其他游戏定额中奖金额不同的是，冲天炮游戏中您可选择投注高度, 选择越高，可能的中奖金额会越高，决策与运气在博弈！
                                            </p>
                                        </div>
                                        <div className="pic"></div>
                                    </div>
                                </div>
                            </Carousel>
                        </div>
                        <div className="modal-game-tips">温馨提示：如遇比特币网络不稳定情况，我们会进行平台撤单处理，退还您当期本金，请您谅解！</div>
                    </div>
                </Modal>
                <Modal
                    wrapClassName = "gameModalStyle"
                    title=""
                    width="860px"
                    closable={true}
                    maskClosable={true}
                    footer={null}
                    visible={this.state.modalSourceInfo}
                    onCancel={this.ToggleSourceInfo}
                >
                    <div className="source-title-img"></div>
                    
                    <div className="game-modal-content source">
                        <div className="game-carousel-box">
                            <Carousel
                                {...CarouselSettings}
                            >
                                <div className="carousel-card c1">
                                    <div className="card">
                                        <div className="text-content">
                                            <p className="c-title">号码校验</p>
                                            <p>下载手机移动端，进入凤凰比特币冲天炮首页，点击右上角“官方号源”。</p>
                                            <div className="qrcode-box">
                                                <div className="qrcode-img"></div>
                                                <div className="qrcode-text">
                                                    <p>扫二维码下载</p>
                                                    <p>凤凰娱乐APP</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pic"></div>
                                    </div>
                                </div>
                                <div className="carousel-card c2">
                                    <div className="card">
                                        <div className="text-content">
                                            <p className="c-title">号码校验</p>
                                            <p>进入凤凰开奖中心，比特币会有专业的号源说明和号码校验工具为您提供服务，为您安心投注保驾护航。</p>
                                            <div className="qrcode-box">
                                                <div className="qrcode-img"></div>
                                                <div className="qrcode-text">
                                                    <p>扫二维码下载</p>
                                                    <p>凤凰娱乐APP</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pic"></div>
                                    </div>
                                </div>
                            </Carousel>
                        </div>
                    </div>
                </Modal>
                <div className="logo"></div>
                <button className="btn btn-link" onClick={this.ToggleInstruction}>玩法说明</button>
                <button className="btn btn-link" onClick={this.ToggleSourceInfo}>号源验证</button>
            </div>
        )
    }
}
export default header;
