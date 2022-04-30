import React, { useState, useRef } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import API from './common/API';

function App() {

  const [title, setTitle] = useState('');
  const titleRef = useRef(null);

  const [body, setBody] = useState('');
  const bodyRef = useRef(null);

  const onSubmit = async () => {
    if (title === '') {
      alert('title 열이 비어있음!');
      titleRef.current.focus();
      return;
    }

    if (body ===  '') {
      alert('body 내용이 비어있음!');
      bodyRef.current.focus();
      return;
    }

    try {
      await API.post('/posts', {
        title: title,
        body: body
      });
      alert('입력 완료');

    } catch (e) {
      alert('입력 실패');
    }
  }

  return (
    <>
      <Container>
        <Form>
          <Form.Group className='mb-3' controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              ref={ titleRef }
              type='text'
              placeholder='title을 입력해주세요.'
              value={ title }
              onChange={ e => setTitle(e.target.value) }
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='body'>
            <Form.Label>Body</Form.Label>
            <Form.Control
              as='textarea'
              rows={ 10 }
              ref={ bodyRef }
              type='text'
              placeholder='body를 입력해주세요.'
              value={ body }
              onChange={ e => setBody(e.target.value) }
            />
          </Form.Group>
          <Button variant='primary' onClick={ onSubmit }>Post</Button>
        </Form>
      </Container>
    </>
  );
}

export default App;
