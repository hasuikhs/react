import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './routes';

function App(): JSX.Element {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container-fluid">
          <Switch>
            {routes.map(route => {
              return (
                <Route key={route.path ? route.path : null} path={route.path} component={route.component} exact />
              );
            })}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;