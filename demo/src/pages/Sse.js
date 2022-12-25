import { useEffect, useState } from 'react';

const sseUrl = 'http://localhost:3030';

function Sse() {
  const [serverTime, setServerTime] = useState(Date.now().toString());

  const sseAlarm = () => {
    const es = new EventSource(`${ sseUrl }/alarm`);

    es.addEventListener('message', event => {
      setServerTime(event.data);
    });

    es.addEventListener('error', event => {
      es.close();
    });
  };
  
  useEffect(() => {
    console.log(serverTime);
  
  }, [serverTime])

  useEffect(() => {
    sseAlarm();
  }, [])

  return (
    <>
      { Date(serverTime * 1) }
    </>
  );
}

export default Sse;