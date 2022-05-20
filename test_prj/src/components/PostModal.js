import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import API from '../common/API';

function PostModal({ showModal, setShowModal, setPage, modalData, setModalData }) {

  const [title, setTitle] = useState('');
  const titleRef = useRef(null);

  const [body, setBody] = useState('');
  const bodyRef = useRef(null);

  const reset = () => {
    setTitle('');
    setBody('');
    setModalData({});
  }

  const closeModal = () => {
    setShowModal(false);
    reset();
  };

  const onSubmit = async  () => {

    if (title === '') {
      alert('title 열이 비어있음!');
      return titleRef.current.focus();
    }

    if (body === '') {
      alert('body 내용이 비어있음!');
      return bodyRef.current.focus();
    }

    try {
      let res = undefined;

      if (modalData.id) {
        res = await API.put(`/posts/${ modalData.id }`, {
          title: title,
          body: body
        });
      } else {
        res = await API.post('/posts', {
          title: title,
          body: body
        });
      }

      console.log(4)
      if (res.status === 200) {
        alert('입력 성공!');

        closeModal();

        setPage(1);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (modalData.id) {
      setTitle(modalData.title);
      setBody(modalData.body);
    } else {
      reset();
    }
  }, [showModal]);

  return (
    <>
      <Modal show={ showModal } onHide={ closeModal } backdrop='static' keyboard={ false }>
        <Modal.Header closeButton>
          <Modal.Title>{ modalData.id ? '수정하기' : '등록하기' }</Modal.Title>
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
          <Button variant='secondary' onClick={ closeModal }>
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

export default PostModal;