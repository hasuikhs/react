import React from 'react';
import { Pagination } from 'react-bootstrap';

function TablePagination({page, endPage, limit, setPage}) {

  // 한번에 5개의 페이지를 보여주고 싶음
  const pages = [];

  for (let num = 1; num <= 5; num++) {
    if (num <= endPage) {
      pages.push(num);

      if (endPage === 1) break;
    }
  }
  
  return (
    <>
      <Pagination className='justify-content-md-center'>
        <Pagination.First onClick={ () => setPage(1)} disabled={ page === 1 }/>
        <Pagination.Prev onClick={ () => setPage(page - 1) } disabled={ page === 1 } />
        { pages.map(curPage => (
          <Pagination.Item
            key={ curPage }
            active={ curPage === page  }
            onClick={ () => setPage(curPage) }
          >
            { curPage }
          </Pagination.Item>
        )) }
        <Pagination.Next onClick={ () => setPage(page + 1) } disabled={ page === endPage } />
        <Pagination.Last onClick={ () => setPage(endPage) } disabled={ page === endPage } />
      </Pagination>
    </>
  );
}

export default TablePagination;