import { v4 } from 'uuid';
import { readDB, wrightDB } from '../dbController.js';

const getMsgs = () => readDB('messages');
const setMsgs = data => wrightDB('messages', data);

const messagesRoute = [
  { // GET MESSAGES
    method: 'get',
    route: '/messages',
    handler: ({ query: { cursor = '' } }, res) => {
      const msgs = getMsgs();
      const fromIndex = msgs.findIndex(msg => msg.id === cursor) + 1

      res.send(msgs.slice(fromIndex, fromIndex + 15));
    }
  },
  { // GET MESSAGE
    method: 'get',
    route: '/messages/:id',
    handler: ({ params: { id }}, res) => {
      try {
        const msgs = getMsgs();
        const msg = msgs.find(m => m.id === id);
        if (!msg) throw Error('not found');

        res.send(msg);
      } catch (error) {
        res.status(404).send({ error });
      }
    }
  },
  { // CREATE MESSAGE
    method: 'post',
    route: '/messages',
    handler: ({ body }, res) => {
      try {
        if (!body.userId) throw Error('no userId');

        const msgs = getMsgs();
        const newMsg = {
          id: v4(),
          text: body.text,
          userId: body.userId,
          timestamp: Date.now()
        }

        msgs.unshift(newMsg);
        setMsgs(msgs);

        res.send(newMsg);
      } catch (error) {
        res.status(500).send({ error });
      }
    }
  },
  { // UPDATE MESSAGE
    method: 'put',
    route: '/messages/:id',
    handler: ({ body, params: { id }}, res) => {
      try {
        const msgs = getMsgs();
        const targetIndex = msgs.findIndex(msg => msg.id === id);

        if (targetIndex < 0) throw '메시지 없음';
        if (msgs[targetIndex].userId !== body.userId) throw '사용자 불일치';

        const newMsg = { ...msgs[targetIndex], text: body.text };
        msgs.splice(targetIndex, 1, newMsg);

        setMsgs(msgs);
        res.send(newMsg);
      } catch (error) {
        res.status(500).send({ error });
      }
    }
  },
  { // DELETE MESSAGES
    method: 'delete',
    route: '/messages/:id',
    handler: ({ body, params: { id }, query: { userId }}, res) => {
      try {
        const msgs = getMsgs();
        const targetIndex = msgs.findIndex(msg => msg.id === id);

        if (targetIndex < 0) throw '메시지 없음';
        if (msgs[targetIndex].userId !== userId) throw '사용자 불일치';

        msgs.splice(targetIndex, 1);

        setMsgs(msgs);
        res.send(id);
      } catch (error) {
        res.status(500).send({ error });
      }
    }
  },
];

export default messagesRoute;