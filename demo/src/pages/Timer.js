import { useState, useEffect } from 'react';
import styled from 'styled-components';

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const RowDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px;
`;

const Button = styled.button`
  margin: 5px;
  font-size: 15px;
`;

const ScreenDiv = styled.h1`
  display: flex;
  justify-content: center;
`;

function Timer() {
  const [originMinutes, setOriginMinutes] = useState(0);
  const [originSeconds, setOriginSeconds] = useState(0);

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [pause, setPause] = useState(true);

  const startCountdown = () => {
    setPause(false);
    setMinutes(originMinutes);
    setSeconds(originSeconds);
  }

  const reset = () => {
    setOriginMinutes(0);
    setOriginSeconds(0);

    setMinutes(0);
    setSeconds(0);
  }

  useEffect(() => {
    if (originSeconds >= 60) {
      setOriginMinutes(originMinutes + parseInt(originSeconds / 60));
      setOriginSeconds(originSeconds % 60);
    }
  }, [originSeconds]);

  useEffect(() => {
    if (pause) return;
    const countDown = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        clearInterval(countDown);
      } else {
        setSeconds(seconds - 1);
        
        if (minutes > 0 && seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1_000);

    return () => clearInterval(countDown);
  }, [minutes, seconds, pause]);

  return (
    <MainDiv>
      Timer

      <ScreenDiv>
        { minutes < 10 ? `0${ minutes }` : minutes }:{ seconds < 10 ? `0${ seconds  }` : seconds }
      </ScreenDiv>
      <RowDiv>
        <input
          id="minutes"
          type="number"
          min="0"
          value={ originMinutes }
          onChange={ e => setOriginMinutes(e.target.value * 1) }
        />
        <label htmlFor="minutes">분</label>

        <input
          id="seconds"
          type="number"
          min="0"
          value={ originSeconds }
          onChange={ e => setOriginSeconds(e.target.value * 1) }
        />
        <label htmlFor="seconds">초</label>
      </RowDiv>

      <RowDiv>
        <Button
          type="button"
          onClick={ startCountdown }
        >
          시작
        </Button>
        <Button type="button" onClick={ () => setPause(!pause) }>재개/일시정지</Button>
        <Button type="button" onClick={ reset }>정지</Button>
      </RowDiv>

    </MainDiv>
  )
}

export default Timer;