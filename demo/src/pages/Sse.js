import { useEffect, useState } from 'react';

const sseUrl = 'http://localhost:3030';

function Sse() {
  const [serverTime, setServerTime] = useState(Date.now().toString());
  const es = new EventSource(`${ sseUrl }/alarm`);
  let count = null;

  const sseAlarm = () => {
    es.addEventListener('message', event => {
      const { data } = event;

      setServerTime(data);
    });

    es.addEventListener('error', () => {
      console.log('error')
      es.close();
    });

    count = setTimeout(() => {
      console.log('close')
      es.close();
    }, 5_000);
  };

  useEffect(() => {
    sseAlarm();

    return () => {
      clearTimeout(count);
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