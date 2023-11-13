import { useCallback, useState } from 'react';

type ApiFunction<T> = () => Promise<T>;

export const useDataListLoader = <T,>() => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataList, setDataList] = useState<T | undefined>();

  const getDataList = useCallback(async (apiFunction: ApiFunction<T>) => {
    setIsLoading(true);
    try {
      const response = await apiFunction();
      setDataList(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Ошибка при получении данных: ', error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, dataList, getDataList };
};
