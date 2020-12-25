import React, { Component } from 'react';
import {Card, Button, Row, Col, Container} from 'react-bootstrap';
import formatCurrency from '../util.js';

export default class Products extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={9}>
                        <Row>
                            {this.props.products.map((product) => {
                                return(
                                    <Col md={6}>
                                        <Card>
                                            <Card.Img variant="top" src={product.image} title={product.title}/>
                                            <Card.Body>
                                                <Card.Title>{product.title}</Card.Title>
                                                <Card.Text>
                                                    {product.description}
                                                </Card.Text>
                                                <Card.Text><div className="float-left mt-1" Style="font-size: 20px">{formatCurrency(product.price)}</div> <Button className="float-right" variant="primary">Add To Cart</Button></Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Col>
                    <Col></Col>
                </Row>
                
            </Container>
        )
    }
}
