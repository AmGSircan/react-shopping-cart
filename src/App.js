import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Navbar} from 'react-bootstrap';

//Feature 1

function App() {
  return (
    <Container>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home" className="mr-auto">React Shopping Cart</Navbar.Brand>
        <Navbar.Brand>Admin</Navbar.Brand>
      </Navbar>
    </Container>
  );
}

export default App;
