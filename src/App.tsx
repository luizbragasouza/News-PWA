import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Post } from './containers';

import './App.css';

const App: React.FC = () => {
  return (
    <main>
      <section>
        <Router>
          <Switch>
            <Route path="/:subject/:id">
              <Post />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </section>
    </main>
  );
};

export default App;
