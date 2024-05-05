import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import FormContainer from "../../Components/Form/FormContainer";
import Loaderspin from "../../Components/Loader/Loaderspin";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../slices/UsersApiSlice";
import { setCredentials } from "../../slices/AuthSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [formdata, setFormdata] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { UserInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (UserInfo) {
      navigate(redirect);
    }
  }, [UserInfo, redirect, navigate]);
  const onChangeHandler = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formdata).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      toast.success(`${res.name} successfully Logged In`);
      navigate(redirect);
    } catch (error) {
      toast.error(error.error || error?.data?.message);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={formdata.email}
            onChange={onChangeHandler}
            name="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={formdata.password}
            onChange={onChangeHandler}
            name="password"
            placeholder="Enter password"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="mt-2"
          disabled={isLoading}
        >
          Sign in
        </Button>
        {isLoading && <Loaderspin />}
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?
          <Link to={redirect ? `/register?redirect=${redirect}` : "/login"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Login;
