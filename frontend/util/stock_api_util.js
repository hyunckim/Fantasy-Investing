export const createStock = stock => {
  debugger;
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
    data: { stock }
  });
};

export const deleteStock = stockId => {
  return $.ajax ({
    method: 'DELETE',
    url: 'api/stocks',
    data: { stockId }
  });
};

export const fetchStockPrice = ticker => (
  $.ajax({
    method: "GET",
    url: `api/stocks/${ticker}`
  })
);
