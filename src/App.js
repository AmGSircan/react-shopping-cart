import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col, Navbar} from 'react-bootstrap';
import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: ""
    };
    this.filterProducts = this.filterProducts.bind(this);
    this.sortProducts = this.sortProducts.bind(this);
  }

  filterProducts(e){
    if(e.target.value === ""){
      this.setState({
        products: data.products,
        size: e.target.value
      })
    }
    else{
      this.setState({
        size: e.target.value,
        products: data.products.filter(product => product.availableSizes.indexOf(e.target.value) >= 0)
      })
    }
  }

  sortProducts(e){
    const sort = e.target.value;

    this.setState({
      sort: sort,
      products: this.state.products.slice().sort((a, b) => {
        return (
          sort === "lowest" ? a.price > b.price ? 1:-1:
          sort === "highest" ? a.price < b.price ? 1:-1:
          a._id > b._id ? 1:-1
        )
      })
    })
  }

  render(){
    const listProducts = this.state.products.map((product) => <Products key={product._id} product={product} />)
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home" className="mr-auto">React Shopping Cart</Navbar.Brand>
          <Navbar.Brand>Admin</Navbar.Brand>
        </Navbar>
        <Row>
          <Col md={9}>
            <Filter
              count={this.state.products.length}
              size={this.state.size}
              sort={this.state.sort}
              filterProducts={this.filterProducts}
              sortProducts={this.sortProducts}
            />
            <Row>{listProducts}</Row>
          </Col>
        </Row>
      </div>
    );
  }
  
}

export default App;
