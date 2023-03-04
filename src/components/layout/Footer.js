import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../../assets/logo/holidaze_logo_white.png";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row className="footer__row">
          <Col className="footer__icons">
            <FaFacebook className="icon-margin" style={{ fontSize: 25 }} />
            <FaInstagram className="icon-margin" style={{ fontSize: 25 }} />
            <FaTwitter className="icon-margin" style={{ fontSize: 25 }} />
          </Col>
          <Col className="footer__copywright-text">
            Copyright 2022 Holidaze, inc
          </Col>
          <Col className="footer__logo">
            <img alt="logo" src={logo} />
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
