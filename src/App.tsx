import React from "react";
import Map from "./Map";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";

const App = (): JSX.Element => {
  return (
    <div>
      <Container>
        <Row>
          <Col md={12}>
            <Map />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
