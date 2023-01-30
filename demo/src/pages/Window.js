import { useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

function Window() {
  const [local, setLocal] = useLocalStorage('test')

  const test = () => {
    console.log('test')
  }
  
  useEffect(() => {
    window.addEventListener('resize', test);

    setLocal('test')

    return () => window.removeEventListener('resize', test);
  }, [])

  return (
    <>
    </>
  )
}

export default Window;