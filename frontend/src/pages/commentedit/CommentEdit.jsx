import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../Components/Form/FormContainer";
import {
  useEditReviewMutation,
  useGetReviewQuery,
} from "../../slices/ReviewApi";
import Loaderspin from "../../Components/Loader/Loaderspin";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MessageAlert from "../../Components/message/MessageAlert";

const CommentEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Commentdata, setcommentdata] = useState({ rating: 0, comment: "" });
  const { data, isLoading, error } = useGetReviewQuery(id);
  const [EditReview] = useEditReviewMutation();
  const onEditComment = (e) => {
    setcommentdata({ ...Commentdata, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (data) {
      setcommentdata({ rating: data.rating, comment: data.comment });
    }
  }, [data]);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const res = await EditReview({ id, Commentdata }).unwrap();
      toast.success(res.message);
      navigate(`/product/${data.product}`);
    } catch (error) {}
    toast.error(error.data.message || error.error);
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
          <h1>Edit Comment</h1>
          <Form onSubmit={onSubmitHandler}>
            <Form.Group>
              <Form.Label className="mt-3">Rating:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Rating/5"
                value={Commentdata.rating}
                name="rating"
                onChange={onEditComment}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-3">Comment:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Comment here"
                value={Commentdata.comment}
                name="comment"
                onChange={onEditComment}
              ></Form.Control>
            </Form.Group>
            <Button className="mt-3" type="submit">
              Save Changes
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default CommentEdit;
