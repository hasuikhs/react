import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
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
      {posts.map(item => {
        return (
          <>
            <p>title</p> {item.title}
            <p>body</p> {item.body}
          </>
        )
      })}
    </Container>
  );
}

export default PostList;