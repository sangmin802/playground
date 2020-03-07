import React, { Component } from 'react';
import './App.css';

import Components from './components/components.js';

class App extends Component{
  render(){
    return(
      <div className="App">
        <img src="favicon.ico" alt="ReactLogo"/>
        <Components.Subject></Components.Subject>
        <Components.Nav></Components.Nav>
        <Components.Controls></Components.Controls>
        <Components.Content></Components.Content>
      </div>
    );
  }
}

export default App;
