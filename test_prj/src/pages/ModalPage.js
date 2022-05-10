import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ModalComponent from '../components/ModalComponent';

function ModalPage() {

  const [showInputModal, setShowInputModal] = useState(false);

  const handleInputModalClose = () => setShowInputModal(false);
  const handleInputModalShow = () => setShowInputModal(true);

  return (
    <Container>
      <Row className='mt-5 justify-content-md-center'>
        <Col>
          <ModalComponent />
        </Col>
      </Row>
    </Container>
  );
}

export default ModalPage;