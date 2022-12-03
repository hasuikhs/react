import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';

import MsgItem from './MsgItem';
import MsgInput from './MsgInput';
import fetcher from '../fetcher';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

function MsgList({ smsgs, users }) {
  const { query } = useRouter();
  const userId = query.userId || query.userid || '';

  const [msgs, setMsgs] = useState(smsgs);
  const [editingId, setEditingId] = useState(null);
  const [hasNext, setHasNext] = useState(true);
  const fetchMoreEl = useRef(null);
  const intersecting = useInfiniteScroll(fetchMoreEl);

  const onCreate = async text => {
    const newMsg = await fetcher('post', '/messages', { text, userId });

    if (!newMsg) throw Error('create error');

    setMsgs(msgs => ([ newMsg, ...msgs  ]));
  }

  const onUpdate = async (text, id) => {
    const newMsg = await fetcher('put', `/messages/${ id }`, { text, userId});

    if (!newMsg) throw Error('update error');

    setMsgs(msgs => {
      const targetIndex = msgs.findIndex(msg => msg.id === id);

      if (targetIndex < 0) return msgs;

      const newMsgs = [ ...msgs ];

      newMsgs.splice(targetIndex, 1, newMsg);

      return newMsgs;
    });

    doneEdit();
  }

  const doneEdit = () => setEditingId(null);

  const onDelete = async id => {
    const receviedId = await fetcher('delete', `/messages/${ id }`, { params: { userId }});

    setMsgs(msgs => {
      const targetIndex = msgs.findIndex(msg => msg.id === receviedId + '');
      
      if (targetIndex < 0) return msgs;
      
      const newMsgs = [ ...msgs ];
      
      newMsgs.splice(targetIndex, 1);
      
      return newMsgs;
    });
  }

  const getMessages = async () => {
    const newMsgs = await fetcher('get', '/messages', { params: { cursor: msgs[msgs.length - 1]?.id || '' } });
    
    if (newMsgs.length === 0) {
      setHasNext(false);
      return;
    }

    setMsgs(msgs => [...msgs, ...newMsgs]);
  }

  useEffect(() => {
    // 아래 한계선을 치면서 다음 데이터가 있을 경우
    if (intersecting && hasNext) getMessages();
  }, [ intersecting ]);

  return (
    <>
      {
        userId && <MsgInput mutate={ onCreate } />
      }
      <ul className="messages">
        { msgs.map(x => (
          <MsgItem
            key={ x.id }
            { ...x }
            onUpdate={ onUpdate }
            startEdit={ () => setEditingId(x.id) }
            isEditing={ editingId === x.id }
            onDelete={ () => onDelete(x.id) }
            myId={ userId }
            user={ users[x.userId] }
          />)) }
      </ul>
      <div ref={ fetchMoreEl } />
    </>
  );
}

export default MsgList;