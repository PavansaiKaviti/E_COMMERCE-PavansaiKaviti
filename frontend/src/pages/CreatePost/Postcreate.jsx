import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../Components/Form/FormContainer";
import { useCreateProductMutation } from "../../slices/ProductApislice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loaderspin from "../../Components/Loader/Loaderspin";

const Postcreate = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    brand: "",
    category: "",
    countInStock: 0,
    description: "",
  });
  const [File, setFile] = useState(null);
  const [CreateProduct, { isLoading, isSuccess }] = useCreateProductMutation();
  const onChangeHandler = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };
  const onChangeFileHandler = (e) => {
    setFile(e.target.files[0]);
  };
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      if (!File) {
        toast.error("Please select an image");
        return;
      }
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("brand", productData.brand);
      formData.append("category", productData.category);
      formData.append("countInStock", productData.countInStock);
      formData.append("description", productData.description);
      formData.append("image", File);
      const res = await CreateProduct(formData).unwrap();
      if (isLoading) {
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
    <FormContainer>
      <h1>Create Product</h1>
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
          Create
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Postcreate;
