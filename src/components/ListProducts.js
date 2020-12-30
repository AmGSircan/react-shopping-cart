import React, { Component } from "react";
import { Card, Button, Col } from "react-bootstrap";
import formatCurrency from "../util.js";
import Fade from "react-reveal/Fade";

export default class ListProducts extends Component {
  //   constructor(props) {
  //     super(props);
  //   }

  render() {
    const { product } = this.props;
    return (
      <Col md={4}>
        <Fade bottom cascade>
          <Card>
            <Card.Link href="#" onClick={() => this.props.openModal(product)}>
              <Card.Img
                variant="top"
                src={product.image}
                title={product.title}
              />
            </Card.Link>
            <Card.Body>
              <Card.Link href="#" onClick={() => this.props.openModal(product)}>
                <Card.Title>{product.title}</Card.Title>
              </Card.Link>
              <Card.Text>{product.description}</Card.Text>
              <div className="float-left mt-1" style={{ fontSize: 20 }}>
                {formatCurrency(product.price)}
              </div>
              <Button
                onClick={() => this.props.addToCart(product)}
                className="float-right"
                variant="primary"
              >
                Add To Cart
              </Button>
            </Card.Body>
          </Card>
        </Fade>
      </Col>
    );
  }
}
