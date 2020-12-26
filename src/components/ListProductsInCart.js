import React, { Component } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import formatCurrency from '../util';

export default class ListProductsInCart extends Component {
    render() {
        const {item} = this.props;
        return (
            <>
                <Row>
                    <Col md={2}>
                        <img src={item.image} alt={item.title} width={50}/>
                    </Col>
                    <Col md={7}>
                        {item.title}<br/>
                        {formatCurrency(item.price) + "x " + item.count}
                    </Col>
                    <Col md={3}>
                        <Button variant="danger" onClick={() => this.props.removeFromCart(item)}>Remove</Button>
                    </Col>
                </Row>
                <div className="mb-2"></div>
            </>
        )
    }
}
