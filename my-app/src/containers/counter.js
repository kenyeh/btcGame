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
    issues: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        issues: state.game.issues,
    }
}

export default connect(mapStateToProps)(CounterContainer)