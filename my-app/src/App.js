import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import './App.css';

import AnimationContainer from './containers/AnimationCom';
import Layout from './components/Layout/layout';
import Footer from './components/Footer/footer';



export class App extends Component {
  render() {
    return (
      <div className="App">
        <AnimationContainer />
        <Layout {...this.props}/>
        <Footer />
      </div>
    );
  }
  
}

App.propTypes = {
  gameConfigData: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    gameConfigData: state.game.gameConfigData
  }
}

export default connect(mapStateToProps)(App)
