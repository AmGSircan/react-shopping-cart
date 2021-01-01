import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Navbar } from "react-bootstrap";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import { Provider } from "react-redux";
import store from "./store";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home" className="mr-auto">
            React Shopping Cart
          </Navbar.Brand>
          <Navbar.Brand>Admin</Navbar.Brand>
        </Navbar>
        <Row>
          <Col md={9}>
            <Filter />
            <Row>
              <Products />
            </Row>
          </Col>
          <Col md={3}>
            <Cart />
          </Col>
        </Row>
      </Provider>
    );
  }
}

export default App;
