import React, { Component } from 'react';
import Axios from 'axios';
import pricestyles from './pricestyles.css';


export default class PriceResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceResults: [],
    };
    this.fetchPrices = this.fetchPrices.bind(this);
  }

  componentDidMount() {
    const { searchTerm } = this.props;
    this.fetchPrice(searchTerm);
  }

  fetchPrices(product) {
    Axios.get('/pricewatch', {
      params: {
        name: `${product}`,
      },
    })
      .then((response) => {
        this.setState({ priceResults: JSON.parse(response) });
        const { priceResults } = this.state;
        console.log(priceResults);
      })
      .catch((error) => {
        console.log('Error fetching prices', error);
      });
  }

  render() {
    return (
      <div />
    );
  }
}

PriceResults.propTypes = {
  searchTerm: '', 
};
