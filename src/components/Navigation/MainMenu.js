import React from 'react';
import './MainMenu.css';

const MainMenu = () => {
   return (
      <header>
         <div className="container">
            <a href="/red-light">Go to: /red-light</a>
            <a href="/yellow-light">Go to: /yellow-light</a>
            <a href="/green-light">Go to: /green-light</a>
         </div>
      </header>
   );
}

export default MainMenu;