import React from "react";
import { Container} from "react-bootstrap";
import Searchform from "../../containers/Searchform"

class Home extends React.Component {
  componentDidMount() {
    document.title = "Home";
  }
  render() {
    return (
      <Container fluid className="home">
            <Searchform {...this.props}/>
      </Container>
    );
  }
}

export default Home;
