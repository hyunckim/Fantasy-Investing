import React from 'react';
import NavBarContainer from './navbar/navbar_container';

const App = ({ children }) => {
  return (
    <div>
      <header className='header' >
          <NavBarContainer />
      </header>
      { children }
    </div>
  );
};

export default App;
