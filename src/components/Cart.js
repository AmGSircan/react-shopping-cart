import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import formatCurrency from '../util';
import ListProductsInCart from './ListProductsInCart';

export default class Cart extends Component {
    constructor(props){
        super(props);
        this.removeFromCart = this.removeFromCart.bind(this);
    }

    removeFromCart(product){
        this.props.removeFromCart(product)
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
                            <Button variant="info">Proceed</Button>
                        </>
                    )
                }
                
            </div>
        )
    }
}
