/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useRef, useEffect } from 'react';

const useMutationObserver = ({ targetEl, callback, config }) => {
  const observerRef = useRef(null);

  const getObserver = useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new MutationObserver(callback);
    }

    return observerRef.current;
  }, [ observerRef.current ]);

  useEffect(() => {
    if (targetEl.current) getObserver().observe(targetEl.current, config);

    return () => getObserver().disconnect();
  }, [ targetEl.current ]);
}

export default useMutationObserver;