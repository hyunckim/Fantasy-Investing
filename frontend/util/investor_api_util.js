export const updateBalance = investor => {
  return $.ajax ({
    method: 'PATCH',
    url: 'api/users',
    data: { investor }
  });
};
