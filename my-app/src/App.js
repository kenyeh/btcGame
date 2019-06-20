import React from 'react';


import './App.css';

import AnimationCom from './components/Animation/AnimationCom';
import Layout from './components/Layout/layout';
import Footer from './components/Footer/footer';



function App() {
  return (
    <div className="App">
      <AnimationCom />
      <Layout />
      <Footer />
    </div>
  );
}

export default App;
