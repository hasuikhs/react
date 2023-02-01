import { useEffect } from 'react';
import { useLocalStorage } from '../hooks/useStorage';

function Window() {
  const [local, setLocal] = useLocalStorage({ key: 'test' })

  const test = () => {
    console.log('test')
  }
  
  useEffect(() => {
    window.addEventListener('resize', test);

    console.log(local)

    return () => window.removeEventListener('resize', test);
  }, [])

  return (
    <>
    </>
  )
}

export default Window;