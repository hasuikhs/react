"use client";

import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { AppStore, getStore } from './store';

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [store, setStore] = useState<AppStore | null>(null);

  useEffect(() => {
    const initializeStore = async () => {
      const configuredStore = await getStore();
      setStore(configuredStore);
    };

    initializeStore();
  }, []);

  if (!store) {
    return null; // 스토어가 설정되기 전까지 로딩 상태 처리
  }

  return (
    <Provider store={ store }>
      { children }
    </Provider>
  );
}
