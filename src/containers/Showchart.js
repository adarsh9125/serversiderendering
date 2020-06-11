import React from "react";
import { Line } from "react-chartjs-2";
import { Container, Row, Col } from "react-bootstrap";

class Showchart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          pageno:1
        };
      }
  componentDidMount() {
    document.title = "Home";
  }
  render() {
    const data = {
        labels: ["11", "123", "124", "180", "200", "250"],
        datasets: [
          {
            label: "Vote",
            data: [1,8,12,25,33, 53, 7, 41, 26, 18],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
            fill: false,
          },
        ]
      };
    return (
      <Container fluid className="home chartborder">
        <Row>
          <Col className="p-0">
          <Line data={data} 
          width={1200}
          height={200}
          />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Showchart;