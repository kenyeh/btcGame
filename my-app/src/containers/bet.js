import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Bet from '../components/Bet/bet'

export class BetContainer extends Component {
    render() {
        return ( <Bet {...this.props}/>);
    }
}

BetContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(BetContainer)