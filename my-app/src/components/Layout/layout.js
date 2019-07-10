import React, { Component } from 'react';

import Header from '../Header/header'
import CounterContainer from '../../containers/counter'
import TrendContainer from '../../containers/trend'
import BetContainer from '../../containers/bet'
// import { setGameConfig } from '../../actions';
// import { gameConfig } from '../../services'


import { message } from 'antd';


import './layout.scss';

message.config({
    top: 40
});


class layout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            modalLoading: false,
            // nickname: ''
        }
    }

    /* componentDidMount() {}
        const { dispatch } = this.props;

        if (gameConfig) {
            dispatch(setGameConfig(gameConfig));
        }
        
        getGameConfig().then((rs) => {
            if (rs) {
                dispatch(setGameConfig(rs));
                // if (Number(rs.userLvl) === 0) {
                //     Modal.error({
                //         title: '温馨提示',
                //         content: '您目前是总代，没有权限投注',
                //         okText: "确认"
                //     });
                // }

                // if (rs.userNickName === '' || !rs.userNickName) {
                //     this.setState({ showModal: true });
                // }
            }
        });
    } */
    
    /* componentDidUpdate(prevProps) {
        if ((this.props.gameConfigData !== prevProps.gameConfigData) && this.props.gameConfigData) {
            console.log('ConfigData', this.props.gameConfigData);
            if (this.props.gameConfigData.userNickName === '') {
                this.setState({ showModal: true });
            }
        }
    } */

    

    /* nicknameOnChange = (event) => {
        this.setState({
            nickname: event.target.value
        })
    }

    submitNickname = () => {
        console.log('submitNickname');
        const setNickname = this.state.nickname
        const textLength = [...setNickname].length
        let msgText = ''

        if (!/^[\u4e00-\u9fa5a-zA-Z0-9]+$/.test(setNickname)) {
            msgText = '只支持英文、数字、汉字';
        }

        if (textLength < 4) {
            msgText = '最少输入4个字元';
        }

        if (textLength > 12) {
            msgText = '最多输入12个字元';
        }

        if (msgText !== '') {
            message.warning(msgText);
            this.setState({ nickname: '' });
            return ;
        }


        this.setState({ modalLoading: true });
        

        submitNickname({
            nickname: setNickname,
            headImg: 1
        }).then(rs => {
            console.log('submitNickname', rs);
            if (rs) {
                if (rs.isSuccess === 1) {
                    message.success(rs.msg);
                    window.location.reload();
                } else {
                    message.error(rs.msg);
                }
            }
        })
    } */

    render() {

        
        
        return (
            <div className="layout">
                {/* <Modal
                    title="Modal"
                    visible={this.state.visible}
                    onOk={this.hideModal}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消">
                    <p>您目前是总代，没有权限投注</p>
                </Modal>
                <Modal
                    title="输入昵称"
                    visible={this.state.showModal}
                    closable={false}
                    footer={[
                        <Button key="submit" type="primary" loading={this.state.modalLoading} onClick={this.submitNickname}>
                            提交
                        </Button>,
                    ]}>
                        <div className="input-section">
                            <Input placeholder="请输入昵称" value={this.state.nickname} onChange={this.nicknameOnChange}/>
                        </div> 
                </Modal> */}
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
