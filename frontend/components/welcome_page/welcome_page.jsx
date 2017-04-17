import React from 'react';
const WelcomePage = () => {
  let placeholder = 'Fantasy Investing is a stock trading simulator allowing users to trade stocks real-time in a virtual portfolio. Each new user starts out with $100,000 and can look up companies and make live trades based on the current price of the respective stock. The application is intended to help inexperienced traders and investors to get a sense of what it is to invest in the stock market.';
  return (
    <div className='welcome-page'>
      <div className='background-pic'>
      </div>

      <div className ='background-text'>
              <h1>
          Welcome to Fantasy Investing
        </h1>
        <h2 className="splash_stock">
          Your Future in Stocks...
        </h2>
      </div>
      <div className='content'>
            <h3>What is Fantasy Investing?</h3>
            <p>
              {placeholder}
            </p>
      </div>


    </div>
  );
};

export default WelcomePage;
