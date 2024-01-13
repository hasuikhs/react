import React, { lazy } from 'react';
import QuillEditor from './pages/QuillEditor';

const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));

const Timer = lazy(() => import('./pages/Timer'));
const Sse = lazy(() => import('./pages/Sse'));
const Class = lazy(() => import('./pages/Class'));
const Resizer = lazy(() => import('./pages/Resizer'));
const Search = lazy(() => import('./pages/Search'));
const Window = lazy(() => import('./pages/Window'));
const Quill = lazy(() => import('./pages/QuillEditor'));
const Tab = lazy(() => import('./pages/Tab'));

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
    path: '/window',
    name: 'Window',
    element: <Window />
  },
  {
    path: '/quillEditor',
    name: 'QuillEditor',
    element: <QuillEditor />
  },
  {
    path: '/tab',
    name: 'Tab',
    element: <Tab />
  },
  {
    path: '*',
    name: 'NotFound',
    element: <NotFound />
  }
];

export default routes;