import React from "react";
import logo from "../assets/logo/holidaze_logo_green.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";

function AdminNav() {
  const [, setAuth] = useAuth();

  const navigate = useNavigate();

  function logout() {
    setAuth(null);
    console.log("Logged out");
    navigate("/");
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <img className="nav-logo" alt="logo" src={logo} />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }}>
            <LinkContainer to="/admin/place/add">
              <Nav.Link>Add place</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/admin/enquiries">
              <Nav.Link>Enquiries</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/admin/inbox">
              <Nav.Link>Inbox</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/">
              <Nav.Link onClick={logout}>Log out</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNav;
