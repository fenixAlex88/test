import {  useEffect, useState } from 'react';
import styles from './PagesPagination.module.scss';

const PagesPagination = ({ currentPage, totalPage, changePage, autoPagination, autoPaginationHandler }) => {
 const [pages, setPages] = useState([]);

 let minPage =  currentPage - 3 > 1 ? currentPage - 3 : 2;
 let maxPage = minPage + 7 < totalPage ? minPage + 7 : totalPage - 1;
 if (maxPage + 1 >= totalPage) minPage = totalPage - 8;
 

 useEffect(()=>{
  const arr = [];
 for (let i = minPage; i <= maxPage; i++) {
  arr.push(i);
};
  setPages([1, ...arr, totalPage]);
},[minPage,maxPage,totalPage])
  

  return (
    <div className={styles.pagination}>
      <ul className={styles.pagination__list}>
        <li className={`${styles.pagination__auto} ${autoPagination ? styles.active : null} `} onClick={autoPaginationHandler}>
          AUTO
        </li>
        {pages.map((count, idx) => (
          <li
            className={`${styles.pagination__item} ${autoPagination ? styles.disabled : currentPage === count ? styles.active : null} `}
            key={idx}
            onClick={() => {
              changePage(count);
            }}
          >{` ${count} `}</li>
        ))}
      </ul>
    </div>
  );
};

export default PagesPagination