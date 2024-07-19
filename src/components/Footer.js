import React, { useEffect, useState } from "react";
import { Col, Container, Navbar } from "react-bootstrap";

const Footer = () => {
  const [fullYear, setFullYear] = useState();

  useEffect(() => {
    setFullYear(new Date().getFullYear());
  }, [fullYear]);

  return (
    <Navbar fixed="bottom" bg="dark" variant="dark">
      <Container>
        <Col lg={12} className="text-center text-white">
          <div>
            {fullYear}-{fullYear + 1}, All Rights Reserved by God Java
          </div>
        </Col>
      </Container>
    </Navbar>
  );
};

export default Footer;
