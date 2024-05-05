import React, { useEffect } from "react";
import { Row, Col, ListGroup, Card, Image, Button } from "react-bootstrap";
import {
  useFetchOrderQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useDeliveryMutation,
} from "../../slices/OrderApiSlice";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loaderspin from "../../Components/Loader/Loaderspin";
import MessageAlert from "../../Components/message/MessageAlert";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import Time from "../../Components/time/Time";

const FinalOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: order, refetch, isLoading, error } = useFetchOrderQuery(id);
  const [PayOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const [Delivery, { isLoading: Dloading }] = useDeliveryMutation();
  const {
    data: paypal,
    isLoading: loadingPaypal,
    error: errorPaypal,
  } = useGetPaypalClientIdQuery();
  const { UserInfo } = useSelector((state) => state.auth);
  console.log(UserInfo);
  useEffect(() => {
    if (!errorPaypal && !loadingPaypal && paypal.client_id) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.client_id,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPaypal, errorPaypal]);

  const onApproveTest = async () => {
    await PayOrder({ id, details: { payer: {} } });
    refetch();
    toast.success("Payment Done");
  };
  const onApprove = (data, actions) => {
    return actions.finalOrder.capture().then(async function (details) {
      try {
        await PayOrder({ id, details });
        refetch();
        toast.success("Payment Done");
      } catch (error) {
        toast.error(error.data.message || error.error);
      }
    });
  };
  const onError = (error) => {
    toast.error(error.data.message || error.error);
  };
  const createOrder = (data, actions) => {
    return actions.finalOrder
      .create({
        purchase_units: [
          {
            amount: {
              value: finalOrder.totalPrice,
            },
          },
        ],
      })
      .then((oderId) => {
        return oderId;
      });
  };
  const deliverOrderHandler = async () => {
    try {
      await Delivery(id);
      refetch();
      toast.success("Order Delivered");
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loaderspin />
      ) : error ? (
        <MessageAlert variant="danger">
          {error.data.message || error.error}
        </MessageAlert>
      ) : (
        <Row>
          <Col xs={12} md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                {order ? (
                  <>
                    {order.isDelivered ? (
                      <h1>Order Delivered Successfully</h1>
                    ) : (
                      <h1>Order Placed Successfully</h1>
                    )}
                    <p>
                      <strong>Id: {order._id} </strong>
                    </p>
                  </>
                ) : (
                  <h1>Order not Placed </h1>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h1>Payment: </h1>
                <p>
                  <strong>Method: </strong>
                  {order.paymentMethod}
                </p>
                <MessageAlert variant={order.isPaid ? "success" : "danger"}>
                  <strong>Payment: </strong>
                  {order.isPaid ? (
                    <>
                      <strong>Paid</strong> at <Time time={order.paidAt} />
                    </>
                  ) : (
                    "Not Paid"
                  )}
                </MessageAlert>
              </ListGroup.Item>
              <ListGroup.Item>
                <h1>Delivery: </h1>
                <MessageAlert
                  variant={order.isDelivered ? "success" : "danger"}
                >
                  <strong>Status: </strong>{" "}
                  {order.isDelivered ? (
                    <>
                      <strong>Delivered</strong> at{" "}
                      <Time time={order.deliveredAt} />
                    </>
                  ) : (
                    "Not Delivered"
                  )}
                </MessageAlert>
              </ListGroup.Item>
              <ListGroup.Item>
                <h1>Shipping:</h1>
                <p>
                  <strong>FullName: </strong>
                  {order.user.name}
                </p>
                <p>
                  <strong>Email: </strong>
                  {order.user.email || order.shippingAddress.Email}
                </p>
                <p>
                  <strong>Phone: </strong>
                  {order.shippingAddress.Phone}
                </p>
                <p>
                  <strong>Address: </strong> {order.shippingAddress.Address},{" "}
                  {order.shippingAddress.City}, {order.shippingAddress.State},{" "}
                  {order.shippingAddress.Zip}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h1>Oder Items:</h1>
                <Card>
                  {order.cartItems.map((x, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2} lg={1}>
                          <Image src={x.image} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${x.product}`}>{x.name}</Link>
                        </Col>
                        <Col md={4}>
                          {x.qty} X ${x.price} = ${x.qty * x.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </Card>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <ListGroup>
              <ListGroup.Item>
                <h1>Oder Summary</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>price:</strong>
                  </Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
                <Row xs={12}>
                  <Col>
                    <strong>Shipping:</strong>
                  </Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>
                    <strong>Tax:</strong>
                  </Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>
                    <strong>Total:</strong>
                  </Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loaderspin />}
                  {isPending ? (
                    <Loaderspin />
                  ) : (
                    <div>
                      <Button
                        onClick={onApproveTest}
                        style={{ marginBottom: "10px" }}
                      >
                        Test Pay
                      </Button>
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}
              {Dloading && <Loaderspin />}
              {UserInfo &&
                UserInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverOrderHandler}
                    >
                      Mark as Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default FinalOrder;
