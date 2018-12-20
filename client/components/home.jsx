import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import styles from './styles.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      fireRedirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ fireRedirect: true });
  }

  render() {
    const { searchTerm, fireRedirect } = this.state;
    return (
      <div className={styles.container}>
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
          {fireRedirect && (
            <Redirect to={{
              pathname: '/results',
              state: { searchTerm: searchTerm },
            }}
            />
          )}
        </div>
      </div>
    );
  }
}

Home.defaultProps = {
  searchTerm: '',
  history: '',
};

export default withRouter(Home);
