import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

export default class Cart extends Component {
    constructor(props){
        super(props);
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
            </div>
        )
    }
}
