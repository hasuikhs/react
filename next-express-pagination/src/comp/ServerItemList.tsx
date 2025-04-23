import { Suspense } from 'react';
import { fetchItems } from '../actions/itemActions';
import ItemList from './ItemList';

export default async function ServerItemList() {
  const initialData = await fetchItems(1, 10);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">서버 사이드 렌더링 예제</h1>
      <Suspense fallback={<div className="text-center">로딩 중...</div>}>
        <ItemList initialData={initialData} />
      </Suspense>
    </div>
  );
} 