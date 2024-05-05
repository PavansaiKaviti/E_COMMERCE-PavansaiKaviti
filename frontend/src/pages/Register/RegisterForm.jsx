import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../../Components/Form/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../slices/UsersApiSlice";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../slices/AuthSlice";
import { toast } from "react-toastify";
import Loaderspin from "../../Components/Loader/Loaderspin";
import { useLocation, Link } from "react-router-dom";
const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { UserInfo } = useSelector((state) => state.auth);
  const [register, { isLoading }] = useRegisterMutation();
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const onChangeHandler = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (UserInfo) {
      navigate(redirect);
    }
  }, [UserInfo, redirect, navigate]);
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      if (registerForm.password === registerForm.confirmPassword) {
        const res = await register({
          name: registerForm.name,
          email: registerForm.email,
          password: registerForm.password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(res);
        toast.success("user Registered Successfully");
      } else {
        navigate("/register");
        toast.error("password doesn't match try again");
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group controlId="Name" className="my-3">
          <Form.Label>FullName:</Form.Label>
          <Form.Control
            placeholder="FullName"
            type="text"
            value={registerForm.name}
            name="name"
            onChange={onChangeHandler}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            placeholder="Example@gmail.com"
            type="email"
            value={registerForm.email}
            name="email"
            onChange={onChangeHandler}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="Password" className="my-3">
          <Form.Label>CreatePassword:</Form.Label>
          <Form.Control
            placeholder="Password"
            type="password"
            value={registerForm.password}
            name="password"
            onChange={onChangeHandler}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="ConfirmPassword" className="my-3">
          <Form.Label>ConfirmPassword:</Form.Label>
          <Form.Control
            placeholder="ConfirmPassword"
            type="password"
            value={registerForm.confirmPassword}
            name="confirmPassword"
            onChange={onChangeHandler}
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
        {isLoading && <Loaderspin />}
      </Form>
      <Row className="py-3">
        <Col>
          Already Have an Account ?
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterForm;
