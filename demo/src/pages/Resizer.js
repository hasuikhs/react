import { useRef } from 'react';
import { useResizeObserver, useWindowSize } from '../hooks/useResizeObserver';

function Resizer() {
  const areaRef = useRef(null);
  const [width, height] = useResizeObserver(areaRef, {
    optimizeType: 'throttle',
    ms: 1_000
  });

  return (
    <>
      <h1>Test Resizer</h1>
      <h2>{ width } x { height }</h2>
      <textarea ref={ areaRef }>
      </textarea>
    </>
  )
}

export default Resizer;