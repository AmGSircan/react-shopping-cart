import React, { Component } from 'react';
import { Navbar, Button, Form } from 'react-bootstrap';
import formatCurrency from '../util';
import ListProductsInCart from './ListProductsInCart';
import { Fade } from "react-reveal";

export default class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            showCheckout: false,
            name: "",
            email: "",
            address: ""
        }
    }

    removeFromCart = product => {
        this.props.removeFromCart(product)
    }

    handleInput = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    createOrder = e => {
        e.preventDefault()
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems
        }
        this.props.createOrder(order)
    }

    render() {
        const {cartItems} = this.props;
        return (
            <div>
                {cartItems.length === 0 ?
                    <Navbar bg="light">
                        <Navbar.Brand href="#home">Cart is empty</Navbar.Brand>
                    </Navbar> :
                    <Navbar bg="light">
                        <Navbar.Brand href="#home">You have {cartItems.length} in the cart</Navbar.Brand>
                    </Navbar>
                }
                {cartItems.map(item => <ListProductsInCart key={item._id} item={item} removeFromCart={this.removeFromCart} />)}
                {cartItems.length !== 0 && (
                        <>
                            <div className="dropdown-divider"></div>
                            Total: {" "}
                            {formatCurrency(
                                cartItems.reduce((a, c) => a + c.price * c.count, 0)
                            )}
                            <Button onClick={() => this.setState({
                                showCheckout: true
                            })} variant="info">Proceed</Button>
                        </>
                    )
                }
                {this.state.showCheckout && (
                    <>
                        <div className="dropdown-divider"></div>
                        <Fade bottom cascade>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control required name="email" type="email" placeholder="Enter email" onChange={this.handleInput} />
                                    <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Enter your name</Form.Label>
                                    <Form.Control name="name" type="text" placeholder="Name" onChange={this.handleInput} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Enter your address</Form.Label>
                                    <Form.Control required name="address" type="text" placeholder="Address" onChange={this.handleInput} />
                                </Form.Group>

                                <Button onClick={this.createOrder} variant="success" type="submit">
                                    Checkout
                                </Button>
                            </Form>
                        </Fade>
                    </>
                )}
            </div>
        )
    }
}
