import { useEffect, useState } from 'react';

const sseUrl = 'http://localhost:3030';

function Sse() {
  const [serverTime, setServerTime] = useState(Date.now().toString());

  const sseAlarm = () => {
    const originPath = window.location.pathname;
    const es = new EventSource(`${ sseUrl }/alarm`);
    
    window.addEventListener('beforeunload', () => {
      es.close();
    })

    es.addEventListener('message', event => {
      const { data } = event;
      if (originPath !== window.location.pathname) {
        es.close();
      }
      setServerTime(data);
    });
    
    es.addEventListener('error', event => {
      console.log('error')
      es.close();
    });

    setTimeout(() => {
      if (es.readyState === 2) {
        console.log('already close');
        return;
      };

      console.log('close')
      es.close();
    }, 5_000);
  };

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