import React, { Component } from 'react';
import { withRouter } from 'react-router';
import styles from './styles.css';

class Navigation extends Component {
  render() {
    const { history } = this.props;
    return (
      <div className={styles.nav}>
        <img className={styles.logoimage} alt="pricewars" src="https://s3-us-west-1.amazonaws.com/fec-comments/assets/logo.png" />
        <div className={styles.logoname}>
          <span onClick={() => history.push('/')}>Pricewars</span>
        </div>
      </div>
    );
  }
}

export default withRouter(Navigation);
