import React, { useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import API from '../common/API';

function ModalComponent({ getPosts }) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState('');
  const titleRef = useRef(null);

  const [body, setBody] = useState('');
  const bodyRef = useRef(null);

  const onSubmit = async  () => {
    
    if (title === '') {
      alert('title 열이 비어있음!');
      titleRef.current.focus();
      return;
    }

    if (body === '') {
      alert('body 내용이 비어있음!');
      bodyRef.current.focus();
      return;
    }

    try {
      let res = await API.post('/posts', {
        title: title,
        body: body
      });

      if (res.status === 201) {
        alert('입력 성공!');
        handleClose();
        getPosts();
      }
    } catch (e) {
      alert('입력 실패');
    }

  }

  return (
    <>
      <Button variant='primary' onClick={ handleShow }>
        글쓰기
      </Button>

      <Modal show={ show } onHide={ handleClose } backdrop='static' keyboard={ false }>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='form-ex1'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                ref={ titleRef }
                type='text'
                placeholder='title을 입력해주세요.'
                value={ title }
                onChange={ e => setTitle(e.target.value) }
                autoFocus
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='form-ex2'>
              <Form.Label>Body</Form.Label>
              <Form.Control
                ref={ bodyRef }
                type='text'
                placeholder='body를 입력해주세요.'
                value={ body }
                onChange={ e => setBody(e.target.value) }
                as='textarea'
                rows={ 3 }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={ handleClose }>
            Close
          </Button>
          <Button variant='primary' onClick={ onSubmit } >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;