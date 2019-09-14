import React from 'react';
import './MainMenu.css';
import { Link } from 'react-router-dom';

const MainMenu = () => {
   return (
      <header>
         <div className="container">
            <Link to="/#/traffic-light/red-light">Go to: /red-light</Link>
            <Link to="/#/traffic-light/yellow-light" >Go to: /yellow-light</Link>
            <Link to="/#/traffic-light/green-light" >Go to: /green-light</Link>
         </div>
      </header>
   );
}

export default MainMenu;