import { useState } from 'react';
import { DEFAULT_LIMIT } from '@/utils/constants';
export const usePagination = (withLimit?: number) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(withLimit ?? DEFAULT_LIMIT);
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
