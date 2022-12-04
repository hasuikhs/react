import { v4 } from 'uuid';
import { wrightDB } from '../dbController.js';


const setMsgs = data => wrightDB('messages', data);

/*
  parent: parent 객체. 거의 사용 x
  args: Query에 필요한 필드에 제공되는 인수(parameter)
  context: 로그인한 사용자. DB Access 등의 중요한 정보
*/
const messageResolver = {
  Query: {
    // 아래 db 인자는 server index.js의 apollo server의 context db인자와 맞춰줌
    messages: (parent, args, { db }) => {
      return db.messages;
    },
    message: (parent, { id = '' }, { db }) => {
      return db.messages.find(msg => msg.id === id);
    }
  },
  Mutation: {
    createMessage: (parent, { text, userId }, { db }) => {
      const newMsg = {
        id: v4(),
        text,
        userId,
        timestamp: Date.now()
      }

      db.messages.unshift(newMsg);
      setMsgs(db.messages);

      return newMsg;
    },
    updateMessage: (parent, { id, text, userId }, { db }) => {
      const targetIndex = db.messages.findIndex(msg => msg.id === id);

      if (targetIndex < 0) throw Error('메시지 없음');
      if (db.messages[targetIndex].userId !== userId) throw Error('사용자 불일치');

      const newMsg = { ...db.messages[targetIndex], text };
      db.messages.splice(targetIndex, 1, newMsg);

      setMsgs(db.messages);
      
      return newMsg;
    },
    deleteMessage: (parent, { id, userId }, { db }) => {
      const targetIndex = db.messages.findIndex(msg => msg.id === id);

      if (targetIndex < 0) throw Error('메시지 없음');
      if (db.messages[targetIndex].userId !== userId) throw Error('사용자 불일치');

      db.messages.splice(targetIndex, 1);

      setMsgs(db.messages);
      
      return id;
    }
  }
};

export default messageResolver;