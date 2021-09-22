import Home from './pages/Home';
import Movies from './pages/Movies';
import Users from './pages/Users';
import User from './pages/User';
import Page404 from './pages/404';

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
    component: Page404
  }
]

export default routes;