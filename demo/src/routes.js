import React, { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));

const Timer = lazy(() => import('./pages/Timer'));
const Sse = lazy(() => import('./pages/Sse'));
const Class = lazy(() => import('./pages/Class'));
const Resizer = lazy(() => import('./pages/Resizer'));
const Search = lazy(() => import('./pages/Search'));

// webgl
const Basic = lazy(() => import('./pages/WebGL/Basic'));
const Fog = lazy(() => import('./pages/WebGL/Fog'));

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
    path: '/resizer',
    name: 'Resizer',
    element: <Resizer />
  },
  {
    path: '/webgl',
    name: 'WebGL',
    children: [
      {
        path: '/basic',
        name: 'Basic',
        element: <Basic />
      },
      {
        path: '/fog',
        name: 'Fog',
        element: <Fog />
      }
    ]
  },
  {
    path: '/search',
    name: 'Search',
    element: <Search />
  },
  {
    path: '*',
    name: 'NotFound',
    element: <NotFound />
  }
];

export default routes;