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
    historyList: PropTypes.array.isRequired,
    rankList: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        historyList: state.game.historyList,
        rankList: state.game.rankList
    }
}

export default connect(mapStateToProps)(TrendContainer)