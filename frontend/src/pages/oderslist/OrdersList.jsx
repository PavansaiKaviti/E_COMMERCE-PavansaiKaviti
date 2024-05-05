import React from "react";
import { useGetAllOdersQuery } from "../../slices/OrderApiSlice";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import MessageAlert from "../../Components/message/MessageAlert";
import Loaderspin from "../../Components/Loader/Loaderspin";
import Time from "../../Components/time/Time";

const OdersList = () => {
  const { data: Oders, isLoading, error } = useGetAllOdersQuery();

  return (
    <>
      <h1>Oders</h1>
      {isLoading ? (
        <Loaderspin />
      ) : error ? (
        <MessageAlert>{error?.data?.message || error?.error}</MessageAlert>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Oders.map((oder) => (
              <tr key={oder._id}>
                <td>{oder._id}</td>
                <td>{oder.user && oder.user.name}</td>
                <td>
                  <Time time={oder.createdAt} />
                </td>
                <td>${oder.totalPrice}</td>
                <td>
                  {oder.isPaid ? (
                    oder.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }}></FaTimes>
                  )}
                </td>
                <td>
                  {oder.isDelivered ? (
                    oder.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }}></FaTimes>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${oder._id}`}>
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
    </>
  );
};

export default OdersList;
