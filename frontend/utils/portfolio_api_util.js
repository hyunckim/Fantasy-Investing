export const fetchPortfolio = (id) => (
  $.ajax({
    method: 'GET',
    url: `/api/users/${id}`
  })
);

export const updatePortfolio = (user) => (
  $.ajax({
    method: 'PATCH',
    url: `/api/users/${user.id}`,
    data: { user }
  })
);
