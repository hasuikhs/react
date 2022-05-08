import React, { useEffect, useState } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import API from '../common/API';
import TablePagination from '../components/TablePagination';

function PostList() {

  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(2);
  const [page, setPage] = useState(1);
  const [endPage, setEndPage] = useState(1);

  // 페이지 가져오기
  const getPosts = async () => {
    try {
      const res = await API.get(`/posts?_sort=id&_order=desc&_limit=${ limit }&_page=${ page }`);

      if (res.status === 200) {
        setPosts(res.data);

        setEndPage(parseInt(res.headers['x-total-count'] / limit) + 1);
      }

    } catch (error) {
    }
  }

  useEffect(() => {
    getPosts();
  }, [page]);

  return (
    <Container>
      <Row className='mt-5 justify-content-md-center'>
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
          endPage={ endPage }
          limit={ limit }
          setPage= { setPage }
        />
      </Row>
    </Container>
  );
}

export default PostList;