import { useState  } from 'react';

const useLocalStorage = ({ key, initialState = '' }) => {
  const [localData, setLocalData] = useState(() => {
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : initialState;
  });

  const setValue = value => {
    setLocalData(value);
    localStorage.setItem(key, JSON.stringify(value));
  }

  return [localData, setValue];
}

const useSessionStorage = ({ key, initialState = '' }) => {
  const [sessionData, setSessionData] = useState(() => {
    const data = sessionStorage.getItem(key);

    return data ? JSON.parse(data) : initialState;
  });

  const setValue = value => {
    setSessionData(value);
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  return [sessionData, setValue];
}

export { useLocalStorage, useSessionStorage };