"use client"

import StoreProvider from '@/lib/redux/StoreProvider';
import Counter from './Counter';

export default function ClientComp() {
  return (
    <div style={{
      border: '1px solid white',
      width: '200px',
      height: '200px',
      margin: '10px',
      padding: '10px'
    }}>
      Client Comp
      <StoreProvider>
        <Counter />
      </StoreProvider>
    </div>
  );
}