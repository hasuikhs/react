import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function ModalComponent() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submit = async  () => {
    
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('df')
        resolve();
      }, 3000)
    });

    console.log('t')
    handleClose();
  }

  return (
    <>
      <Button variant='primary' onClick={ handleShow }>
        입력
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
                type='text'
                placeholder='title 입력'
                autoFocus
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='form-ex2'>
              <Form.Label>Body</Form.Label>
              <Form.Control as='textarea' rows={ 3 } />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={ handleClose }>
            Close
          </Button>
          <Button variant='primary' onClick={ submit } >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;