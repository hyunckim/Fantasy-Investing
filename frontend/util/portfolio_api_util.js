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

export const createPortfolio = (portfolio) => (
    $.ajax({
        method: 'POST',
        url: `/portfolio`,
    })
);

export const deletePortfolio = (portfolio) => (
    $.ajax({
        method: 'POST',
        url: `/portfolio`,
    })
);






