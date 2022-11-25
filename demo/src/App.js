import './App.css';
import { Route, Routes } from 'react-router-dom';

import routes from './routes';

function App() {
  return (
    <div className="App">
      <Routes>
        {
          routes.map(v => <Route key={ v.name } path={ v.path } element={ v.element } />)
        }
      </Routes>
    </div>
  );
}

export default App;
