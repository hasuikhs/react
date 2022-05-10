import React, { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const PostList = lazy(() => import('./pages/PostList'));
const PostInput = lazy(() => import('./pages/PostInput'));
const ModalPage = lazy(() => import('./pages/ModalPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/list',
    element: <PostList />
  },
  {
    path: '/post',
    element: <PostInput />
  },
  {
    path: '/modal',
    element: <ModalPage />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;