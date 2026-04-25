import { useEffect, useState } from 'react';
import URL from '../constants/url';

// Custom react hook with generic data type
export default function useFetch<T>(url: string) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Async data fetcher
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL.baseURL}${url}`, {
          headers: {
            authorization: 'Bearer ' + token,
          },
        });

        // If error while fetching data set error
        if (!response.ok) {
          setError(
            `Error status ${response.status}, error message: ${await response.text()}`,
          );
          // If no error set data to response json
        } else {
          setData(await response.json());
        }
        // Catch error
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message.toString());
        } else {
          setError('Unknown error');
        }
      }

      // At end set loading to false
      setIsLoading(false);
    };

    fetchData();
  }, [url, token]);

  return { isLoading, error, data };
}
