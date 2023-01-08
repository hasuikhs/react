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
                return !route.children
                        ? <Route key={ route.path } path={ route.path } element={ route.element } />
                        : route.children.map(childRoute => {
                          return <Route key={ route.path + childRoute.path } path={ route.path + childRoute.path } element={ childRoute.element } />
                        })
              })
            }
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
