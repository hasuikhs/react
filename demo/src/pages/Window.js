import { useEffect, useRef, useState } from 'react';
import { useLocalStorage } from '../hooks/useStorage';
import useMutationObserver from '../hooks/useMutaionObserver';

function Window() {
  const [local, setLocal] = useLocalStorage({ key: 'test' });
  const inputRef = useRef();
  const mutationRef = useRef();

  const [placeholder, setPlaceholder] = useState('기본');

  const test = () => {
    console.log('test')
  }

  const onChange = () => {
    console.log(inputRef.current.value)
  }
  
  useEffect(() => {
    window.addEventListener('resize', test);

    setTimeout(() => {
      // mutationRef.current.placeholder = '변경';
      
      // state를 이용한 옵저버는 적용되지 않음
      // state가 변경될 때는 컴포넌트 자체가 재랜더링 됨
      setPlaceholder('변경');
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
      <input type="text" placeholder={ placeholder } ref={ mutationRef } />
    </>
  )
}

export default Window;