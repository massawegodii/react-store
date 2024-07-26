import React, { useState } from "react";
import {
  faEnvelope,
  faLock,
  faSignInAlt,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { authenticateUser } from "../services";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const initialState = {
    userName: "",
    userPassword: "",
  };

  const [user, setUser] = useState(initialState);
  const [error, setError] = useState();
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetLoginForm = () => {
    setUser(initialState);
  };

  const credentialChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const validateUser = () => {
    dispatch(authenticateUser(user.userName, user.userPassword))
      .then((response) => {
        console.log(response.data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        setShow(true);
        resetLoginForm();
        setError("Invalid Username and Password");
      });
  };

  return (
    <Row className="justify-content-md-center">
      <Col xs={5}>
        {show && props.message && (
          <Alert variant="success" onClose={() => setShow(false)} dismissible>
            {props.message}
          </Alert>
        )}
        {show && error && (
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            {error}
          </Alert>
        )}
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={faSignInAlt} /> Login
          </Card.Header>
          <Card.Body>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </InputGroup.Text>
                    <FormControl
                      required
                      autoComplete="off"
                      type="text"
                      name="userName"
                      value={user.userName}
                      onChange={credentialChange}
                      className={"bg-dark text-white"}
                      placeholder="Enter Email Address"
                    />
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faLock} />
                    </InputGroup.Text>
                    <FormControl
                      required
                      autoComplete="off"
                      type="userPassword"
                      name="userPassword"
                      value={user.userPassword}
                      onChange={credentialChange}
                      className={"bg-dark text-white"}
                      placeholder="Enter Password"
                    />
                  </InputGroup>
                </Form.Group>
              </Row>
            </Form>
          </Card.Body>
          <Card.Footer style={{ textAlign: "right" }}>
            <Button
              size="sm"
              type="button"
              variant="success"
              onClick={validateUser}
              disabled={
                user.userName.length === 0 || user.userPassword.length === 0
              }
            >
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </Button>{" "}
            <Button
              size="sm"
              type="button"
              variant="info"
              onClick={resetLoginForm}
              disabled={
                user.userName.length === 0 && user.userPassword.length === 0
              }
            >
              <FontAwesomeIcon icon={faUndo} /> Reset
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
