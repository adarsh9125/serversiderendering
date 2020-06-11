import React from "react";
import { Navbar, Nav } from "react-bootstrap";

class Header extends React.Component {
  render() {
    return (
      <React.Fragment>
         <div className="app-header">
        <Navbar
          bg="dark"
          variant="dark"
          expand="lg"
          className="headerLinkColor"
        >
          <Navbar.Brand href="/">Sapient</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              {false === false ? (
                <Nav.Link href="/login">Login</Nav.Link>
              ) : (
                <Nav.Link
                  href="#logout"
                >
                  Logout
                </Nav.Link>
              )}
              {false === false ? (
                <Nav.Link href="/signup">Signup</Nav.Link>
              ) : (
                <Nav.Link href="/add-product">Add Product</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
          {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
        </Navbar>
      </div>
      </React.Fragment>
    );
  }
}

export default Header;
