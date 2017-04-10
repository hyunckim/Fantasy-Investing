export const fetchPortfolios = () => (
    $.ajax({
        method: 'GET',
        url: `/portfolio`

    })
);

export const fetchPortfolio = (portfolio) => (
    $.ajax({
        method: 'GET',
        url: `/portfolio/${portfolio.id}`,
    })
);

export const createPortfolio = (portfolio) => {
    return $.ajax({
          method: 'POST',
          url: `api/portfolio`,
          data: portfolio
    });
};

export const deletePortfolio = (portfolioId) => (
    $.ajax({
        method: 'DELETE',
        url: `api/portfolio`,
        data: portfolioId
    })
);
