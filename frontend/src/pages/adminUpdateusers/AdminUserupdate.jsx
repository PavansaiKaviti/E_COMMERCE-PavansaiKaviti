import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../Components/Form/FormContainer";
import { useParams, useNavigate } from "react-router-dom";
import {
  useAdminUserupdateMutation,
  useSingleuserAdminQuery,
} from "../../slices/UsersApiSlice";
import Loaderspin from "../../Components/Loader/Loaderspin";
import { toast } from "react-toastify";
const AdminUserupdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [check, setCheck] = useState(false);
  const [adminUserupdate, { isLoading }] = useAdminUserupdateMutation();
  const { data } = useSingleuserAdminQuery(id);
  useEffect(() => {
    if (data) {
      setUserData({ name: data.name, email: data.email });
    }
  }, [data]);
  const onchangeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const checkHandler = () => {
    setCheck((prev) => (prev = !prev));
  };
  const onsubmitHandler = async (e) => {
    try {
      e.preventDefault();
      userData.isAdmin = check;
      const res = await adminUserupdate({ id, userData }).unwrap();
      if (res) {
        toast.success(res.message);
        navigate("/admin/userlist");
      }
    } catch (error) {
      return toast.error(error.data.message || error.message);
    }
  };

  return (
    <FormContainer>
      <h1>Edit User</h1>
      <Form onSubmit={onsubmitHandler}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>User Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="User Name"
            value={userData.name}
            name="name"
            onChange={onchangeHandler}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="example@gmail.com"
            value={userData.email}
            name="email"
            onChange={onchangeHandler}
          ></Form.Control>
          <Form.Check
            type="checkbox"
            label="as Admin"
            className="mt-2"
            onChange={checkHandler}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Confirm
        </Button>
      </Form>
    </FormContainer>
  );
};

export default AdminUserupdate;
