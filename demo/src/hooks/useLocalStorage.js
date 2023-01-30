import { useState  } from 'react';

const option = {
  initialState: ''
};

const useLocalStorage = (key, { initialState } = option ) => {
  const [localData, setLocalData] = useState(() => {
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : initialState;
  });

  const setData = value => {
    setLocalData(value);
    localStorage.setItem(key, JSON.stringify(value));
  }

  return [localData, setData];
}

export { useLocalStorage };