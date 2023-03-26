import { useState } from 'react';

export const useAutoPaginationToggle = (changePage, totalPage, setFetching) => {
const [autoPagination, setAutoPagination] = useState(false);


    function autoPaginationToggle() {
        if (autoPagination) {
          setAutoPagination(false);
          changePage((prev) => prev - 1);
        } else {
          setAutoPagination(true);
          changePage((prev) => (prev === totalPage ? prev + 1 : prev));
        }
      }

return {autoPagination, autoPaginationToggle}
}
