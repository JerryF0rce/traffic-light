import React, { Component } from 'react';
import './trafficLight.css'
   
class TrafficLight extends Component {
   constructor(props) {
      super(props);
      this.state = {
         redLight: {
            duration: 10000,
            blinkingDuration: 3000,
         },
         yellowLight: {
            duration: 3000
         }, 
         greenLight: {
            duration: 15000,
            blinkingDuration: 3000,
         },
         lastLight: sessionStorage.getItem('lastLight') || ''
      };
   }

   componentDidMount() {
      const currentLightRoute = this.props.history.location.pathname;
      const currentLight = this.transformRoute(currentLightRoute);
      const currentLightElement = document.querySelector(`.${currentLight}`);
      // before '/yellow-light' after 'yellowLight'

      if (currentLight !== 'yellowLight')sessionStorage.setItem('lastLight', currentLight);

      if (currentLight === 'redLight' || 'greenLight') this.goToYellowLight(currentLight, currentLightElement);
      if (currentLight === 'yellowLight' && !this.state.lastLight) this.goToRandomLight(currentLight);
      if (currentLight === 'yellowLight' && this.state.lastLight === 'greenLight') this.goToRedLight(currentLight);
      if (currentLight === 'yellowLight' && this.state.lastLight === 'redLight') this.goToGreenLight(currentLight);

      currentLightElement.classList.add('activeLights');

   }

   transformRoute = (curLight) => {
      return curLight
         .split('-')
         .map(
            (word, i) => i === 0 ?  word.slice(1) : word[0].toUpperCase() + word.slice(1)
         )
         .join('');
}

   goToYellowLight = (currentLight , currentLightElement) => {
      let totalSeconds = this.state[currentLight].duration / 1000;
      let showTimer = null;
      let timerId = null;
      if (currentLight !== 'yellowLight') {
         showTimer = document.querySelector(`.${currentLight}`).children[0];
         showTimer.textContent = totalSeconds - 1;
         timerId = setInterval(() => {
            showTimer.textContent = totalSeconds - 2
            totalSeconds--
            if (totalSeconds === 4) {
               currentLightElement.classList.add('hightlight')
            }
            if (totalSeconds === 0) {
               currentLightElement.classList.remove('hightlight')
            }
         }, 1000);
      }

      setTimeout(() => {
         clearInterval(timerId);
         this.props.history.replace('/yellow-light');
      }, this.state[currentLight].duration);
   }

   goToRandomLight = (currentLight) => {
      const lightsRoutes = ['/green-light', '/red-light'];
      let randomCount = Math.floor(Math.random()*2);
      sessionStorage.setItem('lastLight', this.transformRoute(lightsRoutes[randomCount]));
      setTimeout(() => {
         this.props.history.replace(lightsRoutes[randomCount]);
      }, this.state[currentLight].duration);
   }

   goToRedLight = (currentLight) => {
      setTimeout(() => {
         sessionStorage.setItem('lastLight', 'redLight');
         this.props.history.replace('/red-light');
      }, this.state[currentLight].duration);
   }

   goToGreenLight = (currentLight) => {
      setTimeout(() => {
         sessionStorage.setItem('lastLight', 'greenLight');
         this.props.history.replace('/green-light');
      }, this.state[currentLight].duration);
   }

   render () {
      return (
         <div className="trafficLight">
            <div className="light redLight"><div className="timer"></div></div>
            <div className="light yellowLight"></div>
            <div className="light greenLight"><div className="timer"></div></div>
         </div>
      );
   }
   
}

export default TrafficLight;