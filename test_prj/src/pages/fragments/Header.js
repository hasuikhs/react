import React, { Suspense } from 'react';
import NavigationBar from '../../components/NavigationBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from '../../routes';
import { Container, Spinner } from 'react-bootstrap';

function Header() {
  return (
    <BrowserRouter>
      <NavigationBar />

      <Container fluid>
        <Suspense fallback={ <Spinner animation="border" /> }>
          <Routes>
            {
              routes.map(route => {
                return <Route key={ route.path } path={ route.path } element={ route.element }/>
              })
            }
          </Routes>
        </Suspense>
      </Container>
    </BrowserRouter>
  );
}

export default Header;