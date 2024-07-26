import { Col, Container, Row } from "react-bootstrap";

import "./App.css";
import NavigationBar from "./components/NavigationBar";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import Book from "./components/Book";
import BookList from "./components/BookList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserList from "./components/User/UserList";
import Login from "./components/User/Login";
import { Register } from "./components/User/Register";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Container>
        <Row>
          <Col lg={15} className={"margin-top"}>
            <Routes>
              <Route path="/" exact Component={Welcome} />
              <Route path="/add" exact Component={Book} />
              <Route path="/edit/:id" exact Component={Book} />
              <Route path="/list" exact Component={BookList} />
              <Route path="/users" exact Component={UserList} />
              <Route path="/login" exact Component={Login} />
              <Route path="/register" exact Component={Register} />
              <Route
                path="/logout"
                exact
                component={() => (
                  <Login message="User Logged Out Successfully." />
                )}
              />
            </Routes>
          </Col>
        </Row>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
