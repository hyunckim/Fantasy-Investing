import React from 'react';
import { hashHistory } from 'react-router';
import { fetchStockPrice } from "../../util/stock_api_util";
import { username, password } from '../../intrio_account';


class TradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {stock: this.props.stock, formState: "new form",
      existingPosition: undefined};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.handlePromise = this.handlePromise.bind(this);
    this.handleNewForm = this.handleNewForm.bind(this);
    this.updateBalance = this.updateBalance.bind(this);
    this.formState = "new form";
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.removeStockErrors();

    if (this.state.stock.action === "Buy") {
      this.buyStock(this.state.existingPosition, this.state.stock.current_price);
    } else if (this.state.stock.action === "Sell") {
      this.sellStock(this.state.existingPosition, this.state.stock.current_price);
    }
    this.setState({formState: "trade complete"});
  }

  fetchData(ticker, index = 0) {
    $.ajax({
        type: "GET",
        url: `https://api.intrinio.com/data_point?identifier=${ticker}&item=last_price,name`,
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
    let stock = this.state.stock;
    stock['current_price'] = Math.round(res.data[0].value * 100) / 100;
    stock['name'] = res.data[1].value;
    this.setState({stock: stock});

    let today = new Date();

    let existingPosition = undefined;

    for (let i = 0; i < this.props.currentStocks.length; i++) {
      if (this.props.currentStocks[i].ticker === this.state.stock.ticker.toUpperCase()) {
        existingPosition = this.props.currentStocks[i];
        break;
      }
    }

    if (today.getDay() > 5 ||
      today.getHours() + (today.getTimezoneOffset() / 60) < 13 ||
      today.getHours() + (today.getTimezoneOffset() / 60) > 23) {
      this.props.receiveStockErrors("The stock market is currently closed. You can trade shares between 6am and 5pm PT");
    } else if (this.state.stock.name === 'na') {
      this.props.receiveStockErrors("You have entered an incorrect ticker. Please look up the ticker again.");
    } else if (this.state.stock.action === "Buy" &&
      this.state.stock.current_price *
      this.state.stock.number_of_shares > this.props.balance) {
        this.props.receiveStockErrors("You have insufficient balance for this trade");
    } else if (this.state.stock.action === "Sell" && !existingPosition) {
      this.props.receiveStockErrors(`You don't have any ${this.state.stock.ticker} shares to sell`);
    } else if (this.state.stock.action === "Sell" &&
      this.state.stock.number_of_shares > existingPosition.number_of_shares) {
      this.props.receiveStockErrors(`You are trying to sell more ${this.state.stock.ticker} shares than you have`);
    } else if (this.state.stock.name.length > 0) {
      this.setState({formState: "confirm trade"});
      this.setState({existingPosition: existingPosition});
    }
  }

  buyStock(existingPosition, price) {

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
  }

  sellStock(existingPosition, price) {

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
    }
  }

  updateBalance(newBalance) {
    this.props.updateInvestor( {id: this.props.investor.id, balance: newBalance});
  }

  update(field) {
    return e => {
      let stock = this.state.stock;
      if (field === "ticker") {
        stock[field] = e.target.value.toUpperCase();
      } else {
        stock[field] = e.target.value;
      }
      this.setState({stock: stock});
    };
  }

  handleForm(e) {
    e.preventDefault();

    if (this.state.stock.action.length < 1) {
      this.props.receiveStockErrors("Please select Buy or Sell");
    } else if (this.state.stock.ticker.length < 1) {
      this.props.receiveStockErrors("Please enter a ticker");
    } else if (this.state.stock.number_of_shares === "") {
      this.props.receiveStockErrors("Please enter a the amount of shares you want to trade");
    } else if (this.state.stock.number_of_shares.includes(".")) {
      this.props.receiveStockErrors("You cannot trade partial shares");
    } else if (!parseInt(this.state.stock.number_of_shares) || parseInt(this.state.stock.number_of_shares) < 1) {
      this.props.receiveStockErrors("Please enter a positive integer for the number of shares you want to trade");
    } else {
      this.fetchData(this.state.stock.ticker);
    }
  }

  handleNewForm(e) {
    e.preventDefault();
    this.setState({formState: "new form"});
    this.setState({stock: this.props.stock});
  }

  render() {

    let formHtml = (
        <div>
          <div>
            <h3 className='trade-form-title'>Submit your order</h3>
          </div>
          <p className="trade-form-errors">{this.props.error}</p>
          <form className="trade-form" onSubmit={this.handleForm}>
            <label id="symbol-label">Symbol* <input className="form-symbol" onChange={this.update("ticker")}
              placeholder='Ex:MSFT' value={this.state.stock.ticker}/>
            </label>
            <label id="action-label"> Action*
              <select className="trade-action" onChange={this.update('action')} value={this.state.stock.action}>
                <option value=""></option>
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
              </select>
            </label>
            <label id='quantity-label'> Quantity*
              <input className="form-shares" onChange={this.update('number_of_shares')}
                placeholder='# Of Shares' value={this.state.stock.number_of_shares}/>
            </label>
            <input type="submit" id="submit-button" className="form-submit-button" value="Submit"/>
          </form>
        </div>
    );

    if (this.state.formState === "confirm trade") {

      let orderType = `${this.state.stock.action.toLowerCase()} `;

      formHtml = (
        <div>
          <div>
            <h3 className='trade-form-title'>Confirm your order</h3>
          </div>
          <div className='confirmation-message'>
            You are about to {orderType} {this.state.stock.number_of_shares} shares of {this.state.stock.name} at ${this.state.stock.current_price} / share
            <div className='trade-confirmation-buttons'>
              <button onClick={this.handleSubmit}>Confirm trade</button>
              <button onClick={() => this.setState({formState: "new form"})}>Go Back</button>
            </div>
          </div>
        </div>
        );
    } else if (this.state.formState === "trade complete") {
      let actionWord = "sale";
      if (this.state.stock.action === "Buy") {
        actionWord = "purchase";
      }
      formHtml = (
        <div>
          <div>
            <h3 className='trade-form-title'>Order confirmation</h3>
          </div>
          <div className='confirmation-message'>Your {actionWord} of {this.state.stock.number_of_shares} {this.state.stock.name} shares is complete
            <button id="another-trade-button"
              onClick={this.handleNewForm}>Make another trade</button>
          </div>
        </div>);

    }
    return (
      <div className="trade-form-container">
        {formHtml}
      </div>
    );
  }
}

export default TradeForm;
