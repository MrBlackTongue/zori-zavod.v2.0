import { useCallback, useState } from 'react';
import type { TablePaginationConfig } from 'antd/es/table';

const usePagination = (initialPageSize = 10) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: initialPageSize,
  });

  const handleChangeTable = useCallback(
    (newPagination: TablePaginationConfig) => {
      setPagination(prevPagination => ({
        current: newPagination.current ?? prevPagination.current,
        pageSize: newPagination.pageSize ?? prevPagination.pageSize,
      }));
    },
    [],
  );

  return {
    pagination,
    handleChangeTable,
  };
};

export default usePagination;
