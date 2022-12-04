import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useQueryClient, useMutation, useQuery } from 'react-query';

import MsgItem from './MsgItem';
import MsgInput from './MsgInput';
import { fetcher, QueryKeys } from '../queryClient';
import { CREATE_MESSAGE, DELETE_MESSAGE, GET_MESSAGES, UPDATE_MESSAGE } from '../graphql/message';
// import useInfiniteScroll from '../hooks/useInfiniteScroll';

function MsgList({ smsgs, users }) {
  const client = useQueryClient(); // _app.js에서 만들어진 QueryClient를 계속 재사용 가능한 useQueryClient 훅

  const { query } = useRouter();
  const userId = query.userId || query.userid || '';

  const [msgs, setMsgs] = useState(smsgs);
  const [editingId, setEditingId] = useState(null);
  // const [hasNext, setHasNext] = useState(true);
  // const fetchMoreEl = useRef(null);
  // const intersecting = useInfiniteScroll(fetchMoreEl);

  const { mutate: onCreate } = useMutation(({ text }) => fetcher(CREATE_MESSAGE, { text, userId }), {
    onSuccess: ({ createMessage }) => {
      client.setQueryData(QueryKeys.MESSAGES, old => {
        return {
          messages: [ createMessage, ...old.messages ],
        }
      })
    },
  })

  const { mutate: onUpdate } = useMutation(({ text, id }) => fetcher(UPDATE_MESSAGE, { text, id, userId }), {
    onSuccess: ({ updateMessage }) => {
      client.setQueryData(QueryKeys.MESSAGES, old => {
        const targetIndex = old.messages.findIndex(msg => msg.id === updateMessage.id);

        if (targetIndex < 0) return old;

        const newMsgs = [ ...old.messages ];
        
        newMsgs.splice(targetIndex, 1, updateMessage);

        return { messages: newMsgs };
      });
      doneEdit();
    }
  });

  const { mutate: onDelete } = useMutation(id => fetcher(DELETE_MESSAGE, { id, userId }), {
    onSuccess: ({ deleteMessage: deletedId }) => {
      client.setQueryData(QueryKeys.MESSAGES, old => {
        const targetIndex = old.messages.findIndex(msg => msg.id === deletedId);

        if (targetIndex < 0) return old;

        const newMsgs = [ ...old.messages ];

        newMsgs.splice(targetIndex, 1);

        return { messages: newMsgs };
      });
    }
  })

  const doneEdit = () => setEditingId(null);

  const { data, error, isError } = useQuery(QueryKeys.MESSAGES, () => fetcher(GET_MESSAGES));

  useEffect(() => {
    if (!data?.messages) return;
    setMsgs(data.messages);
  }, [ data?.messages ]);

  // useEffect(() => {
  //   // 아래 한계선을 치면서 다음 데이터가 있을 경우
  //   if (intersecting && hasNext) getMessages();
  // }, [ intersecting ]);
  return (
    <>
      {
        userId && <MsgInput mutate={ onCreate } />
      }
      <ul className="messages">
        { msgs.map(msg => (
          <MsgItem
            key={ msg.id }
            { ...msg }
            onUpdate={ onUpdate }
            startEdit={ () => setEditingId(msg.id) }
            isEditing={ editingId === msg.id }
            onDelete={ () => onDelete(msg.id) }
            myId={ userId }
            user={ users.find(x => msg.userId === x.id ) }
          />)) }
      </ul>
      {/* <div ref={ fetchMoreEl } /> */}
    </>
  );
}

export default MsgList;