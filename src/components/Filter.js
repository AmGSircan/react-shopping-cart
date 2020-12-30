import React, { Component } from "react";
import { Row, Col, Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import { filterProducts, sortProducts } from "../actions/productActions";

class Filter extends Component {
  render() {
    return !this.props.filteredProducts ? (
      <div>Loading...</div>
    ) : (
      <Navbar bg="light">
        <Col md={4}>
          <Navbar.Brand>
            {this.props.filteredProducts.length} Products
          </Navbar.Brand>
        </Col>
        <Col md={4}>
          <Row>
            <Col md={2}>
              <Navbar.Brand>Order</Navbar.Brand>
            </Col>
            <Col>
              <select
                value={this.props.sort}
                className="form-control"
                onChange={(e) =>
                  this.props.sortProducts(
                    this.props.filteredProducts,
                    e.target.value
                  )
                }
              >
                <option value="latest">Latest</option>
                <option value="lowest">Lowest</option>
                <option value="highest">Highest</option>
              </select>
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <Row>
            <Col md={2}>
              <Navbar.Brand>Filter</Navbar.Brand>
            </Col>
            <Col>
              <select
                value={this.props.size}
                className="form-control"
                onChange={(e) =>
                  this.props.filterProducts(this.props.products, e.target.value)
                }
              >
                <option value="">ALL</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </Col>
          </Row>
        </Col>
      </Navbar>
    );
  }
}
export default connect(
  (state) => ({
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
  }),
  {
    filterProducts,
    sortProducts,
  }
)(Filter);
