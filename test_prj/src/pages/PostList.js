import React, { useEffect, useState } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import API from '../common/API';

function PostList() {

  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    try {
      const res = await API.get('/posts');

      if (res.status === 200) {
        setPosts(res.data);
      }

    } catch (error) {

    }
  }

  useEffect(() => {
    getPosts();
  }, [])

  return (
    <Container>
      <Row className='mt-5'>
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
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default PostList;