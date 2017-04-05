## Fantasy Investing

### Background

Fantasy investing is a full-stack web application that simulates stock investing and trading. The goal of the app is allow the user to buy and sell virtual shares of companies and see their performance over time. The app will also have a dynamic search of stocks by ticker and company name and will be able to show the selected company data in raw form as well as with graphs. The user will also be able to create watchlists and add companies to them.

### Functionality & MVP

This app will have the following functionality:
- [ ] Back end and front end user authentication
- [ ] Each user will have a portfolio of stocks owned, as well as option to create, delte or update watchlists. Portfolio page will show performance by stock and portfolio
- [ ] User can buy and sell full or partial stock positions, which will be reflected in the portfolio. User can also add companies to watchlists
- [ ] A search field that will dynamically pull information for the selected company by ticker or company and will render a new page showing the company data

Bonus features:
- [ ] Leaderboard for best performing investor

### Wireframes

[View Wireframes][wireframes]

[wireframes]: ./docs/wireframes

### Technologies & Technical Challenges

This web application will be implemented using following technologies:

- Django for backend
- PostgreSQL for database
- React/Redux for frontend
- D3 library on Javascript for any visualizations for data
- Yahoo Finance library on pip for live data on stocks

The primary technical challenges will be:
- Learning Django and implementing Auth within first two days
- Converting python data to JSON format in order to display in the front end
- Determining which analysis and data to display on each page

### Group Members & Work Breakdown

Our team consists of three members: Bo Katsarov, James Tae, and Hyun Chul Kim. We will be dividing the responsibility by feature.

Bo Katsarov:
- Back end and front end auth
- Search bar and functionality
- Graphs on company page

James Tae:
-	Back end and front end auth
-	Adding portfolio functionality (create, update, delete for watchlists)
-	Showing the performance of portfolio with graphics

Hyun Chul Kim:
- Fetching company data from yahoo finance module and showing it on company page
-	Adding stock trading functionality, which will add stocks to portfolios
-	News feed on company page 				 

### Implementation Timeline

**Day 1**: Bo & James get started on back end auth, Hyun starts company page (including back end database).

By the end of day we will have:
-	Functioning auth back end (Bo & James)
- Functioning back end for portfolios and stocks (Hyun)

**Day 2**: Bo & James work on front end auth and styling for login form and welcome page. Hyun continues working on front end company page and styling

By the end of day we will have:
-	Fully functioning and styled back end and front end auth (Bo & James)
- Functioning React/Redux front end for company page (Hyun)

**Day 3**: Bo starts working on the search, James starts working on portfolio React/Redux front end, Hyun finishes up styling of company page

By the end of day we will have:
-	Functioning search allowing the user to search and select companies (Bo)
- Portfolio feature functionality. User can create watchlists and add stocks to them. (James)
- Styling of company page (Hyun)

**Day 4**: Bo researches React D3 library and helps Hyun with charts on company page. Hyun works on functionality of making trades, James finishes portfolio page with adequate styling

By the end of day we will have:
-	Graphs on company page (Bo)
- Fully functioning and styled portfolio page (James)
- Tool for making trades with adequate styling (Hyun)

**Day 5**: Team effort to finish remaining parts of the project. Work on making project look better.

By the end of day we will have:
-	Better looking welcome page (James)
- Improved visuals on graphs (Bo)
- Extra styling on portfolio and company pages (Hyun)
