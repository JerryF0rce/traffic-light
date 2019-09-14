import React from 'react';
import './MainMenu.css';
import { Link } from 'react-router-dom';

const MainMenu = () => {
   return (
      <header>
         <div className="container">
            <Link to="/red-light">Go to: /red-light</Link>
            <Link to="/yellow-light" >Go to: /yellow-light</Link>
            <Link to="/green-light" >Go to: /green-light</Link>
         </div>
      </header>
   );
}

export default MainMenu;