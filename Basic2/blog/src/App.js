import React, { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Movies = lazy(() => import('./pages/Movies'));
const Users = lazy(() => import('./pages/Users'));
const User = lazy(() => import('./pages/User'));
const NotFound = lazy(() => import('./pages/404'))



function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container-fluid">
          <Suspense fallback={<div>Loading Page...</div>}>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/movies" component={Movies} exact />
              <Route path="/users" component={Users} exact />
              <Route path="/users/:id" component={User} exact />

              <Route component={NotFound} exact />
            </Switch>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;