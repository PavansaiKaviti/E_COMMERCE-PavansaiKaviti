import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { ListGroup } from "react-bootstrap";

const AllSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <ListGroup horizontal>
        <ListGroup.Item className="p-0">
          <Nav.Item>
            {step1 ? (
              <LinkContainer to="/login">
                <Nav.Link>
                  <strong>SIGN IN</strong>
                </Nav.Link>
              </LinkContainer>
            ) : (
              <Nav.Link disabled>
                <strong>SIGN IN </strong>
              </Nav.Link>
            )}
          </Nav.Item>
        </ListGroup.Item>
        <ListGroup.Item className="p-0">
          <Nav.Item>
            {step2 ? (
              <LinkContainer to="/shipping">
                <Nav.Link>
                  <strong>SHIPPING</strong>
                </Nav.Link>
              </LinkContainer>
            ) : (
              <Nav.Link disabled>
                <strong>SHIPPING</strong>
              </Nav.Link>
            )}
          </Nav.Item>
        </ListGroup.Item>
        <ListGroup.Item className="p-0">
          <Nav.Item>
            {step3 ? (
              <LinkContainer to="/payment">
                <Nav.Link>
                  <strong>PAYMENT</strong>
                </Nav.Link>
              </LinkContainer>
            ) : (
              <Nav.Link disabled>
                <strong>PAYMENT</strong>
              </Nav.Link>
            )}
          </Nav.Item>
        </ListGroup.Item>
        <ListGroup.Item className="p-0">
          <Nav.Item>
            {step4 ? (
              <LinkContainer to="/placeorder">
                <Nav.Link>
                  <strong>PLACE ORDER</strong>
                </Nav.Link>
              </LinkContainer>
            ) : (
              <Nav.Link disabled>
                <strong>PLACE ORDER</strong>
              </Nav.Link>
            )}
          </Nav.Item>
        </ListGroup.Item>
      </ListGroup>
    </Nav>
  );
};

export default AllSteps;
