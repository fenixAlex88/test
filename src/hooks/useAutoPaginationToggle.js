import { useState } from 'react';

export const useAutoPaginationToggle = (changePage, clearData) => {
const [autoPagination, setAutoPagination] = useState(true);


    function autoPaginationToggle() {
        if (autoPagination) {
          setAutoPagination(false);
          changePage((prev) => prev - 1);
        } else {
          setAutoPagination(true);
          clearData();
          changePage(prev=>prev)
        }
      }

return {autoPagination, autoPaginationToggle}
}
