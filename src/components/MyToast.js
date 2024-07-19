import React from "react";
import { Toast } from "react-bootstrap";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const MyToast = (props) => {
  const toastCss = {
    position: "fixed",
    top: "10px",
    right: "10px",
    zIndex: "1",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  };

  return (
    <div style={props.show ? toastCss : null}>
      <Toast
        className={`border text-white ${
          props.type === "success"
            ? "border-success bg-success"
            : "border-danger bg-danger"
        }`}
        show={props.show}
      >
        <Toast.Body style={{ display: "flex", alignItems: "center" }}>
          {props.type === "success" ? (
            <FaCheckCircle style={{ marginRight: "10px" }} />
          ) : (
            <FaExclamationTriangle style={{ marginRight: "10px" }} />
          )}
          {props.message}
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default MyToast;
