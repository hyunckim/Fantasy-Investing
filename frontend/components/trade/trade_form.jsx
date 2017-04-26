import React from 'react';
import { hashHistory } from 'react-router';
import { fetchStockPrice } from "../../util/stock_api_util";

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
      today.getHours() + (today.getTimezoneOffset() / 60) > 30) {
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
    } else if (this.state.stock.number_of_shares < 1) {
      this.props.receiveStockErrors("Please enter a positive integer for the number of shares you want to trade");
    } else if (this.state.stock.number_of_shares.includes(".")) {
      this.props.receiveStockErrors("You cannot trade partial shares");
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
            <label id="action-label"> Action
              <select className="trade-action" onChange={this.update('action')} value={this.state.stock.action}>
                <option value=""></option>
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
              </select>
            </label>
            <label id="symbol-label"> Symbol
              <input className="form-symbol" onChange={this.update("ticker")}
                placeholder='Ex:MSFT' value={this.state.stock.ticker}/>
            </label>
            <label id='quantity-label'> Quantity
              <input className="form-shares" onChange={this.update('number_of_shares')}
                placeholder='# Of Shares' value={this.state.stock.number_of_shares}/>
            </label>

            <input type="submit" id="submit-button" className="form-submit-button" value="Submit"/>
          </form>
        </div>
    );

    if (this.state.formState === "confirm trade") {

      formHtml = (
        <div>
          <div>
            <h3 className='trade-form-title'>Confirm your order</h3>
          </div>
          <div className='confirmation-message'>You are about to {this.state.stock.action.toLowerCase()} {this.state.stock.number_of_shares} shares of {this.state.stock.name} at ${this.state.stock.current_price} / share

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
        <div>Your {actionWord} of {this.state.stock.number_of_shares} {this.state.stock.name} shares is complete
          <button onClick={this.handleNewForm}>Make another trade</button>
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
