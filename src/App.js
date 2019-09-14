import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import TrafficLight from './components/UI/trafficLight';
import MainMenu from './components/Navigation/MainMenu';

class App extends Component {

   render() {
      return (
         <div className="App"> 
            <Route path="/" component={MainMenu}/>
            <Route path="/red-light" component={TrafficLight} />
            <Route path="/yellow-light" component={TrafficLight} />
            <Route path="/green-light" component={TrafficLight} />
         </div>
      );
   }

}

export default App;