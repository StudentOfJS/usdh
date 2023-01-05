// Inside the worker
self.addEventListener('message', (event: MessageEvent) => {
    const { url, init } = event.data;
  
    caches.open('my-cache').then((cache: Cache) => {
      cache.match(url).then((response?: Response) => {
        if (response) {
          // Return the cached response if it exists
          postMessage({ data: response });
        } else {
          // Otherwise, fetch the data and cache it
          fetch(url, init).then((response: Response) => {
            cache.put(url, response.clone());
            postMessage({ data: response });
          });
        }
      });
    });
  });
  
  export {}