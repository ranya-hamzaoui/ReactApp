import React from 'react'
import { Container, Row, Col, Nav } from "react-bootstrap";

function Footer() {
  return (
      <footer style={{ backgroundColor: "#343a40", color: "white", padding: "20px 0" }}>
      <Container>
        <Row>
          <Col xs={12} md={4}>
            <h5>Company</h5>
            <p>© 2024 Your Company. All Rights Reserved.</p>
          </Col>
          <Col xs={12} md={4}>
            <h5>Links</h5>
            <Nav className="flex-column">
              <Nav.Link href="#home" style={{ color: "white" }}>Home</Nav.Link>
              <Nav.Link href="#services" style={{ color: "white" }}>Services</Nav.Link>
              <Nav.Link href="#about" style={{ color: "white" }}>About</Nav.Link>
              <Nav.Link href="#contact" style={{ color: "white" }}>Contact</Nav.Link>
            </Nav>
          </Col>
          <Col xs={12} md={4}>
            <h5>Follow Us</h5>
            <Nav className="justify-content-start">
              <Nav.Link href="https://www.facebook.com" target="_blank" style={{ color: "white" }}>
                Facebook
              </Nav.Link>
              <Nav.Link href="https://www.twitter.com" target="_blank" style={{ color: "white" }}>
                Twitter
              </Nav.Link>
              <Nav.Link href="https://www.instagram.com" target="_blank" style={{ color: "white" }}>
                Instagram
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer> 
  )
}

export default Footer