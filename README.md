# Fantasy Investing

[Fantasy Investing live][heroku]

[heroku]: https://fantasy-investing-app.herokuapp.com

Fantasy investing is a full-stack web application that simulates stock investing and trading. The goal of the app is to allow users to buy and sell virtual shares of companies and see their performance over time.

Fantasy Investing utilizes Python/Django on the backend, a PostgreSQL database, and React.js with a Redux architectural framework on the frontend.  

## Features & Implementation

The main features of the app include buying and selling virtual public company shares,
creating and updating watchlists, and reviewing information about a specific company.

### Buying and Selling Shares

Upon logging in, the user is taken to their main portfolio page, which includes current holding and performance information. The user can also make a trade by clicking the "Trade" button in the top navigation bar.

Once the Trade button is clicked, a trading form is rendered where the user can specify what type of trade they would want to make. When a trade is submitted, the app utilizes a Yahoo Finance Python module in the back end to pull live market data. Based on this data, a virtual trade is executed and the stock is added to the user's main holdings portfolio.

Fantasy Investing includes functionality to make partial sale of existing stock position as well as add to existing positions. In addition, when adding to existing portfolio, the purchase price is adjusted to be weighted average for all historical purchases for the specific company.

### Portfolios

Each user has one main portfolio of holdings where he/she can add stocks to. The user can also add a watchlist where he/she can add certain stocks they want to keep track of.

The main portfolio shows all the current positions of the user with total portfolio value as well as individual investments. There is also a dropdown where the user can select between different portfolios/watchlists.

The charts in the portfolio page utilize Google Charts.

### Reviewing Company Information

On top of every page, there is a search bar where a user can search a company by ticker. Upon doing a search, the user is taken to a page with company financial information and a chart with historical stock price performance.

## Future Directions for the Project

In addition to the features already implemented, we plan to continue work on this project.  The next steps for Fantasy Investing are outlined below.

### Making different types of orders

Allow for limit and other types different trades. Link the trades to actual market interest and simulate a real market desk environment

### Adding leaderboard for fantasy players

Keep track of best performing investors and have a leaderboard

### Allowing for messaging between users

Allow for messaging between users
