import {useNavigate, useLocation} from 'react-router-dom';
import {useState} from 'react';

interface ApiError extends Error {
  status?: number;
}

const useApi = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async (requestFunc: any) => {
    setIsLoading(true);
    try {
      const response = await requestFunc();
      setIsLoading(false);
      return response;
    } catch (err) {
      setIsLoading(false);
      const apiError = err as ApiError;
      if (apiError.status === 401) {
        navigate('/login', {state: {from: location}});
      } else {
        throw apiError;
      }
    }
  };

  return {sendRequest, isLoading};
};

export default useApi;