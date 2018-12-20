import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import styles from './pricestyles.css';
import helpers from '../helpers/dataHelpers';

export default class PriceResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceResults: [],
      productImage: {
        iphone: 'https://s3-us-west-1.amazonaws.com/fec-comments/assets/iphone_x.png',
        louisvuttonbelt: 'https://s3-us-west-1.amazonaws.com/fec-comments/assets/louis_vutton_belt.png',
        macbookpro: 'https://s3-us-west-1.amazonaws.com/fec-comments/assets/macbookpro.png',
        guccibelt: 'https://s3-us-west-1.amazonaws.com/fec-comments/assets/Gucci_Belt_2.png',
      },
      hover: false,
    };
    this.fetchPrices = this.fetchPrices.bind(this);
    this.handleMouseIn = this.handleMouseIn.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  componentDidMount() {
    const { searchTerm } = this.props.location.state;
    this.fetchPrices(searchTerm);
  }

  handleMouseIn() {
    this.setState({ hover: true });
  }

  handleMouseOut() {
    this.setState({ hover: false });
  }

  fetchPrices(product) {
    Axios.get('/priceresults', {
      params: {
        name: `${product}`,
      },
    })
      .then((response) => {
        const data = response.data.results;
        const newData = helpers.convertData(data);
        console.log(data);
        console.log(newData);
        this.setState({ priceResults: newData });
      })
      .catch((error) => {
        console.log('Error fetching prices', error);
      });
  }

  render() {
    const { priceResults, productImage, hover } = this.state;
    const averagePrice = priceResults[0];
    const lowObj = priceResults[2];
    const highObj = priceResults[1];
    const { searchTerm } = this.props.location.state;
    const tooltipStyle = {
      display: hover ? 'block' : 'none',
    };

    return (
      <div className={styles.container}>
        <div className={styles.imageContainer} onMouseEnter={this.handleMouseIn} onMouseLeave={this.handleMouseOut}>
          {searchTerm === 'macbook pro'
            ? (
              <img alt="Macbook Pro" src={productImage['macbookpro']} className={styles.imageHeader} />)
            : <img alt="Gucci Belt" src={productImage['guccibelt']} className={styles.imageHeader} /> }
        </div>
        {averagePrice
          ? (
            <div style={tooltipStyle} className={styles.priceDisplay}>
              <span className={styles.averageprice}>
                Average Price: $
                {averagePrice}
              </span>
            </div>
          )
          : null }

        {highObj
          ? (
            <div className={styles.graph}>
          <div>
            <span className={styles.bestDeal}>Best Deal</span>
            <span className={styles.price}>
              $
              {lowObj.price}
            </span>
            <span className={styles.productName}>
              {lowObj.name}
            </span>
            
            <span className={styles.purchaseLink}>
              <a target="_blank" href={lowObj.sitedetails[0].url}>
                <button id="purchaseButton" type="button" className={styles.purchaseButton}>
                  Purchase
                  </button>
              </a>
            </span>
          </div>
        </div>
          )
          : <div className={styles.loading}>Loading Best Price...</div>}
      </div>
    );
  }
}

PriceResults.propTypes = {
  searchTerm: PropTypes.string,
};
