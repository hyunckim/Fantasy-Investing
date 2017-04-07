import React from 'react';

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
 
    }
    componentDidMount() {
        this.props.fetchPortfolios();
    }
    componentWillMount() {
        console.log('CDM');
        console.log('currentUser');
        console.log(this.props.currentUser);
        this.props.fetchPortfolios();
        console.log(this.props);
    }
    render() {
        let portfolios = this.props.portfolio;
        return (
            <div>
                hi
            </div>
        );
    }
}

export default Portfolio;






