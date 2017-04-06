export const fetchCompany = (ticker) => (
  $.ajax({
    method: "GET",
    url: `/company/${ticker}`
  })
);
