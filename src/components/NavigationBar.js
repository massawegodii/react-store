import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to={""} className="navbar-brand">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Book_icon_1.png"
            width="25"
            height="25"
            alt="brand"
          />{" "}
          Book Shop
        </Link>
      </Navbar.Brand>

      <Nav className="me-auto">
        <Link to={"add"} className="nav-link">
          Add Book
        </Link>
        <Link to={"list"} className="nav-link">
          Book List
        </Link>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
