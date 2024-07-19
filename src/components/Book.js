import { faList, faSave, faUndo } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons/faPlusSquare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import MyToast from "./MyToast";
import { type } from "@testing-library/user-event/dist/type";

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state.show = false;
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

  resetBook = () => {
    this.setState(() => this.initialState);
  };

  bookChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitBook = (event) => {
    event.preventDefault();

    const book = {
      title: this.state.title,
      author: this.state.author,
      coverPhotoURL: this.state.coverPhotoURL,
      isbnNumber: this.state.isbnNumber,
      price: this.state.price,
      language: this.state.language,
      genre: this.state.genre,
    };

    axios.post("http://localhost:8081/rest/books", book).then((response) => {
      if (response.data != null) {
        this.setState({ show: true });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    });
    this.setState(this.initialState);
  };

  render() {
    const { title, author, coverPhotoURL, isbnNumber, price, language, genre } =
      this.state;
    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message="Book Saved successfully"
            type="success"
          />
        </div>
        <Card className="border border-dark bg-dark text-white">
          <Card.Header>
            <FontAwesomeIcon icon={faPlusSquare} /> Add Book
          </Card.Header>
          <Form
            onReset={this.resetBook}
            onSubmit={this.submitBook}
            id="bookFormId"
          >
            <Card.Body>
              <Row>
                <Form.Group as={Col} controlId="formGridTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="title"
                    value={title}
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
                    value={author}
                    onChange={this.bookChange}
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
                      onChange={this.bookChange}
                      value={coverPhotoURL}
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
                    onChange={this.bookChange}
                    value={isbnNumber}
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
                    onChange={this.bookChange}
                    value={price}
                    name="price"
                    className="bg-dark text-white"
                    placeholder="Enter Book Price"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridLanguage">
                  <Form.Label>Language</Form.Label>
                  <Form.Control
                    as="select"
                    value={language}
                    name="language"
                    className="bg-dark text-white"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridGenre">
                  <Form.Label>Genre</Form.Label>
                  <Form.Control
                    as="select"
                    value={genre}
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
      </div>
    );
  }
}
