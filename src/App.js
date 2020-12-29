import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Navbar } from "react-bootstrap";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import { Provider } from "react-redux";
import store from "./store";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      size: "",
      sort: "",
    };
  }

  createOrder = (order) => {
    alert("Need to save order for " + order.name);
  };

  filterProducts = (e) => {
    if (e.target.value === "") {
      this.setState({
        products: data.products,
        size: e.target.value,
      });
    } else {
      this.setState({
        size: e.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(e.target.value) >= 0
        ),
      });
    }
  };

  sortProducts = (e) => {
    const sort = e.target.value;

    this.setState({
      sort: sort,
      products: this.state.products.slice().sort((a, b) => {
        return sort === "lowest"
          ? a.price > b.price
            ? 1
            : -1
          : sort === "highest"
          ? a.price < b.price
            ? 1
            : -1
          : a._id > b._id
          ? 1
          : -1;
      }),
    });
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
    const listProducts = this.state.products.map((product) => (
      <Products
        key={product._id}
        product={product}
        addToCart={this.addToCart}
      />
    ));
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
            <Filter
              count={this.state.products.length}
              size={this.state.size}
              sort={this.state.sort}
              filterProducts={this.filterProducts}
              sortProducts={this.sortProducts}
            />
            <Row>{listProducts}</Row>
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
