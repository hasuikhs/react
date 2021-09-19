import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movis';
import Users from './pages/Users';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" component={ Home } exact />
          <Route path="/movies" component={ Movies } />
          <Route path="/users" component={ Users } />
        </Switch>
      </div>
    </Router>
  );
}