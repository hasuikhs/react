import React, { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));

const routes = [
  {
    path: '/',
    name: 'Home',
    element: <Home />
  },
  {
    path: '*',
    name: 'NotFound',
    element: <NotFound />
  }
];

export default routes;