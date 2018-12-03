import React, { Component } from 'react';
import styles from './styles.css';
import PriceResults from './priceresults.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { searchTerm } = this.state;
    return (
      <div>
        <nav />
        <div className={styles.title}>What are you looking for?</div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={searchTerm} placeholder="Enter product name here" onChange={this.handleChange} />
          <button type="button" />
        </form>
        <PriceResults searchTerm={searchTerm} />
      </div>
    );
  }
}

App.defaultProps = {
  searchTerm: '',
};
