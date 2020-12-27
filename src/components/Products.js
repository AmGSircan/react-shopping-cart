import React, { Component } from 'react';
import {Card, Button, Col} from 'react-bootstrap';
import formatCurrency from '../util.js';

export default class Products extends Component {
    // constructor(props){
    //     super(props);
    // }

    render() {
        const product = this.props.product;
        return (
            <Col md={4}>
                <Card>
                    <Card.Img variant="top" src={product.image} title={product.title}/>
                    <Card.Body>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text>
                            {product.description}
                        </Card.Text>
                        <div className="float-left mt-1" style={{fontSize: 20}}>{formatCurrency(product.price)}</div>
                        <Button onClick={() => this.props.addToCart(product)} className="float-right" variant="primary">Add To Cart</Button>
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}
