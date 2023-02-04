/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { throttle, debounce } from 'lodash';

const useResizeObserver = ({ targetEl, optimizeType, ms }) => {
  const observerRef = useRef(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handler = entries => {
    const target = entries.find(entry => entry.target === targetEl.current);

    if (target) {
      setWidth(target.contentRect.width);
      setHeight(target.contentRect.height);
    }
  }

  const getObserver = useCallback(() => {
    const optType = optimizeType || null;
    const delayMillis = ms || 0;

    if (!observerRef.current) {
      observerRef.current = new ResizeObserver(
        optType === 'throttle'
          ? throttle(handler, delayMillis)
          : optType === 'debounce'
            ? debounce(handler, delayMillis)
            : handler
      );
    }

    return observerRef.current;
  }, [ targetEl ]);

  useLayoutEffect(() => {
    if (targetEl.current) getObserver().observe(targetEl.current);

    return () => getObserver().disconnect();
  }, [ ]);

  return [width, height];
}

const useWindowSize = (option) => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const handler = ({ target }) => {
    setSize({
      width: target.innerWidth,
      height: target.innerHeight
    });
  };

  useLayoutEffect(() => {
    window.addEventListener('resize', handler);

    return () => window.removeEventListener('resize', handler);
  }, [ ]);

  return size;
}

export { useResizeObserver, useWindowSize };