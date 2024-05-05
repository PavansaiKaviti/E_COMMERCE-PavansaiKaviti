import React, { useEffect, useState } from "react";
import { Row, Col, Form, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import MessageAlert from "../../Components/message/MessageAlert";
import Loaderspin from "../../Components/Loader/Loaderspin";
import { useUserupdateMutation } from "../../slices/UsersApiSlice";
import { setCredentials } from "../../slices/AuthSlice";
import { useGetUserOrdersQuery } from "../../slices/OrderApiSlice";
import { FaTimes } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const [userupdate, { isLoading: updloading, error: upderror }] =
    useUserupdateMutation();
  const {
    data: userOrders,
    isLoading: oderLoading,
    error: orderError,
    refetch,
  } = useGetUserOrdersQuery();
  const { UserInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (UserInfo) {
      setName(UserInfo.name);
      setEmail(UserInfo.email);
    }
  }, [UserInfo, UserInfo.name, UserInfo.email]);
  console.log(userOrders);
  const submitHandler = async (e) => {
    if (password !== confirmPassword) {
      toast.error("password doesn't matched");
    } else {
      try {
        e.preventDefault();
        const res = await userupdate({ name, email, password }).unwrap();
        dispatch(setCredentials(res));
        toast.success("profile updated");
      } catch (error) {
        toast.error(error.data.message || error.error);
      }
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="my-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="my-2">
            <Form.Label>ConfirmPassword</Form.Label>
            <Form.Control
              type="password"
              placeholder="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="my-2">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My oders</h2>
        {oderLoading ? (
          <Loaderspin />
        ) : orderError ? (
          <MessageAlert variant="danger">
            {orderError?.data?.message || orderError.error}
          </MessageAlert>
        ) : (
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }}></FaTimes>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }}></FaTimes>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default Profile;
