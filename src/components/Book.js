import {
  faEdit,
  faList,
  faSave,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons/faPlusSquare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import MyToast from "./MyToast";
import { useParams, useNavigate } from "react-router-dom";

const Book = () => {
  const initialState = {
    id: "",
    title: "",
    author: "",
    coverPhotoURL: "",
    isbnNumber: "",
    price: "",
    language: "",
    genre: "",
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(initialState);
  const [show, setShow] = useState({ visible: false, method: "" });

  useEffect(() => {
    if (id) {
      findBookById(id);
    }
  }, [id]);

  //Call the update in the form
  const findBookById = (bookId) => {
    axios
      .get("http://localhost:8081/rest/books/" + bookId)
      .then((response) => {
        if (response.data) {
          setBook(response.data);
        }
      })
      .catch((error) => {
        console.log("Error" + error);
      });
  };

  const resetBook = () => {
    setBook(initialState);
  };

  const handleNavigateToList = () => {
    navigate("/list");
  };

  const bookChange = (event) => {
    setBook({
      ...book,
      [event.target.name]: event.target.value,
    });
  };

  const submitBook = (event) => {
    event.preventDefault();

    axios.post("http://localhost:8081/rest/books", book).then((response) => {
      if (response.data != null) {
        setShow({ visible: true, method: "post" });
        setTimeout(() => setShow({ ...show, visible: false }), 3000);
      } else {
        setShow({ ...show, visible: false });
      }
    });
    resetBook();
  };

  const updateBook = (event) => {
    event.preventDefault();

    axios.put("http://localhost:8081/rest/books", book).then((response) => {
      if (response.data != null) {
        setShow({ visible: true, method: "put" });
        setTimeout(() => handleNavigateToList(), 2000);
      } else {
        setShow({ ...show, visible: false });
      }
    });
    resetBook();
  };

  const { title, author, coverPhotoURL, isbnNumber, price, language, genre } =
    book;

  return (
    <div>
      <div style={{ display: show.visible ? "block" : "none" }}>
        <MyToast
          show={show.visible}
          message={
            show.method === "put"
              ? "Book Updated successfully"
              : "Book Saved successfully"
          }
          type="success"
        />
      </div>
      <Card className="border border-dark bg-dark text-white">
        <Card.Header>
          <FontAwesomeIcon icon={book.id ? faEdit : faPlusSquare} />{" "}
          {book.id ? "Update Book" : "Add Book"}{" "}
        </Card.Header>
        <Form
          onReset={resetBook}
          onSubmit={book.id ? updateBook : submitBook}
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
                  onChange={bookChange}
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
                  onChange={bookChange}
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
                    onChange={bookChange}
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
                  onChange={bookChange}
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
                  onChange={bookChange}
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
              <FontAwesomeIcon icon={faSave} /> {book.id ? "Update" : "Save"}
            </Button>{" "}
            <Button size="sm" variant="info" type="reset">
              <FontAwesomeIcon icon={faUndo} /> Reset
            </Button>{" "}
            <Button
              size="sm"
              variant="info"
              type="button"
              onClick={handleNavigateToList}
            >
              <FontAwesomeIcon icon={faList} /> Book List
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
};

export default Book;
