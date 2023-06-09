import { useEffect, useState } from 'react';

export const usePaginationPages = (currentPage, totalPage) =>{
    const [pages, setPages] = useState([]);

    useEffect(() => {
        if (totalPage === 1) return;
        let minPage = currentPage - 3 > 1 ? currentPage - 3 : 2;
        let maxPage = minPage + 7 < totalPage ? minPage + 7 : totalPage - 1;
        if (maxPage + 1 >= totalPage) minPage = totalPage - 8;
        const arr = [];
        for (let i = minPage; i <= maxPage; i++) {
          arr.push(i);
        }
        setPages([1, ...arr, totalPage]);
      }, [currentPage, totalPage]);
    return pages;
}