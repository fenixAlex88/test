import './PagesPagination.scss';

const PagesPagination = ({ currentPage, totalPage, changePage, autoPagination, setAutoPagination}) => {
  const pages = [1];
  let minPage = currentPage - 3 > 1 ? currentPage - 3 : 2;
  let maxPage = minPage + 7 < totalPage ? minPage + 7 : totalPage - 1;
  if (maxPage + 1 >= totalPage) minPage = totalPage - 8;
  for (let i = minPage; i <= maxPage; i++) {
    pages.push(i);
  }
  pages.push(totalPage);

const autoPaginationHandler=()=>{
  if(autoPagination){
    setAutoPagination(false);
    changePage(currentPage);
  } else {
    setAutoPagination(true);
  }
  
}

  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li className={`pagination__auto${autoPagination ? ' pagination__auto-active' : ''} `} onClick={autoPaginationHandler}>AUTO</li>
        {pages.map((count, idx) => (
          <li
            className={`pagination__item${autoPagination ? ' pagination__auto-disabled':currentPage === count ? ' pagination__item-active' : ''} `}
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

export default PagesPagination;
