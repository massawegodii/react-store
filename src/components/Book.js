import {
  faList,
  faSave,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons/faPlusSquare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.bookChange = this.bookChange.bind(this);
    this.submitBook = this.submitBook.bind(this);
  }

  initialState = {
    id: "",
    title: "",
    author: "",
    coverPhotoURL: "",
    isbnNumber: "",
    price: "",
    language: "",
    genre: "",
  };

  bookChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitBook(event) {
    alert(this.state.title);
    event.preventDefault();
  }

  render() {
    return (
      <Card className="border border-dark bg-dark text-white">
        <Card.Header>
          <FontAwesomeIcon icon={faPlusSquare} /> Add Book
        </Card.Header>
        <Form onSubmit={this.submitBook} id="bookFormId">
          <Card.Body>
            <Row>
              <Form.Group as={Col} controlId="formGridTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.bookChange}
                  className="bg-dark text-white"
                  placeholder="Enter Book Title"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridAuthor">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  name="author"
                  className="bg-dark text-white"
                  placeholder="Enter Book Author"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formGridCoverPhotoURL">
                <Form.Label>Cover Photo URL</Form.Label>
                <InputGroup>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="coverPhotoURL"
                    className="bg-dark text-white"
                    placeholder="Enter Book Cover Photo URL"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridISBNNumber">
                <Form.Label>ISBN Number</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  name="isbnNumber"
                  className="bg-dark text-white"
                  placeholder="Enter Book ISBN Number"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formGridPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  name="price"
                  className="bg-dark text-white"
                  placeholder="Enter Book Price"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridLanguage">
                <Form.Label>Language</Form.Label>
                <Form.Control
                  as="select"
                  name="language"
                  className="bg-dark text-white"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridGenre">
                <Form.Label>Genre</Form.Label>
                <Form.Control
                  as="select"
                  name="genre"
                  className="bg-dark text-white"
                />
              </Form.Group>
            </Row>
          </Card.Body>
          <Card.Footer style={{ textAlign: "right" }}>
            <Button size="sm" variant="success" type="submit">
              <FontAwesomeIcon icon={faSave} /> Submit
            </Button>{" "}
            <Button size="sm" variant="info" type="reset">
              <FontAwesomeIcon icon={faUndo} /> Reset
            </Button>{" "}
            <Button size="sm" variant="info" type="button">
              <FontAwesomeIcon icon={faList} /> Book List
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    );
  }
}
