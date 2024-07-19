import { Col, Container, Row } from 'react-bootstrap';

import './App.css';
import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import Book from './components/Book';
import BookList from './components/BookList';
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  const marginTop = {
    marginTop: '20px'
  }
  return (
    <BrowserRouter>
      <NavigationBar />
      <Container>
        <Row>
          <Col lg={15} style={marginTop}>
            <Routes>
              <Route path="/" exact Component={Welcome} />
              <Route path="/add" exact Component={Book} />
              <Route path="/list" exact Component={BookList} />
            </Routes>
          </Col>
        </Row>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

