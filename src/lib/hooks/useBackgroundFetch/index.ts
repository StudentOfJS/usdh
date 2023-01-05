import { useState, useEffect } from 'react';

function useBackgroundFetch(url: string, init?: RequestInit): { data: any; error: any; loading: boolean } {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let worker: Worker;

    if (typeof Worker !== 'undefined') {
      // Create a new worker if the browser supports web workers
      worker = new Worker('/worker.js?worker&inline');
    }

    if (worker!) {
      // Send the fetch request to the worker
      worker.postMessage({ url, init });

      worker.onmessage = (event) => {
        const { data, error } = event.data;

        if (error) {
          setError(error);
        } else {
          setData(data);
        }
        setLoading(false);
      };
    } else {
      // If the browser doesn't support web workers, fall back to a regular fetch request
      fetch(url, init)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }

    return () => {
      if (worker) {
        worker.terminate();
      }
    };
  }, [url]);

  return { data, error, loading };
}

export default useBackgroundFetch;
