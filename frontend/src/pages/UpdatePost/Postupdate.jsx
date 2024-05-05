import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../Components/Form/FormContainer";
import { useParams, useNavigate } from "react-router-dom";
import {
  useEditProductMutation,
  useGetProductDetailsQuery,
} from "../../slices/ProductApislice";
import Loaderspin from "../../Components/Loader/Loaderspin";
import MessageAlert from "../../Components/message/MessageAlert";
import { toast } from "react-toastify";
const Postupdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: fetchProduct,
    isLoading,
    error,
  } = useGetProductDetailsQuery(id);
  const [EditProduct, { isLoading: Eploading, error: Eperror }] =
    useEditProductMutation();
  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    brand: "",
    category: "",
    countInStock: 0,
    description: "",
  });
  const [File, setFile] = useState(null);
  useEffect(() => {
    if (fetchProduct) {
      setProductData({
        name: fetchProduct.name,
        price: fetchProduct.price,
        brand: fetchProduct.brand,
        category: fetchProduct.category,
        countInStock: fetchProduct.countInStock,
        description: fetchProduct.description,
      });
    }
  }, [fetchProduct]);
  const onChangeHandler = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };
  const onChangeFileHandler = (e) => {
    setFile(e.target.files[0]);
  };
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("brand", productData.brand);
      formData.append("category", productData.category);
      formData.append("countInStock", productData.countInStock);
      formData.append("description", productData.description);
      formData.append("image", File);
      const res = await EditProduct({ id, formData }).unwrap();
      if (Eploading) {
        <Loaderspin />;
      } else {
        navigate("/admin/productlist");
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(error.message);
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
        <FormContainer>
          <h1>Edit Product</h1>
          <Form onSubmit={onSubmitHandler} encType="multipart/form-data">
            <Form.Group className="mb-1" controlId="FormBasicName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={productData.name}
                name="name"
                onChange={onChangeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="FormBasicPrice">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price"
                value={productData.price}
                name="price"
                onChange={onChangeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="FormBasicBrand">
              <Form.Label>Brand:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Brand"
                value={productData.brand}
                name="brand"
                onChange={onChangeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="FormBasicCategory">
              <Form.Label>Category:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Category"
                value={productData.category}
                name="category"
                onChange={onChangeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="FormBasicCountInStock">
              <Form.Label>CountInStock:</Form.Label>
              <Form.Control
                type="number"
                placeholder="CountInStock"
                value={productData.countInStock}
                name="countInStock"
                onChange={onChangeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="FormBasicDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                value={productData.description}
                name="description"
                onChange={onChangeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="FormBasicImage">
              <Form.Label>Upload an Image:</Form.Label>
              <Form.Control
                type="file"
                onChange={onChangeFileHandler}
                name="image"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Edit
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default Postupdate;
