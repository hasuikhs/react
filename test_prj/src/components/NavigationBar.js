import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function NavigationBar() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <NavLink to="/" className="navbar-brand">Navbar</NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/list" className="nav-link">글목록</NavLink>
            <NavLink to="/post" className="nav-link">글쓰기</NavLink>
            <NavLink to='/modal' className="nav-link">Modal</NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;