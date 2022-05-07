import React from 'react';
import { Pagination } from 'react-bootstrap';

function TablePagination({page, endPage, limit, setPage}) {

  // 한번에 5개의 페이지를 보여주고 싶음
  const items = [];

  for (let num = 1; num <= 5; num++) {
    if (num <= endPage) {
      items.push(
        <Pagination.Item
          key={ num }
          active={ num === page }
          onClick={ () => setPage(num) }
        >
          { num }
        </Pagination.Item>
      );
    }
  }
  
  return (
    <>
      <Pagination className='justify-content-md-center'>
        <Pagination.First onClick={ () => setPage(1)} />
        <Pagination.Prev onClick={ () => setPage(page - 1) } disabled={ page === 1 }/>
        { items }
        <Pagination.Next onClick={ () => setPage(page + 1) } disabled={ page === endPage }/>
        <Pagination.Last onClick={ () => setPage(endPage) }/>
      </Pagination>
    </>
  );
}

export default TablePagination;