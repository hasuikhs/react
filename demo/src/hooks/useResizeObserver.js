import { useCallback, useEffect, useRef, useState } from 'react';

// const useInfiniteScroll = targetEl => {
//   const observerRef = useRef(null);
//   const [intersecting, setIntersecting] = useState(false);

//   const getObserver = useCallback(() => {
//     if (!observerRef.current) {
//       observerRef.current = new IntersectionObserver(entries =>
//         setIntersecting(entries.some(entry => entry.isIntersecting))
//       );
//     }

//     return observerRef.current;
//   }, [ observerRef.current ]);

//   useEffect(() => {
//     if (targetEl.current) getObserver().observe(targetEl.current);

//     return () => {
//       getObserver().disconnect();
//     }
//   }, [ targetEl.current ]);

//   return intersecting;
// }

// export default useInfiniteScroll;

const useResizeObserver = targetEl => {
  const observerRef = useRef(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const getObserver = useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new ResizeObserver(entries => {
        const { contentRect } = entries.find(entry => entry.target === targetEl.current);

        setWidth(contentRect.width);
        setHeight(contentRect.height);
      });
    }

    return observerRef.current;
  }, [ observerRef.current ]);

  useEffect(() => {
    if (targetEl.current) getObserver().observe(targetEl.current);

    return () => getObserver().disconnect();
  });

  return [width, height];
}

export default useResizeObserver;