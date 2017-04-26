import React from 'react';
import { hashHistory } from 'react-router';
import { fetchStockPrice } from "../../util/stock_api_util";

class TradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {stock: this.props.stock, formState: "new form"};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePromise = this.handlePromise.bind(this);
    this.updateBalance = this.updateBalance.bind(this);
    this.formState = "new form";
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.removeStockErrors();
    let price = undefined;
    let today = new Date();
    if (today.getDay() < 6 && today.getHours() + (today.getTimezoneOffset() / 60) > 12 &&
        today.getHours() + (today.getTimezoneOffset() / 60) < 24) {
        this.fetchData(this.state.stock.ticker.toUpperCase());
    } else {
      this.props.receiveStockErrors("The U.S. equity market is currently closed");
    }
  }

  fetchData(ticker, index = 0) {
   let username = [
      "d6166222f6cd23d2214f20c0de1d4cc3",
      "0f51c94416c5a029ced069c9c445bcf4",
      "77a9accfe589ee1bde92b347cd7243bf",
      "00c96699cb9905e2e93939af22fd255d",
      "9543da974ae42ceb2724f4fc215bb83b",
      "1b4f66213e0ee9c96e1298adaf093d99",
      "4d28e4bb9ba48a3e05e0f7d5e03fe130",
      "ef2c9c791fd32dcb138fc9ca511a651c"
      ];
    let password = [
      "6fbb48d898d18930d6fc1e2d4e1bd54b",
      "dfb23653432156bdbf868393255d9f3d",
      "6fabe9c15bd1e7ead66b7cc3cd6b3e44",
      "2ce4b7bb869b8c78e176ee210c20269d",
      "1f91849f806fe320b31c550ebe39bae9",
      "2e11b74611f8e7a5f52f68a8e04c88b7",
      "286ce4fbedd72511eac4dd3e58831c67",
      "4a9214f9a7031f8870897deb8cbdd488"
      ];
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
      if (this.props.currentStocks[i].ticker === this.state.stock.ticker.toUpperCase()) {
        existingPosition = this.props.currentStocks[i];
        break;
      }
    }

    if (this.state.stock.action === "Buy") {
      this.buyStock(existingPosition, price);
    } else if (this.state.stock.action === "Sell") {
      this.sellStock(existingPosition, price);
    }
  }

  buyStock(existingPosition, price) {
    if (parseInt(this.props.balance) >= (price * parseInt(this.state.stock.number_of_shares))) {

      let purchaseInfo = {
        ticker: this.state.stock.ticker.toUpperCase(),
      };

      let action = "";
      if (existingPosition) {
        purchaseInfo["id"] = existingPosition.id;
        purchaseInfo["purchase_price"] = ((parseFloat(existingPosition.purchase_price) * parseInt(existingPosition.number_of_shares))
          + (price * parseInt(this.state.stock.number_of_shares))) /
          (parseInt(existingPosition.number_of_shares) + parseFloat(this.state.stock.number_of_shares));
        purchaseInfo["number_of_shares"] = parseInt(existingPosition.number_of_shares)
          + parseInt(this.state.stock.number_of_shares);
        action = this.props.updateStock;
      } else {
        purchaseInfo["purchase_price"] = price;
        let today = new Date();
        purchaseInfo["purchase_date"] =
          `${today.getFullYear}-${today.getMonth() + 1}-${today.getDate()}`;
        purchaseInfo["number_of_shares"] = this.state.stock.number_of_shares;
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
        (price * parseInt(this.state.stock.number_of_shares))));
      this.updateBalance(newBalance);
      action(purchaseInfo).then(hashHistory.push("/portfolio"));
    } else {
      this.props.receiveStockErrors("You have insufficient balance for this trade");
    }
  }

  sellStock(existingPosition, price) {

    if (existingPosition) {
      let newBalance = Math.round((parseInt(this.props.balance) +
        (price * parseInt(this.state.stock.number_of_shares))));
      if (parseInt(this.state.stock.number_of_shares) < parseInt(existingPosition.number_of_shares)) {
        let saleInfo = {
          id: existingPosition.id,
          number_of_shares: parseInt(existingPosition.number_of_shares)
            - parseInt(this.state.stock.number_of_shares)
        };
        this.props.updateStock(saleInfo).then(hashHistory.push("/portfolio"));
        this.updateBalance(newBalance);
      } else if (parseInt(this.state.stock.number_of_shares) === parseInt(existingPosition.number_of_shares)) {
        this.props.deleteStock({id: existingPosition.id});
        this.updateBalance(newBalance);
      } else {
        this.props.receiveStockErrors("You are trying to sell more shares than you have");
      }
    } else {
      this.props.receiveStockErrors(`You don't have any ${this.state.stock.ticker} shares to sell`);
    }
  }

  updateBalance(newBalance) {
    this.props.updateInvestor( {id: this.props.investor.id, balance: newBalance});
  }

  update(field) {
    debugger;
    return e => {
      let stock = this.state.stock;
      stock.field = e.target.value;
      this.setState({stock: stock});
    };
  }


  render() {

    let formHtml = (
        <div>
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

    if (this.formState === "confirm trade") {
      formHtml = (<div>Do you want to make this trade?</div>);
    } else if (this.formState === "trade complete") {
      formHtml = (<div>Trade complete</div>);
    }

    return (
      <div className="trade-form-container">
        {formHtml}
      </div>
    );
  }
}

export default TradeForm;
