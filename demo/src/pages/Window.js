import { useEffect, useRef } from 'react';
import { useLocalStorage } from '../hooks/useStorage';

function Window() {
  const [local, setLocal] = useLocalStorage({ key: 'test' })
  const inputRef = useRef();

  const test = () => {
    console.log('test')
  }

  const onChange = () => {
    console.log(inputRef.current.value)
  }
  
  useEffect(() => {
    window.addEventListener('resize', test);

    console.log(local)

    return () => window.removeEventListener('resize', test);
  }, [])

  return (
    <>
      <input type="text" ref={ inputRef }onChange={ onChange } />
    </>
  )
}

export default Window;