import React from "react";
import { Card } from "react-bootstrap";

const Welcome = () => {
  return (
    <Card className="bg-dark text-white">
      <Card.Body>
        <Card.Title className="text-center">Welcome to Book Shop</Card.Title>
        <Card.Text className="text-center">
          Good Morning welcome to God Book Shop
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Welcome;
