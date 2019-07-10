import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
// import * as actions from '../actions';
import AnimationCom from '../components/Animation/AnimationCom'


export class AnimationContainer extends Component {
    
    render() {
        return ( <AnimationCom {...this.props}/>);
    }
}

AnimationContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    animationStatus: PropTypes.string
};

function mapStateToProps(state) {
    return {
        animationStatus: state.game.animationStatus
    }
}

export default connect(mapStateToProps)(AnimationContainer)