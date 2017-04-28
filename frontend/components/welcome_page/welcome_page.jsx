import React from 'react';
const WelcomePage = () => {
  let placeholder = 'Fantasy Investing is a stock trading simulator allowing users to trade stocks real-time in a virtual portfolio. Each new user starts out with $100,000 and can look up companies and make live trades based on the current price of the respective stock. The application is intended to help inexperienced traders and investors to get a sense of what it is to invest in the stock market.';
  return (
    <div>
      <a name="about"></a>
      <div className="intro-header">
        <div className="container">

          <div className="row">
            <div className="col-lg-12">
              <div className="intro-message">
                <h1 className="splash-welcome">Welcome to Fantasy Investing</h1>
                <h3 className="splash-welcome2">Stock Trading Simulator</h3>
                </div>
              </div>
            </div>

          </div>

        </div>

        <a  name="services"></a>
        <div className="content-section-a">

          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-sm-6">
                <hr className="section-heading-spacer"></hr>
                  <div className="clearfix"></div>
                  <h2 className="section-heading">Portfolio</h2>
                  <p className="lead">Keep track of your portfolio and follow the performance of your investments.</p>
                </div>
                <div className="col-lg-5 col-lg-offset-2 col-sm-6">
                  <img className="img-responsive" src="https://res.cloudinary.com/dh7hv7kkd/image/upload/v1493405205/portfolio.png" alt="" />
                  </div>
                </div>

              </div>
            </div>

            <div className="content-section-b">

              <div className="container">

                <div className="row">
                  <div className="col-lg-5 col-lg-offset-1 col-sm-push-6  col-sm-6">
                    <hr className="section-heading-spacer" />
                      <div className="clearfix"></div>
                      <h2 className="section-heading">Trade Shares</h2>
                      <p className="lead">Fantasy Investing offers seamless realistic stock trading experience with up-to-date stock prices during market hours.</p>
                    </div>
                    <div className="col-lg-5 col-sm-pull-6  col-sm-6">
                      <img className="img-responsive" src="https://res.cloudinary.com/dh7hv7kkd/image/upload/v1493405397/trade.png" alt="" />
                      </div>
                    </div>

                  </div>

                </div>

                <div className="content-section-a">

                  <div className="container">

                    <div className="row">
                      <div className="col-lg-5 col-sm-6">
                        <hr className="section-heading-spacer" />
                        <div className="clearfix"></div>
                        <h2 className="section-heading">Research Companies</h2>
                        <p className="lead">Dive deeper into the company before buying or selling shares. A wide variety of data allows you to make sharp decisions to improve your portfolio.</p>
                      </div>
                        <div className="col-lg-5 col-lg-offset-2 col-sm-6">
                          <img className="img-responsive" src="https://res.cloudinary.com/dh7hv7kkd/image/upload/v1493405400/company.png" alt="" />
                        </div>
                    </div>

                  </div>

                </div>

      </div>
  );
};

export default WelcomePage;
