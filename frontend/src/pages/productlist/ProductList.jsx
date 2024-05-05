import React from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../slices/ProductApislice";
import { FaEdit, FaTrash } from "react-icons/fa";
import MessageAlert from "../../Components/message/MessageAlert";
import Loaderspin from "../../Components/Loader/Loaderspin";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Paginate from "../../Components/Paginate/Paginate";

const ProductList = () => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const { data, refetch, isLoading, error } = useGetProductsQuery({
    pageNumber,
  });
  const [DeleteProduct, { isLoading: Dloading, error: Derror }] =
    useDeleteProductMutation();
  const deleteHandler = async (id) => {
    const res = await DeleteProduct(id).unwrap();
    refetch();
    toast.success(res.message);
  };
  const CreateproductHandler = () => {
    navigate("/admin/CreatePost");
  };
  console.log(data);
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={CreateproductHandler}>
            <FaEdit />
            Create Product
          </Button>
        </Col>
      </Row>
      {isLoading ? (
        <Loaderspin />
      ) : error ? (
        <MessageAlert variant="danger">
          {error?.data?.message || error?.error}
        </MessageAlert>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/products/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={data.page} pages={data.pages} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductList;
