import React, { Component } from 'react';
import './trafficLight.css'
   
class TrafficLight extends Component {
   constructor(props) {
      super(props);
      this.state = {
         currentLightRoute: this.props.history.location.pathname,
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
         lastLight: sessionStorage.getItem('lastLight') || '',
         lastTimerID: sessionStorage.getItem('lastTimerID') || ''
      };
   }

   componentDidMount () {
      const currentLight = this.transformRoute(this.state.currentLightRoute);

      const currentLightElement = document.querySelector(`.${currentLight}`);
      // before '/yellow-light' after 'yellowLight'

      if (currentLight !== 'yellowLight') {
         sessionStorage.setItem('lastLight', currentLight);
         this.numberUntilNextLight(currentLight, currentLightElement)
      }

      if (currentLight === 'redLight' || 'greenLight') {
         this.goToYellowLight(currentLight);
      }
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

   setTimer = (path, duration) => {
      let storageTimerId = +this.state.lastTimerID;
      clearTimeout(storageTimerId);
      let timerID = setTimeout(() => {
         if (path !== '/yellow-light') {
         sessionStorage.setItem('lastLight', `${this.transformRoute(path)}`);
         }
         this.props.history.replace(path);
      }, duration);
      sessionStorage.setItem('lastTimerID', `${timerID}`)
   }

   numberUntilNextLight = (currentLight , currentLightElement) => {
      let totalSeconds = this.state[currentLight].duration / 1000;
      let showTimer = document.querySelector(`.${currentLight}`).children[0];
      showTimer.textContent = totalSeconds - 1;
      let timerId = setInterval(() => {
         showTimer.textContent = totalSeconds - 2
         totalSeconds--
         if (totalSeconds === 4) {
            currentLightElement.classList.add('hightlight')
         }
         if (totalSeconds === 0) {
            clearInterval(timerId);
            currentLightElement.classList.remove('hightlight')
         }
      }, 1000);
   }

   goToRandomLight = (currentLight) => {
      const lightsRoutes = ['/green-light', '/red-light'];
      let randomCount = Math.floor(Math.random()*2);
      sessionStorage.setItem('lastLight', this.transformRoute(lightsRoutes[randomCount]));
      this.setTimer(lightsRoutes[randomCount], this.state[currentLight].duration)
   }

   goToYellowLight = (currentLight) => {
      if (this.state.currentLightRoute === '/yellow-light') return;
      this.setTimer('/yellow-light', this.state[currentLight].duration);
   }

   goToRedLight = (currentLight) => {
      this.setTimer('/red-light', this.state[currentLight].duration);
   }

   goToGreenLight = (currentLight) => {
      this.setTimer('/green-light', this.state[currentLight].duration);
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