import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Movies = lazy(() => import('./pages/Movies'));
const Users = lazy(() => import('./pages/Users'));
const User = lazy(() => import('./pages/User'));
const NotFound = lazy(() => import('./pages/404'));

interface RouteType {
  path?: string;
  component?: React.ComponentType;
}

const routes: RouteType[] = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/movies',
    component: Movies
  },
  {
    path: '/users',
    component: Users
  },
  {
    path: '/users/:id',
    component: User
  },
  {
    component: NotFound
  }
]

export default routes;