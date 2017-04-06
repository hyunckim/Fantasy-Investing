import React from 'react';

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
 
    }
    componentWillMount() {
        debugger;
        console.log('CDM');
        console.log('currentUser');
        console.log(this.props.currentUser);
        this.props.fetchPortfolios();
        console.log(this.props);
    }
    render() {
        debugger;
        let portfolios = this.props.portfolio;
        return (
            <div>
                hi
            </div>
        );
    }
}

export default Portfolio;






