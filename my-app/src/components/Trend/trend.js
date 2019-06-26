import React, { Component } from 'react'
import { getBetHistroy, getBetRank } from '../../services/index'
import { setHistoryList, setRankList } from '../../actions';

import './trend.scss';

export class trend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.colorData = {
            red: 0,
            green: 0
        }
    }

    componentDidMount() {
        // Histroy
        getBetHistroy().then(rs => {
            const { dispatch } = this.props;
            dispatch(setHistoryList(rs.result.list));
        });

        // Rank 
        getBetRank().then(rs => {
            const { dispatch } = this.props;
            dispatch(setRankList(rs));
        });
    }
    

    buildHistoryList = (data) => {
        let list = [];
        const color = {
            red: 0,
            green: 0
        };
        data.forEach((item, index) => {
            // count color 
            if (Number(item.number) > 2) {
                color.red += 1;
            } else {
                color.green += 1;
            }

            // over 12
            if (index >= 12) {
                return true;
            }

            list.push(
                <div className="list-item" key={index}>
                    <div className="td-issues">{item.issue}期</div>
                    <div className={'td-number ' + (Number(item.number) > 2 ? 'red' : '')}>{item.number}</div>
                </div>
            );
        })

        this.colorData = color
        
        return list;
    }

    render() {
        
        return (
            <div className="trend" >
                <div className="trend-history">
                    <div className="history-title">历史走势分析</div>
                    <div className="history-list-title">
                        <div className="th-issues"><i className="icon-circle"></i>期号</div>
                        <div className="th-number"><i className="icon-circle"></i>开奖高度</div>
                    </div>
                    <div className="history-list-content">
                        <div className="history-list">
                        {this.buildHistoryList(this.props.historyList)}
                        {/* 
                        <div className="list-item">
                            <div className="td-issues">1330期</div>
                            <div className="td-number">1.9X</div>
                        </div>
                        */}
                        </div>
                    </div>
                </div>
                <div className="trend-statistics">
                    <div className="color-statistics">
                        <div className="color-title">
                            <i className="icon-circle"></i>最近30期
                        </div>
                        <div className="color-statistics-content">
                            <div className="statistics-text">
                                出现<span className="green">绿色数字{this.colorData.green}次</span>
                            </div>
                            <div className="statistics-text">
                                出现<span className="red">红色数字{this.colorData.red}次</span>
                            </div>
                        </div>
                    </div>
                    <div className="rank-statistics">
                        <div className="rank-title">
                            <i className="icon-circle"></i>最近300期出现次数
                        </div>
                        <div className="rank-content">
                            <div className="rank-list">
                                <div className="list-item">
                                    <div className="td-rank">区间</div>
                                    <div className="td-number">出现次数</div>
                                </div>
                                {Object.entries(this.props.rankList).map(([key,value], index) => (
                                    <div className="list-item" key={index}>
                                        <div className="td-rank">{key}</div>
                                        <div className="td-number">{value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default trend
