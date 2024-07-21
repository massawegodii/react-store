import {
  faFastBackward,
  faFastForward,
  faStepBackward,
  faStepForward,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, FormControl, InputGroup, Table } from "react-bootstrap";

const UserList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [users, setUsers] = useState([]);

  const pageNum = {
    width: "45px",
    border: "1px solid #17A2B8",
    color: "#17A2B8",
    textAlign: "center",
    fontWeight: "bold",
  };

  useEffect(() => {
    findAlRandomUser();
  }, []);

  const findAlRandomUser = () => {
    axios
      .get(
        "https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole"
      )
      .then((response) => {
        if (response.data) {
          setUsers(response.data);
          console.table(response.data);
        }
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  };

  const lastIndex = currentPage * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;
  const totalPages = Math.ceil(users.length / usersPerPage);
  const currentUsers = users.slice(firstIndex, lastIndex);

  const firstPage = () => {
    if (currentPage > 1) setCurrentPage(1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const lastPage = () => {
    if (currentPage < totalPages) setCurrentPage(totalPages);
  };

  const changePage = (event) => {
    const pageNumber = Number(event.target.value);
    if (pageNumber > 0 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  };

  //You can use users in currentUsers to map to get data when not use pagination
  return (
    <div>
      <Card className={"border border-dark bg-dark text-white"}>
        <Card.Header>
          <FontAwesomeIcon icon={faUsers} /> User List
        </Card.Header>
        <Card.Body>
          <Table bordered hover striped variant="dark">
            <thead>
              <tr>
                <td>Name</td>
                <td>Email</td>
                <td>Address</td>
                <td>Created</td>
                <td>Balance</td>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length === 0 ? (
                <tr align="center">
                  <td colSpan="6">No Users Available</td>
                </tr>
              ) : (
                currentUsers.map((user, index) => (
                  <tr key={index}>
                    <td>
                      {user.first} {user.last}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td>{user.created}</td>
                    <td>{user.balance}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
        <Card.Footer>
          <div style={{ float: "left" }}>
            Showing Page {currentPage} of {totalPages}
          </div>
          <div style={{ float: "right" }}>
            <InputGroup size="sm">
              <Button
                type="button"
                variant="outline-info"
                disabled={currentPage === 1}
                onClick={firstPage}
              >
                <FontAwesomeIcon icon={faFastBackward} /> First
              </Button>
              <Button
                type="button"
                variant="outline-info"
                disabled={currentPage === 1}
                onClick={prevPage}
              >
                <FontAwesomeIcon icon={faStepBackward} /> Prev
              </Button>
              <FormControl
                style={pageNum}
                name="currentPage"
                value={currentPage}
                onChange={changePage}
              />
              <Button
                type="button"
                variant="outline-info"
                disabled={currentPage === totalPages}
                onClick={nextPage}
              >
                <FontAwesomeIcon icon={faStepForward} /> Next
              </Button>
              <Button
                type="button"
                variant="outline-info"
                disabled={currentPage === totalPages}
                onClick={lastPage}
              >
                <FontAwesomeIcon icon={faFastForward} /> Last
              </Button>
            </InputGroup>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default UserList;
