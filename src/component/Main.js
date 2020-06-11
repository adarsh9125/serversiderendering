import React from "react";
import { Container, Row, Col } from "react-bootstrap";

class Main extends React.Component {
  componentDidMount() {
    document.title = "Home";
  }
  render() {
    return (
      <Container fluid className="home">
        <Row>
          <Col className="p-0">
            <h1>Main Page....</h1>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Main;