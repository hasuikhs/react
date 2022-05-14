import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import API from '../common/API';
import TablePagination from '../components/TablePagination';
import ModalComponent from '../components/ModalComponent';

function PostList() {

  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // 페이지 가져오기
  const getPosts = async (page) => {
    try {
      const res = await API.get(`/posts?_sort=id&_order=desc&_limit=${ limit }&_page=${ page }`);

      if (res.status === 200) {
        setPosts(res.data);

        setTotalCount(res.headers['x-total-count']);
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    getPosts(page);
  }, [page]);

  return (
    <Container>
      <Row className='mt-3'>
        <Col lg="3" className='mb-1'>
          <ModalComponent setPage={ setPage }/>
        </Col>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th width="50px">#</th>
              <th>title</th>
            </tr>
          </thead>
          <tbody>
            {
              posts.map(item => {
                return (
                  <tr key={ item.id }>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>

        <TablePagination
          page={ page }
          totalCount={ totalCount }
          limit={ limit }
          setPage= { setPage }
        />
      </Row>
    </Container>
  );
}

export default PostList;