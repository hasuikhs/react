import { useRef } from 'react';
import useResizeObserver from '../hooks/useResizeObserver';

function Resizer() {
  const areaRef = useRef(null);
  const [width, height] = useResizeObserver(areaRef);

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