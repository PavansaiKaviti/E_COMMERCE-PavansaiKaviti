import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import FormContainer from "../../Components/Form/FormContainer";
import { ShippingAddress } from "../../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AllSteps from "../../Components/Steps/AllSteps";

const ShippingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shippingaddress, setshippingaddress] = useState({
    Email: "",
    Phone: "",
    Address: "",
    City: "",
    State: "",
    Zip: "",
  });
  const { cartItems } = useSelector((state) => state.cart);
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);
  const [Userdetails, setUserdetails] = useState(false);
  const onChangeHandler = (e) => {
    setshippingaddress({ ...shippingaddress, [e.target.name]: e.target.value });
  };
  const onUserHandler = () => {
    setUserdetails((Prev) => !Prev);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(ShippingAddress(shippingaddress));
    navigate("/payment");
  };
  return (
    <FormContainer>
      <AllSteps step1 step2 />
      <h1>Shipping Addres</h1>
      <Form onSubmit={onSubmitHandler}>
        <Row className="mb-2">
          <Form.Group>
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label={Userdetails ? "ship to friend" : "ship to me"}
              onChange={onUserHandler}
            />
          </Form.Group>
        </Row>
        {Userdetails ? (
          <Row className="mb-1">
            <Form.Group as={Col}>
              <Form.Label>Firstname:</Form.Label>
              <Form.Control
                placeholder="Firstname"
                type="text"
                value={shippingaddress.FirstName}
                name="FirstName"
                onChange={onChangeHandler}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Lastname:</Form.Label>
              <Form.Control
                placeholder="Lastname"
                type="text"
                value={shippingaddress.LastName}
                name="LastName"
                onChange={onChangeHandler}
              />
            </Form.Group>
          </Row>
        ) : (
          <></>
        )}

        <Row className="mb-1">
          <Form.Group as={Col}>
            <Form.Label>Address:</Form.Label>
            <Form.Control
              placeholder="H:no,colony,Street"
              type="text"
              value={shippingaddress.Address}
              name="Address"
              onChange={onChangeHandler}
            />
          </Form.Group>
        </Row>
        <Row className="mb-1">
          <Form.Group as={Col}>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              placeholder="example@gmail.com"
              type="email"
              value={shippingaddress.Email}
              name="Email"
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Phone:</Form.Label>
            <Form.Control
              placeholder="Phone"
              type="text"
              value={shippingaddress.Phone}
              name="Phone"
              onChange={onChangeHandler}
            />
          </Form.Group>
        </Row>
        <Row className="mb-1">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="City"
              required
              value={shippingaddress.City}
              name="City"
              onChange={onChangeHandler}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder="State"
              required
              value={shippingaddress.State}
              name="State"
              onChange={onChangeHandler}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              type="text"
              placeholder="Zip"
              required
              value={shippingaddress.Zip}
              name="Zip"
              onChange={onChangeHandler}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button variant="primary" className="mt-3" type="submit">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
