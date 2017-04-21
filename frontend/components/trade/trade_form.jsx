import React from 'react';
import { hashHistory } from 'react-router';
import { fetchStockPrice } from "../../util/stock_api_util";

class TradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.stock;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePromise = this.handlePromise.bind(this);
    this.updateBalance = this.updateBalance.bind(this);
  }

  handleSubmit(e) {
    debugger;
    e.preventDefault();
    this.props.removeStockErrors();
    let price = undefined;
    let today = new Date();
    if (today.getDay() < 6 && today.getHours() + (today.getTimezoneOffset() / 60) > 12 &&
        today.getHours() + (today.getTimezoneOffset() / 60) < 24) {
        this.fetchData(this.state.ticker.toUpperCase());
    } else {
      this.props.receiveStockErrors("The U.S. equity market is currently closed");
    }
  }

  fetchData(ticker, index = 0) {
    let username = ["d6166222f6cd23d2214f20c0de1d4cc3", "0f51c94416c5a029ced069c9c445bcf4"];
    let password = ["6fbb48d898d18930d6fc1e2d4e1bd54b", "dfb23653432156bdbf868393255d9f3d"];

    $.ajax({
        type: "GET",
        url: `https://api.intrinio.com/data_point?identifier=${ticker}&item=last_price`,
        dataType: 'json',
        headers: {
          "Authorization": "Basic " + btoa(username[index] + ":" + password[index])
        },
        success: (res) => {
          if (res.missing_access_codes) {
            this.fetchData(ticker, index + 1);
          } else {
            this.handlePromise(res);
          }
        }
    });
  }

  handlePromise(res) {
    let price = res.value;
    let existingPosition = undefined;
    for (let i = 0; i < this.props.currentStocks.length; i++) {
      if (this.props.currentStocks[i].ticker === this.state.ticker.toUpperCase()) {
        existingPosition = this.props.currentStocks[i];
        break;
      }
    }

    if (this.state.action === "Buy") {
      this.buyStock(existingPosition, price);
    } else if (this.state.action === "Sell") {
      this.sellStock(existingPosition, price);
    }
  }

  buyStock(existingPosition, price) {
    if (parseInt(this.props.balance) >= (price * parseInt(this.state.number_of_shares))) {

      let purchaseInfo = {
        ticker: this.state.ticker.toUpperCase(),
      };

      let action = "";
      if (existingPosition) {
        purchaseInfo["id"] = existingPosition.id;
        purchaseInfo["purchase_price"] = ((parseFloat(existingPosition.purchase_price) * parseInt(existingPosition.number_of_shares))
          + (price * parseInt(this.state.number_of_shares))) /
          (parseInt(existingPosition.number_of_shares) + parseFloat(this.state.number_of_shares));
        purchaseInfo["number_of_shares"] = parseInt(existingPosition.number_of_shares)
          + parseInt(this.state.number_of_shares);
        action = this.props.updateStock;
      } else {
        purchaseInfo["purchase_price"] = price;
        let today = new Date();
        purchaseInfo["purchase_date"] =
          `${today.getFullYear}-${today.getMonth() + 1}-${today.getDate()}`;
        purchaseInfo["number_of_shares"] = this.state.number_of_shares;
        let portfolio;
        for (let i = 0; i < this.props.portfolio.length; i++) {
          if (this.props.portfolio[i].main === true) {
            portfolio = this.props.portfolio[i];
            break;
          }
        }
        purchaseInfo["portfolio"] = portfolio;
        action = this.props.createStock;
      }
      let newBalance = Math.round((parseInt(this.props.balance) -
        (price * parseInt(this.state.number_of_shares))));
      this.updateBalance(newBalance);
      action(purchaseInfo).then(hashHistory.push("/portfolio"));
    } else {
      this.props.receiveStockErrors("You have insufficient balance for this trade");
    }
  }

  sellStock(existingPosition, price) {

    if (existingPosition) {
      let newBalance = Math.round((parseInt(this.props.balance) +
        (price * parseInt(this.state.number_of_shares))));
      if (parseInt(this.state.number_of_shares) < parseInt(existingPosition.number_of_shares)) {
        let saleInfo = {
          id: existingPosition.id,
          number_of_shares: parseInt(existingPosition.number_of_shares)
            - parseInt(this.state.number_of_shares)
        };
        this.props.updateStock(saleInfo).then(hashHistory.push("/portfolio"));
        this.updateBalance(newBalance);
      } else if (parseInt(this.state.number_of_shares) === parseInt(existingPosition.number_of_shares)) {
        this.props.deleteStock({id: existingPosition.id});
        this.updateBalance(newBalance);
      } else {
        this.props.receiveStockErrors("You are trying to sell more shares than you have");
      }
    } else {
      this.props.receiveStockErrors(`You don't have any ${this.state.ticker} shares to sell`);
    }
  }

  updateBalance(newBalance) {
    this.props.updateInvestor( {id: this.props.investor.id, balance: newBalance});
  }

  update(field) {
    return e => {
      this.setState({[field]: e.target.value});
    };
  }

  render() {

    return (
      <div className="trade-form-container">
        <div>
          <h3 className='trade-form-title'>Submit your order</h3>
        </div>
        <p className="trade-form-errors">{this.props.error}</p>
        <form className="trade-form" onSubmit={this.handleSubmit}>
          <label> Action
            <select className="trade-action" onChange={this.update('action')}>
              <option value="" disabled selected></option>
              <option value="Buy">Buy</option>
              <option value="Sell">Sell</option>
            </select>
          </label>
          <label> Symbol
            <input className="form-symbol" onChange={this.update("ticker")} placeholder='Ex:MSFT'/>
          </label>
          <label> Quantity
            <input className="form-shares" onChange={this.update('number_of_shares')} placeholder='# Of Shares' />
          </label>

          <input type="submit" id="submit-button" className="form-submit-button" value="Submit"/>
        </form>
        <div className="trade-form-popup">

        </div>
      </div>

    );
  }
}

export default TradeForm;
