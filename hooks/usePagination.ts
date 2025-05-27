import { useState } from 'react';
import { DEFAULT_LIMIT } from '@/utils/constants';
export const usePagination = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [totalPages, setTotalPages] = useState(0);
  return {
    page,
    limit,
    totalPages,
    setPage,
    setLimit,
    setTotalPages,
  };
};
