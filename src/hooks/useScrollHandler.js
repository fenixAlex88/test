import { useCallback, useEffect } from 'react';

export const useScrollHandler = (autoPagination, setFetching) => {

    const scrollHandler = useCallback(
        (e) => {
          if (
            e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 150 &&
            autoPagination
          ) {
            setFetching(true);
          }
        },
        [autoPagination, setFetching]
      );
    
      useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return () => {
          document.removeEventListener('scroll', scrollHandler);
        };
      }, [scrollHandler]);

  return 
}

