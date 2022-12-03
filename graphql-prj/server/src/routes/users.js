import { readDB } from '../dbController.js';

const getUsers = () => readDB('users');

const userRoute = [
  {
    method: 'get',
    route: '/users',
    handler: (req, res) => {
      const users = getUsers();

      res.send(users);
    }
  },
  {
    method: 'get',
    route: '/users/:id',
    handler: ({ params: { id }}, res) => {
      try {
        const users = getUsers();
        const user = user[id];

        if (!user) throw Error('사용자 없음');

        res.send(user);
      } catch (error) {
        res.status(500).send({ error });
      }
    }
  }
];

export default userRoute;