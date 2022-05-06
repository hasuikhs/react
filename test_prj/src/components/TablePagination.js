import React from 'react';
import { Pagination } from 'react-bootstrap';

function TablePagination({page, endPage, setPage}) {
  return (
    <>
      <Pagination className='justify-content-md-center'>
        <Pagination.First onClick={ () => setPage(1)} />
        <Pagination.Prev onClick={ () => setPage(page - 1) } disabled={ page === 1 }/>
        <Pagination.Next onClick={ () => setPage(page + 1) } disabled={ page === endPage }/>
        <Pagination.Last onClick={ () => setPage(endPage) }/>
      </Pagination>
    </>
  );
}

export default TablePagination;