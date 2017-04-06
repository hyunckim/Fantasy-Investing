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


