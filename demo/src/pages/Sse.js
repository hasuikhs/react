import { useEffect, useState } from 'react';

const sseUrl = 'http://localhost:3030';

function Sse() {
  const [serverTime, setServerTime] = useState(Date.now().toString());

  useEffect(() => {
    const es = new EventSource(`${ sseUrl }/alarm`);
    const limitTimer = setTimeout(() => {
      console.log('sse close');
      es.close();
    }, 5_000);

    es.onmessage = event => {
      const { data } = event;
      setServerTime(data);
    }

    es.onerror = () => {
      console.log('sse error');
      es.close();
    }

    return () => {
      clearTimeout(limitTimer);
      es.close();
    }
  }, []);

  return (
    <>
      { Date(serverTime * 1) }
    </>
  );
}

export default Sse;