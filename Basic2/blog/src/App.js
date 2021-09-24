import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container-fluid">
          <Suspense fallback={<div>Loading Page...</div>}>
            <Switch>
              {routes.map(route => {
                return (
                  <Route key={route.path} path={route.path} component={route.component} exact />
                );
              })}
            </Switch>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;