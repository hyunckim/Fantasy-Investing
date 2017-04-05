export const fetchCompany = (ticker) => (
  $.ajax({
    method: "GET",
    url: `/fantasy_investing/company/${ticker}`
  })
);
