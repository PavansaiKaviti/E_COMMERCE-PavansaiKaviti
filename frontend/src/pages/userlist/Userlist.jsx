import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Col, Table, Button } from "react-bootstrap";
import { FaEdit, FaTimes, FaCheck, FaTrash } from "react-icons/fa";
import {
  useDeleteAuserMutation,
  useGetAllUsersQuery,
} from "../../slices/UsersApiSlice";
import MessageAlert from "../../Components/message/MessageAlert";
import Loaderspin from "../../Components/Loader/Loaderspin";
import { toast } from "react-toastify";

const Userlist = () => {
  const { data: users, isLoading, refetch, error } = useGetAllUsersQuery();
  const [DeleteAuser, { isLoading: DuLoading }] = useDeleteAuserMutation();
  // useEffect(() => {
  //   refetch();//!no need because iam feteching  2 request at a time
  // }, [users]);
  const userDelete = async (id) => {
    if (DuLoading) {
      return <Loaderspin />;
    } else {
      refetch();
      const res = await DeleteAuser(id).unwrap();
      toast.success(res.message);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loaderspin />
      ) : error ? (
        <MessageAlert variant="danger">
          {error?.data?.message || error?.error}
        </MessageAlert>
      ) : (
        <>
          <Row className="align-items-center">
            <Col>
              <h1>Users</h1>
            </Col>
          </Row>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            {users.map((item) => (
              <tbody key={item._id}>
                <tr>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    {item.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/userEdit/${item._id}`}>
                      <Button variant="light" className="btn-sm">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm m-1"
                      onClick={() => userDelete(item._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </>
      )}
    </>
  );
};

export default Userlist;
