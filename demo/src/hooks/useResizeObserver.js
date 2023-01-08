import { useCallback, useEffect, useRef, useState } from 'react';

const useResizeObserver = targetEl => {
  console.log('init', targetEl)
  const observerRef = useRef(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const getObserver = useCallback(() => {
    console.log(observerRef)
    if (!observerRef.current) {
      observerRef.current = new ResizeObserver(entries => {
        const target = entries.find(entry => entry.target === targetEl.current);

        if (target) {
          setWidth(target.contentRect.width);
          setHeight(target.contentRect.height);
        }
      });
    }

    return observerRef.current;
  }, [ targetEl ]);

  useEffect(() => {
    if (targetEl.current) getObserver().observe(targetEl.current);

    return () => getObserver().disconnect();
  }, [ ]);

  return [width, height];
}

export default useResizeObserver;