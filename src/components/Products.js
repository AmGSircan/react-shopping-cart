import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import ListProducts from "./ListProducts";
import Zoom from "react-reveal/Zoom";
import Modal from "react-modal";
import { Card, Button, Col, Row } from "react-bootstrap";
import formatCurrency from "../util.js";
import { addToCart } from "../actions/cartAction";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  openModal = (product) => this.setState({ product });
  closeModal = () => this.setState({ product: null });
  addToCart = (product) => this.props.addToCart(product);

  render() {
    const productModal = this.state.product;
    return !this.props.products ? (
      <div>Loading...</div>
    ) : (
      <>
        {this.props.products.map((product) => (
          <ListProducts
            key={product._id}
            product={product}
            openModal={this.openModal}
            addToCart={this.addToCart}
          />
        ))}
        {productModal && (
          <Modal
            ariaHideApp={false}
            isOpen={true}
            onRequestClose={this.closeModal}
          >
            <Zoom>
              <Row>
                <Col md={6}>
                  <img src={productModal.image} alt={productModal.title} />
                </Col>
                <Col md={6}>
                  <Button
                    className="float-right"
                    variant="light"
                    onClick={this.closeModal}
                  >
                    x
                  </Button>
                  <Card>
                    <Card.Body>
                      <Card.Header>{productModal.title}</Card.Header>
                      <Card.Text>{productModal.description}</Card.Text>
                      <Card.Text>
                        Available Sizes:{" "}
                        {productModal.availableSizes.map((s) => (
                          <Button variant="primary">{s}</Button>
                        ))}
                      </Card.Text>
                      <Row>
                        <Col md={6}>{formatCurrency(productModal.price)}</Col>
                        <Col md={6}>
                          <Button
                            variant="warning"
                            onClick={() => {
                              this.props.addToCart(productModal);
                              this.closeModal();
                            }}
                          >
                            Add To Cart
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Zoom>
          </Modal>
        )}
      </>
    );
  }
}
export default connect(
  (state) => ({
    products: state.products.filteredItems,
  }),
  { fetchProducts, addToCart }
)(Products);
