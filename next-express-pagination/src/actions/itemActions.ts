'use server';

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

export async function fetchItems(page: number = 1, limit: number = 10): Promise<ApiResponse> {
  try {
    const response = await fetch(`http://localhost:3001/api/items?page=${page}&limit=${limit}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('데이터를 불러오는데 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    throw new Error('서버에서 데이터를 가져오는데 실패했습니다.');
  }
} 