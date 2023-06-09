import {useNavigate, useLocation} from 'react-router-dom';
import {useState} from 'react';

interface ApiError extends Error {
  status?: number;
}

const useApi = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const sendRequest = async (requestFunc: any) => {
    setLoading(true);
    try {
      const response = await requestFunc();
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      const apiError = err as ApiError;
      if (apiError.status === 401) {
        navigate('/login', {state: {from: location}});
      } else {
        throw apiError;
      }
    }
  };

  return {sendRequest, loading};
};

export default useApi;