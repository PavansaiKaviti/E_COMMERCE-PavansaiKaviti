import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Col,
  Row,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import MessageAlert from "../../Components/message/MessageAlert";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../slices/cartSlice";
const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  //!alternative but not recommended
  //   const total = cartItems.reduce((a, c) => {
  //     return (a = Number(c.qty) + a);
  //   }, 0);
  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };
  const removeFormCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    return navigate("/login?redirect=/shipping");
  };
  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageAlert>
            Cart is empty. Place add something to cart to Oder{" "}
            <Link to="/">
              <Button size="sm">Go Back</Button>
            </Link>
          </MessageAlert>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => {
              return (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.brand} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFormCartHandler(item._id)}
                      >
                        <FaTrash></FaTrash>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Items: {cartItems.reduce((a, c) => a + Number(c.qty), 0)}</h2>
              <p>
                Totalprice: $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0 ? true : false}
                onClick={() => checkoutHandler()}
              >
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
