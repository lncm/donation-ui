import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Donations from './Donations';

export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Donations} />
      </Switch>
    </Router>
  );
};
