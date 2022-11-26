import './App.css';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {
              routes.map(route => {
                return <Route key={ route.path } path={ route.path } element={ route.element } />
              })
            }
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
