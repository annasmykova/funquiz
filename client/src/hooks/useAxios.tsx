import {useState, useEffect} from "react";
import axios, {AxiosResponse, AxiosError, AxiosRequestConfig} from "axios";

interface AxiosState<T> {
  data: any | null;
  error: AxiosError | null;
  loading: boolean;
}

function useAxios<T>(url: string, config: AxiosRequestConfig = {}): AxiosState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await axios.request({
          url: `${process.env.REACT_APP_API_URL}${url}`,
          method: 'get',
          ...config
        });
        setData(response.data);
      } catch (error) {
        setError(error as AxiosError);
      }
      setLoading(false);
    };
    fetchData()
  }, [url])


  return { data, error, loading };
}

export default useAxios;
