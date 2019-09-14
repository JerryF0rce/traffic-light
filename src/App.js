import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import TrafficLight from './components/UI/trafficLight';
import MainMenu from './components/Navigation/MainMenu';

class App extends Component {

   render() {
      return (
         <div className="App"> 
            <Route path="/" component={MainMenu}/>
            <Route path="/#/traffic-light/red-light" component={TrafficLight} />
            <Route path="/#/traffic-light/yellow-light" component={TrafficLight} />
            <Route path="/#/traffic-light/green-light" component={TrafficLight} />
         </div>
      );
   }

}

export default App;