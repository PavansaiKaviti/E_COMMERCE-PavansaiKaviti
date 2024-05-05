import React from "react";
import { Alert } from "react-bootstrap";

const MessageAlert = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};
Alert.defaultProps = {
  variant: "info",
};
export default MessageAlert;
