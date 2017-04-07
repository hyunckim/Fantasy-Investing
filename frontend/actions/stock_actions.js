import * as StockAPIUtil from "../util/stock_api_util";
import { hashHistory } from "react-router";

export const RECEIVE_STOCK = "RECEIVE_STOCK";
export const REMOVE_STOCK = "REMOVE_STOCK";
export const RECEIVE_STOCK_ERRORS = "RECEIVE_SESSION_ERRORS";
export const REMOVE_STOCK_ERRORS = "REMOVE_SESSION_ERRORS";


export const  receiveStock = stock => ({
  type: RECEIVE_STOCK,
  stock
});

export const removeStock = stock => ({
  type: REMOVE_STOCK,
  stock
});

export const receiveStockErrors = errors => ({
  type: RECEIVE_STOCK_ERRORS,
  errors
});

export const removeStockErrors = () => ({
  type: REMOVE_STOCK_ERRORS
});

export const createStock = stock => dispatch => (
  StockAPIUtil.createStock(stock).then(res => dispatch(receiveStock(res)),
  err => dispatch(receiveStockErrors(err.responseJSON)))
);

export const updateStock = stock => dispatch => (
  StockAPIUtil.updateStock(stock).then(res => dispatch(receiveStock(res)),
  err => dispatch(receiveStockErrors(err.responseJSON)))
);

export const deleteStock = stockId => dispatch => (
  StockAPIUtil.deleteStock(stockId).then(() => dispatch(removeStock(stockId)),
  err => dispatch(receiveStockErrors(err.responseJSON)))
);
