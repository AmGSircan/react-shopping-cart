import React, { Component } from 'react';
import {Card, Button, Col, Row} from 'react-bootstrap';
import formatCurrency from '../util.js';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Modal from "react-modal";

export default class Products extends Component {
    constructor(props){
        super(props);
        this.state = {
            product: null
        }
    }

    openModal = product => this.setState({product})
    closeModal = () => this.setState({product: null})

    render() {
        const product = this.props.product;
        const productModal = this.state.product;
        return (
            <Col md={4}>
                <Fade bottom cascade>
                    <Card>
                        <Card.Link href="#" onClick={() => this.openModal(product)}>
                        <Card.Img variant="top" src={product.image} title={product.title}/>
                        </Card.Link>
                        <Card.Body>
                            <Card.Link href="#" onClick={() => this.openModal(product)}>
                            <Card.Title>{product.title}</Card.Title>
                            </Card.Link>
                            <Card.Text>
                                {product.description}
                            </Card.Text>
                            <div className="float-left mt-1" style={{fontSize: 20}}>{formatCurrency(product.price)}</div>
                            <Button onClick={() => this.props.addToCart(product)} className="float-right" variant="primary">Add To Cart</Button>
                        </Card.Body>
                    </Card>
                </Fade>
                {
                    productModal && 
                    <Modal isOpen={true} onRequestClose={this.closeModal}>
                        <Zoom>
                            <Row>
                                <Col md={6}>
                                    <img src={productModal.image} alt={productModal.title} />
                                </Col>
                                <Col md={6}>
                                    <Button className="float-right" variant="light" onClick={this.closeModal}>x</Button>
                                    <Card>
                                        <Card.Body>
                                            <Card.Header>
                                                {productModal.title}
                                            </Card.Header>
                                            <Card.Text>
                                                {productModal.description}
                                            </Card.Text>
                                            <Card.Text>
                                                Available Sizes:{" "}
                                                {productModal.availableSizes.map(s => (
                                                    <Button variant="primary">
                                                        {s}
                                                    </Button>
                                                ))}
                                            </Card.Text>
                                            <Row>
                                                <Col md={6}>{formatCurrency(productModal.price)}</Col>
                                                <Col md={6}><Button variant="warning" onClick={
                                                    () => {
                                                        this.props.addToCart(productModal)
                                                        this.closeModal()
                                                    }
                                                }>Add To Cart</Button></Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Zoom>
                    </Modal>
                }
            </Col>
        )
    }
}
