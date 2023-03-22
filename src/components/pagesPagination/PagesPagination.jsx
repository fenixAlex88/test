import './PagesPagination.scss';

const PagesPagination = ({ currentPage, totalPage, changePage }) => {
  const pages = [1];
  let minPage = currentPage - 3 > 1 ? currentPage - 3 : 2;
  let maxPage = minPage + 7 < totalPage ? minPage + 7 : totalPage - 1;
  if (maxPage + 1 >= totalPage) minPage = totalPage - 7;
  console.log('max ', maxPage);
  console.log('min ', minPage);
  for (let i = minPage; i <= maxPage; i++) {
    pages.push(i);
  }
  pages.push(totalPage);
  return (
    <div className="pagination">
      <ul className="pagination__list">
        {pages.map((count) => (
          <li
            className={`pagination__item${currentPage === count ? ' pagination__item-active' : ''} `}
            key={count}
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
