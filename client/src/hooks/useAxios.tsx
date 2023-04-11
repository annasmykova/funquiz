import {useState, useEffect} from "react";
import {AxiosResponse, AxiosError, AxiosRequestConfig} from "axios";
import api from "../config/axiosInterceptor";

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
        const response: AxiosResponse<T> = await api.request({
          url,
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
