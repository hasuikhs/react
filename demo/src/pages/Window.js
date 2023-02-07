import { useEffect, useRef } from 'react';
import { useLocalStorage } from '../hooks/useStorage';
import useMutationObserver from '../hooks/useMutaionObserver';

function Window() {
  const [local, setLocal] = useLocalStorage({ key: 'test' })
  const inputRef = useRef();
  const mutationRef = useRef();

  const test = () => {
    console.log('test')
  }

  const onChange = () => {
    console.log(inputRef.current.value)
  }
  
  useEffect(() => {
    window.addEventListener('resize', test);

    setTimeout(() => {
      mutationRef.current.placeholder = '변경';
    }, 3_000);


    return () => window.removeEventListener('resize', test);
  }, []);

  useMutationObserver(
    mutationRef,
    {
      attributes: true
    },
    (mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'attributes') {
          console.log('change attribute');
        }
      }
    }
  )

  return (
    <>
      <input type="text" ref={ inputRef }onChange={ onChange } />
      <input type="text" placeholder="" ref={ mutationRef } />
    </>
  )
}

export default Window;