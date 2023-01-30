import { useEffect } from 'react';

function Window() {
  const test = () => {
    console.log('test')
  }
  
  useEffect(() => {
    window.addEventListener('resize', test);

    return () => window.removeEventListener('resize', test);
  }, [])

  return (
    <>
    </>
  )
}

export default Window;