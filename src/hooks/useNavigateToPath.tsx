import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function useNavigateToPath(basePath: string) {
  const navigate = useNavigate();

  return useCallback(
    (id?: number) => {
      const path = id ? `${basePath}/${id}` : basePath;
      navigate(path);
    },
    [navigate, basePath],
  );
}

export default useNavigateToPath;
