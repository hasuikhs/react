'use client';

import { useState, useTransition } from 'react';
import { fetchItems } from '../actions/itemActions';
import ItemCard from './ItemCard';
import Spinner from './Spinner';

interface Item {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface ApiResponse {
  status: string;
  data: {
    items: Item[];
    pagination: PaginationInfo;
  };
}

interface ItemListProps {
  initialData: ApiResponse;
}

export default function ItemList({ initialData }: ItemListProps) {
  const [items, setItems] = useState<Item[]>(initialData.data.items);
  const [pagination, setPagination] = useState<PaginationInfo>(initialData.data.pagination);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handlePageChange = async (newPage: number) => {
    if (pagination && newPage >= 1 && newPage <= pagination.totalPages) {
      startTransition(async () => {
        try {
          const data = await fetchItems(newPage, pagination.itemsPerPage);
          setItems(data.data.items);
          setPagination(data.data.pagination);
        } catch (err) {
          setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
        }
      });
    }
  };

  if (error) return <div>에러: {error}</div>;

  return (
    <div className="p-4">
      {isPending && <Spinner />}
      <h1 className="text-2xl font-bold mb-4">아이템 목록</h1>
      <div className="grid gap-4">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
      
      {pagination && (
        <div className="mt-4 flex justify-center gap-2">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={!pagination.hasPrevPage || isPending}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:hover:bg-gray-800 transition-colors"
          >
            이전
          </button>
          <span className="px-4 py-2 text-gray-700">
            {pagination.currentPage} / {pagination.totalPages}
          </span>
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={!pagination.hasNextPage || isPending}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:hover:bg-gray-800 transition-colors"
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
} 