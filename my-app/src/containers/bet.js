import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Bet from '../components/Bet/bet'
import { setLastNumber, setIssues, setBetAward } from '../actions';
import { getLastNumber, getBetAward } from '../services'


export class BetContainer extends Component {
    componentDidMount () {
        // get lastnumber data
        const { dispatch } = this.props;

        getLastNumber().then(rs => {
            // console.log('BetContainer ', rs);
            const issues = rs.lastnumber;
            dispatch(setLastNumber(rs));
            console.log(issues);
            dispatch(setIssues(issues));
        })

        getBetAward().then(rs => {
            dispatch(setBetAward(rs));
        })
    }
    
    render() {
        return ( <Bet {...this.props}/>);
    }
}

BetContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    issues: PropTypes.string,
    lastNumberData: PropTypes.object,
    betAwardData: PropTypes.object,
    loading: PropTypes.bool,
};

function mapStateToProps(state) {
    return {
        issues: state.game.issues,
        lastNumberData: state.game.lastNumberData,
        betAwardData: state.game.betAwardData,
        loading: state.game.loading
    }
}

export default connect(mapStateToProps)(BetContainer)