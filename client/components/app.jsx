import React, { Component } from 'react';
import styles from './styles.css';
import PriceResults from './priceresults.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home',
      searchTerm: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeView = this.changeView.bind(this);
    this.renderView = this.renderView.bind(this);
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  handleSubmit() {
    this.changeView('priceresults');
  }

  changeView(option) {
    this.setState({
      view: option,
    });
  }

  renderView() {
    const { searchTerm, view } = this.state;
    if (view === 'priceresults') {
      return (
        <PriceResults
          searchTerm={searchTerm}
          handleClick={(e) => {
            e.preventDefault();
          }
      } />
      );
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className={styles.title}>What are you looking for?</div>
          <div className={styles.textbox}>
            <input
              id="text"
              type="text"
              value={searchTerm}
              placeholder="Enter Product Name Here..."
              onChange={this.handleChange}
              autoComplete="off"
            />
          </div>
          <div>
            <button className={styles.homeButton} type="button" onClick={this.handleSubmit}>Find the Lowest Price</button>
          </div>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.nav}>
          <img className={styles.logoimage} alt="pricewars" src="https://s3-us-west-1.amazonaws.com/fec-comments/assets/logo.png" />
          <div className={styles.logoname}>
            <span onClick={() => this.changeView('home')}>Pricewars</span>
          </div>
        </div>
        {this.renderView()}
      </div>
    );
  }
}

App.defaultProps = {
  searchTerm: '',
};
