import { usePaginationPages } from '../../hooks';
import styles from './PagesPagination.module.scss';

const PagesPagination = ({ currentPage, totalPage, changePage, autoPagination, autoPaginationToggle }) => {

  const pages = usePaginationPages(currentPage, totalPage);

  return (
    <ul>
      <li className={`${autoPagination ? styles.active : ''} `} onClick={autoPaginationToggle}>
        AUTO
      </li>
      {pages.map((count, idx) => (
        <li
          className={`${autoPagination ? styles.disabled : currentPage === count ? styles.active : ''} `}
          key={idx}
          onClick={() => {
            if (!autoPagination) changePage(count);
          }}
        >{` ${count} `}</li>
      ))}
    </ul>
  );
};

export default PagesPagination;
