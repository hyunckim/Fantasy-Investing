export const fetchCompany = (ticker) => (
  $.ajax({
    method: "GET",
    url: `/api/company/${ticker}`
  })
);
