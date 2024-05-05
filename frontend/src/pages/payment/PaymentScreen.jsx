import React, { useEffect, useState } from "react";
import FormContainer from "../../Components/Form/FormContainer";
import AllSteps from "../../Components/Steps/AllSteps";
import { Form, FormCheck, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PaymentMethod } from "../../slices/cartSlice";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingAddress, cartItems } = useSelector((state) => state.cart);
  useEffect(() => {
    if (Object.keys(shippingAddress).length === 0 || cartItems.length === 0) {
      navigate("/shipping");
    }
  }, [Object.keys(shippingAddress).length, navigate, cartItems.length]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(PaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <FormContainer>
      <AllSteps step1 step2 step3 />
      <h1>PAYMENT</h1>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <FormCheck
              type="radio"
              className="my-2"
              label="paypal or Credit Card"
              id="paypal"
              name="paymentMethod"
              value="Paypal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></FormCheck>
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
