import * as StockAPIUtil from "../util/stock_api_util";
import { hashHistory } from "react-router";

export const RECEIVE_STOCK = "RECEIVE_STOCK";
export const REMOVE_STOCK = "REMOVE_STOCK";


export const  receiveStock = stock => ({
  type: RECEIVE_STOCK,
  stock
});

export const removeStock = stock => ({
  type: REMOVE_STOCK,
  stock
});

export const createStock = stock => dispatch => (
  StockAPIUtil.createStock(stock).then(res => dispatch(receiveStock(res)))
);

export const updateStock = stock => dispatch => (
  StockAPIUtil.updateStock(stock).then(res => dispatch(receiveStock(res)))
);
