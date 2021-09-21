import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Users from './pages/Users';
import Movies from './pages/Movies';
import Home from './pages/Home';

export default function App(): JSX.Element {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container-fluid">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/movies" component={Movies} />
            <Route path="/users" component={Users} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}