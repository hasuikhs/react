import React, { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));

const Timer = lazy(() => import('./pages/Timer'));

const routes = [
  {
    path: '/',
    name: 'Home',
    element: <Home />
  },
  {
    path: '/timer',
    name: 'Timer',
    element: <Timer />
  },
  {
    path: '*',
    name: 'NotFound',
    element: <NotFound />
  }
];

export default routes;