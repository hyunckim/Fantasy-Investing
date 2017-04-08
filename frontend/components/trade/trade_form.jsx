import React from 'react';
import { hashHistory } from 'react-router';

class TradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.stock;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  buyStock(existingPosition, price) {
    if (this.props.balance >= (price*this.state.number_of_shares)) {
      let purchaseInfo = {
        ticker: this.state.ticker,
        purchase_price: ((existingPosition.purchase_price * existingPosition.number_of_shares)
          + (this.price * this.state.number_of_shares)) / 2,
        number_of_shares: existingPosition.number_of_shares
          + this.state.number_of_shares,

      };
      let action = "";
      if (this.props.stocks.includes(this.state.ticker)) {
        purchaseInfo["id"] = this.stock.id;
        action = this.props.updateStock;
      } else {
        action = this.props.createStock;
      }
      action(purchaseInfo).then(hashHistory.push("/portfolio"));

    } else {
      this.props.receiveStockErrors("You have insufficient balance for this trade");
    }
  }

  sellStock(existingPosition, price) {
    let action = "";
    if (this.state.number_of_shares < existingPosition.number_of_shares) {
      let saleInfo = {
        id: this.stock.id,
        ticker: this.state.ticker,
        number_of_shares: existingPosition.number_of_shares - this.props.number_of_shares
      };
      this.props.updateStock(saleInfo).then(hashHistory.push("/portfolio"));
      this.updateBalance(this.state.action, price);
    } else if (this.state.number_of_shares === existingPosition.number_of_shares) {
      this.props.deleteStock(this.stock.id);
      this.updateBalance(this.state.action, price);
    } else {
      this.props.receiveStockErrors("You are trying to sell more shares than you have");
    }
  }

  updateBalance(action, price) {
    if (action === "Buy") {
      let newBalance = this.props.balance - (price * this.state.number_of_shares);
      this.props.updateInvestor( {id: this.investor.id, balance: newBalance});
    } else {
      let newBalance = this.props.balance + (price * this.state.number_of_shares);
      this.props.updateInvestor( {id: this.investor.id, balance: newBalance});
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let price = fetchPrice(this.state.ticker);
    let existingPosition = this.stocks[this.state.ticker];
    if (this.state.action === "Buy") {
      this.buyStock(existingPosition, price);
    } else if (this.state.action === "Sell") {
      this.sellStock(existingPosition, price);
    }
  }

  update(field) {
    return e => {
      this.setState({[field]: e.target.value});
    };
  }

  render() {
    return (
      <form className="trade-form" onSubmit={this.handleSubmit}>
        <label> Action
          <select className="trade-action" onChange={this.update('action')}>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
        </label>
        <label> Symbol
          <input className="form-symbol" onChange={this.update("ticker")} />
        </label>

        <label> Quantity of Shares
          <input className="form-shares" onChange={this.update('number_of_shares')} />
        </label>

        <input type="submit" className="form-submit-button" value="Submit"
          onSubmit={this.handleSubmit}/>

      </form>
    );
  }
}

export default TradeForm;
