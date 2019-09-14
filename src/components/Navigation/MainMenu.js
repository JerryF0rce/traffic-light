import React from 'react';
import './MainMenu.css';
import { Link } from 'react-router-dom';

const MainMenu = () => {
   return (
      <header>
         <div className="container">
            <a href="/traffic-light/#/red-light">Go to: /red-light</a>
            <a href="/traffic-light/#/yellow-light" >Go to: /yellow-light</a>
            <a href="/traffic-light/#/green-light" >Go to: /green-light</a>
         </div>
      </header>
   );
}

export default MainMenu;