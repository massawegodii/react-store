import React, { useState } from "react";
import {
  faEnvelope,
  faLock,
  faUndo,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/register/userActions";
import MyToast from "../MyToast";

export const Register = () => {
  const initialState = {
    userName: "",
    email: "",
    userFirstName: "",
    userLastName: "",
    userPassword: "",
  };

  const [user, setUser] = useState(initialState);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const userChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const saveUser = () => {
    dispatch(registerUser(user))
      .then((response) => {
        setShow(true);
        setMessage(response.message);
        resetRegisterForm();
        setTimeout(() => {
          setShow(false);
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const resetRegisterForm = () => {
    setUser(initialState);
  };

  return (
    <div>
      <div style={{ display: show ? "block" : "none" }}>
        <MyToast show={show} message={message} type={"success"} />
      </div>

      <Row className="justify-content-md-center">
        <Col xs={5}>
          <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header>
              <FontAwesomeIcon icon={faUserPlus} /> Register
            </Card.Header>
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <FormControl
                        autoComplete="off"
                        type="text"
                        name="userName"
                        value={user.userName}
                        onChange={userChange}
                        className={"bg-dark text-white"}
                        placeholder="Enter Username"
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <FormControl
                        required
                        autoComplete="off"
                        type="text"
                        name="userFirstName"
                        value={user.userFirstName}
                        onChange={userChange}
                        className={"bg-dark text-white"}
                        placeholder="Enter FirstName "
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <FormControl
                        autoComplete="off"
                        type="text"
                        name="userLastName"
                        value={user.userLastName}
                        onChange={userChange}
                        className={"bg-dark text-white"}
                        placeholder="Enter LastName"
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <FormControl
                        autoComplete="off"
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={userChange}
                        className={"bg-dark text-white"}
                        placeholder="Enter Email"
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
                        type="password"
                        name="userPassword"
                        value={user.userPassword}
                        onChange={userChange}
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
                onClick={saveUser}
                disabled={
                  user.userName.length === 0 || user.userPassword.length === 0
                }
              >
                <FontAwesomeIcon icon={faUserPlus} /> Register
              </Button>{" "}
              <Button
                size="sm"
                type="button"
                variant="info"
                onClick={resetRegisterForm}
              >
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
