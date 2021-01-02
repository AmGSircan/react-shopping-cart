import React, { Component } from "react";
import { Navbar, Button, Form, Row, Col, ListGroup } from "react-bootstrap";
import formatCurrency from "../util";
import ListProductsInCart from "./ListProductsInCart";
import { Fade, Zoom } from "react-reveal";
import { connect } from "react-redux";
import { removeFromCart } from "../actions/cartAction";
import { createOrder, clearOrder } from "../actions/orderActions";
import Modal from "react-modal";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckout: false,
      name: "",
      email: "",
      address: "",
    };
  }

  removeFromCart = (product) => {
    this.props.removeFromCart(product);
  };

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
    };
    this.props.createOrder(order);
  };

  closeModal = () => {
    this.props.clearOrder();
  };

  render() {
    const { cartItems, order } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <Navbar bg="light">
            <Navbar.Brand href="#home">Cart is empty</Navbar.Brand>
          </Navbar>
        ) : (
          <Navbar bg="light">
            <Navbar.Brand href="#home">
              You have {cartItems.length} in the cart
            </Navbar.Brand>
          </Navbar>
        )}
        {order && (
          <Modal
            ariaHideApp={false}
            isOpen={true}
            onRequestClose={this.closeModal}
          >
            <Zoom>
              {console.log(order)}
              <Row className="float-right">
                <Button onClick={this.closeModal}>x</Button>
              </Row>
              <Row>
                <Col className="text-center justify-content-center align-self-center">
                  <h3>Your order has been placed.</h3>
                  <h2>Order {order._id}</h2>
                  <ListGroup>
                    <ListGroup.Item>Name: {order.name}</ListGroup.Item>
                    <ListGroup.Item>Email: {order.email}</ListGroup.Item>
                    <ListGroup.Item>Address: {order.address}</ListGroup.Item>
                    <ListGroup.Item>
                      Total: {formatCurrency(order.total)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Cart Itesm:
                      {order.cartItems.map((p, index) => (
                        <div key={index}>
                          {p.count} {" x "} {p.title}
                        </div>
                      ))}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Zoom>
          </Modal>
        )}
        {cartItems.map((item) => (
          <ListProductsInCart
            key={item._id}
            item={item}
            removeFromCart={this.removeFromCart}
          />
        ))}
        {cartItems.length !== 0 && (
          <>
            <div className="dropdown-divider"></div>
            Total:{" "}
            {formatCurrency(
              cartItems.reduce((a, c) => a + c.price * c.count, 0)
            )}
            <Button
              onClick={() =>
                this.setState({
                  showCheckout: true,
                })
              }
              variant="info"
            >
              Proceed
            </Button>
          </>
        )}
        {this.state.showCheckout && (
          <>
            <div className="dropdown-divider"></div>
            <Fade bottom cascade>
              <Form>
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    onChange={this.handleInput}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Enter your name</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="Name"
                    onChange={this.handleInput}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Enter your address</Form.Label>
                  <Form.Control
                    required
                    name="address"
                    type="text"
                    placeholder="Address"
                    onChange={this.handleInput}
                  />
                </Form.Group>

                <Button
                  onClick={this.createOrder}
                  variant="success"
                  type="submit"
                >
                  Checkout
                </Button>
              </Form>
            </Fade>
          </>
        )}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    order: state.order.order,
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart, createOrder, clearOrder }
)(Cart);
