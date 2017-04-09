export const updateBalance = investor => {
  return $.ajax ({
    method: 'PATCH',
    url: 'api/investor',
    data: investor
  });
};
