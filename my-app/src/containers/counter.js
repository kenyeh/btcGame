import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Counter from '../components/Counter/counter'


export class CounterContainer extends Component {
    
    render() {
        return ( <Counter {...this.props}/>);
    }
}

CounterContainer.propTypes = {
    currentIssues: PropTypes.string.isRequired,
    playResult: PropTypes.object,
    animationStatus: PropTypes.string
};

function mapStateToProps(state) {
    return {
        currentIssues: state.game.currentIssues,
        playResult: state.game.playResult,
        animationStatus: state.game.animationStatus
    }
}

export default connect(mapStateToProps)(CounterContainer)