import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Navbar, Nav} from 'react-bootstrap';
import data from './data.json';
import Products from './components/Products';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: ""
    };
  }

  render(){
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home" className="mr-auto">React Shopping Cart</Navbar.Brand>
          <Navbar.Brand>Admin</Navbar.Brand>
        </Navbar>
        <Products products={this.state.products}/>
      </div>
    );
  }
  
}

export default App;
