import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Trend from '../components/Trend/trend'


export class TrendContainer extends Component {
    
    render() {
        return ( <Trend {...this.props}/>);
    }
}

TrendContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    historyList: PropTypes.array,
    rankList: PropTypes.object,
    issueCode: PropTypes.number
};

function mapStateToProps(state) {
    return {
        historyList: state.game.historyList,
        rankList: state.game.rankList,
        issueCode: state.game.trendIssueCode
    }
}

export default connect(mapStateToProps)(TrendContainer)