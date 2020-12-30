import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Navbar } from "react-bootstrap";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import { Provider } from "react-redux";
import store from "./store";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    };
  }

  createOrder = (order) => {
    alert("Need to save order for " + order.name);
  };

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((item) => item._id !== product._id),
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((item) => item._id !== product._id))
    );
  };

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;

    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

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
              <Products addToCart={this.addToCart} />
            </Row>
          </Col>
          <Col md={3}>
            <Cart
              createOrder={this.createOrder}
              cartItems={this.state.cartItems}
              removeFromCart={this.removeFromCart}
            />
          </Col>
        </Row>
      </Provider>
    );
  }
}

export default App;
