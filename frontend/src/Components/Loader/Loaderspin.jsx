import React from "react";
import { Spinner } from "react-bootstrap";
const Loaderspin = () => {
  return (
    <div>
      <Spinner
        animation="border"
        role="status"
        style={{
          width: "100px",
          height: "100px",
          margin: "auto",
          display: "block",
        }}
      ></Spinner>
    </div>
  );
};

export default Loaderspin;
