import React from 'react';


import './App.css';

import AnimationContainer from './containers/AnimationCom';
import Layout from './components/Layout/layout';
import Footer from './components/Footer/footer';



function App() {
  return (
    <div className="App">
      <AnimationContainer />
      <Layout />
      <Footer />
    </div>
  );
}

export default App;
