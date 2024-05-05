import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Form,
  Col,
  Row,
  Image,
  ListGroup,
  Card,
  Button,
} from "react-bootstrap";
import Rating from "../../Components/Rating/Rating";
import { useGetProductDetailsQuery } from "../../slices/ProductApislice";
import Loaderspin from "../../Components/Loader/Loaderspin";
import MessageAlert from "../../Components/message/MessageAlert";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import {
  useCreateReviewMutation,
  useDeleteReviewMutation,
} from "../../slices/ReviewApi";
import { toast } from "react-toastify";
import Time from "../../Components/time/Time";
import { FaEdit, FaTrash } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

// import { useReducer } from "react";
//!reducer for count
// const reducer = (state, action) => {
//   const { type } = action;
//   switch (type) {
//     case "ADD":
//       return (state = state + 1);
//     case "REMOVE":
//       return state >= 2 ? (state = state - 1) : state;
//   }
// };
const Productpage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { UserInfo } = useSelector((state) => state.auth);
  const [qty, setQty] = useState(1);
  const [Commentdata, setCommentdata] = useState({ rating: 0, comment: "" });
  const {
    data: Productfound,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(id);
  const [CreateReview, { isLoading: ReviewLoading }] =
    useCreateReviewMutation();
  const [DeleteReview] = useDeleteReviewMutation();
  const addtocarthandler = () => {
    dispatch(addToCart({ ...Productfound, qty }));
    navigate("/cart");
  };
  const onChangecommentHandler = (e) => {
    setCommentdata({ ...Commentdata, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      if (Commentdata.rating > 5) {
        toast.error("please rate between 1-5");
      } else {
        const res = await CreateReview({ id, Commentdata }).unwrap();
        refetch();
        toast.success(res.message);
        setCommentdata({ rating: 0, comment: "" });
      }
    } catch (error) {
      toast.error(error.data.message || error.error);
    }
  };
  // const initialvalue = 1;
  // const [state, dispatch] = useReducer(reducer, initialvalue);
  const DeleteComment = async (id) => {
    try {
      const res = await DeleteReview(id).unwrap();
      refetch();
      toast.success(res.message);
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loaderspin />
      ) : error ? (
        <MessageAlert variant="danger">
          <h2>Error:{error.error}</h2>
        </MessageAlert>
      ) : (
        <>
          <Link className="btn btn-light my-3" to="/">
            Go Back
          </Link>
          <Row>
            <Col md={5}>
              <Image
                src={Productfound.image}
                alt={Productfound.name}
                fluid
              ></Image>
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{Productfound.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    Rating={Productfound.rating}
                    Review={Productfound.numReviews}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Price:</strong>${Productfound.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Description: </strong>
                  {Productfound.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${Productfound.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {Productfound.countInStock > 0
                            ? "In Stock"
                            : "Out Of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {/* {Productfound.countInStock > 0 ? (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity:</Col>
                        <Col>
                          <Button
                            size="sm"
                            onClick={() => dispatch({ type: "REMOVE" })}
                          >
                            -
                          </Button>
                          {state}
                          <Button
                            size="sm"
                            onClick={() => dispatch({ type: "ADD" })}
                          >
                            +
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ) : (
                    <></>
                  )} */}
                  {Productfound.countInStock > 0 ? (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity:</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(Productfound.countInStock).keys()].map(
                              (x) => {
                                return (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                );
                              }
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ) : (
                    <></>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={Productfound.countInStock === 0}
                      onClick={addtocarthandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          {UserInfo ? (
            <Row className="mt-3">
              <Col>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Form onSubmit={onSubmitHandler}>
                      <Row>
                        <Col md={3}>
                          <Form.Group>
                            <Form.Label>
                              <strong>Rating:</strong>
                            </Form.Label>
                            <Form.Control
                              placeholder="rating /5"
                              value={Commentdata.rating}
                              onChange={onChangecommentHandler}
                              name="rating"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group>
                            <Form.Label>
                              <strong>Comment:</strong>
                            </Form.Label>
                            <Form.Control
                              placeholder="Comment here"
                              value={Commentdata.comment}
                              onChange={onChangecommentHandler}
                              name="comment"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Button
                        variant="primary"
                        type="submit"
                        className="btn-lg mt-2"
                      >
                        Post
                      </Button>
                    </Form>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          ) : (
            <div className="mt-3">
              <MessageAlert variant="danger">
                <Link to={"/login"}>Login to review</Link>
              </MessageAlert>
            </div>
          )}
          <h1>Reviews</h1>
          {ReviewLoading ? (
            <Loaderspin />
          ) : (
            <>
              {Productfound.reviews.map((review) => (
                <ListGroup variant="flush" className="mt-1" key={review._id}>
                  <Row>
                    <Col>
                      <ListGroup.Item>
                        <strong>{review.user.name}</strong>
                        <Rating Rating={review.rating} />
                        <Time time={review.createdAt} />
                        <p>{review.comment}</p>
                        {UserInfo._id === review.user._id ||
                        UserInfo.isAdmin === true ? (
                          <div>
                            <LinkContainer to={`/reviewEdit/${review._id}`}>
                              <Button
                                type="button"
                                variant="light"
                                className="btn-sm mx-4"
                              >
                                <FaEdit style={{ color: "green" }} />
                              </Button>
                            </LinkContainer>
                            <Button
                              variant="danger"
                              className="btn-sm mx-4"
                              onClick={() => DeleteComment(review._id)}
                            >
                              <FaTrash style={{ color: "white" }} />
                            </Button>
                          </div>
                        ) : (
                          <></>
                        )}
                      </ListGroup.Item>
                    </Col>
                  </Row>
                </ListGroup>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Productpage;
