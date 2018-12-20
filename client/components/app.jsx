import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigation from './navigation.jsx';
import Home from './home.jsx';
import PriceResults from './priceresults.jsx';
import Error from './error.jsx';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Navigation />
        <Switch>
          <Route exact strict path='/' component={Home} />
          <Route exact strict path='/results' component={PriceResults} />
          <Route component={Error} />
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App />
      </Switch>
    );
  }
}

export default App;
