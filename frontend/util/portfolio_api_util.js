export const fetchPortfolios = (portfolio) => (
    $.ajax({
        method: 'GET',
        url: `/fantasy_investing/portfolio`
    })
);

