import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import API from '../common/API';
import TablePagination from '../components/TablePagination';
import PostModal from '../components/PostModal';

function PostList() {

  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [showModal, setShowModal] = useState(false);

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

  // 단일 데이터 가져오기
  const getPost = async (id) => {

    let ret = {};
    try {
      const res = await API.get(`/posts/${id}`);

      if (res.status === 200) {
        ret = res.data;
      }
    } catch (error) {
      ret = {}
    }

    return ret;
  }

  useEffect(() => {
    getPosts(page);
    console.log(page)
  }, [page]);

  return (
    <Container>
      <Row className='mt-3'>
        <Col lg="3" className='mb-1'>
          <Button
            varient='primary'
            onClick={ () => setShowModal(true) }
          >
            글쓰기
          </Button>
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
                    <td>
                      <a onClick={ () => {
                        let data = getPost(item.id)

                        setShowModal(true);
                      } }>
                        {item.title}
                      </a>
                    </td>
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

      <PostModal
        showModal={ showModal }
        setShowModal={ setShowModal }
        setPage={ setPage }
      />
    </Container>
  );
}

export default PostList;