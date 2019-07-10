import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Bet from '../components/Bet/bet'
// import { setLastNumber } from '../actions';
// import { getLastNumber } from '../services';


export class BetContainer extends Component {
    // componentDidMount () {
    //     // get lastnumber data
    //     const { dispatch } = this.props;
    //     getLastNumber().then(rs => {
    //         // console.log('BetContainer ', rs);
    //         if (rs) {
    //             dispatch(setLastNumber(rs));
    //         }
    //     })
    // }
    
    render() {
        return ( <Bet {...this.props}/>);
    }
}

BetContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    // issues: PropTypes.string,
    // currentIssues: PropTypes.string,
    // lastNumberData: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        // issues: state.game.issues,
        // currentIssues: state.game.currentIssues,
        // lastNumberData: state.game.lastNumberData,
    }
}

export default connect(mapStateToProps)(BetContainer)