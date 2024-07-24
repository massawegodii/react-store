import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons/faSignOutAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../App.css";
import { logoutUser } from "./services";

const NavigationBar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
     dispatch(logoutUser());
  };

  const guestLinks = (
    <>
      <div className="navbar-end">
        <Nav className="navbar-nav">
          <Nav.Item>
            <Link to={"register"} className="nav-link">
              <FontAwesomeIcon icon={faUserPlus} /> Register
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to={"login"} className="nav-link">
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </Link>
          </Nav.Item>
        </Nav>
      </div>
    </>
  );
  const userLinks = (
    <>
      <Nav className="mr-auto">
        <Link to={"add"} className="nav-link">
          Add Book
        </Link>
        <Link to={"list"} className="nav-link">
          Book List
        </Link>
        <Link to={"users"} className="nav-link">
          User List
        </Link>
      </Nav>
      <Nav className="navbar-right">
        <Link to={"logout"} className="nav-link" onClick={logout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </Link>
      </Nav>
    </>
  );

  return (
    <Navbar bg="dark" variant="dark">
      <Link to={auth.isLoggedIn ? "home" : ""} className="navbar-brand">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Book_icon_1.png"
          width="25"
          height="25"
          alt="brand"
        />{" "}
        Book Store
      </Link>
      {auth.isLoggedIn ? userLinks : guestLinks}
    </Navbar>
  );
};

export default NavigationBar;
