export const createStock = stock => {
  return $.ajax ({
    method: "POST",
    url: 'api/stocks',
    data: stock
  });
};

export const updateStock = stock => {

  return $.ajax ({
    method: "PATCH",
    url: 'api/stocks',
    data: stock
  });
};

export const deleteStock = stockId => {
  return $.ajax ({
    method: 'DELETE',
    url: 'api/stocks',
    data: stockId
  });
};

export const fetchStockPrice = ticker => {
  return $.ajax({
    method: "GET",
    url: `api/stocks/${ticker}`
  });
};
