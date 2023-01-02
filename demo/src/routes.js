import React, { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));

const Timer = lazy(() => import('./pages/Timer'));
const Sse = lazy(() => import('./pages/Sse'));
const Class = lazy(() => import('./pages/Class'));

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
    path: '/sse',
    name: 'SSE',
    element: <Sse />
  },
  {
    path: '/class',
    name: 'Class',
    element: <Class />
  },
  {
    path: '*',
    name: 'NotFound',
    element: <NotFound />
  }
];

export default routes;