import Home from './pages/Home';
import Movies from './pages/Movis';
import Users from './pages/Users';
import User from './pages/User';
import Page404 from './pages/404';

const routes = [
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
    path: null,
    component: Page404
  }
]

export default routes;