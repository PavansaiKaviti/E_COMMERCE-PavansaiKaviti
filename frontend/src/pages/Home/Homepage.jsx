import { Col, Row } from "react-bootstrap";
import Productcard from "../../Components/Product/Productcard";
import { useGetProductsQuery } from "../../slices/ProductApislice";
import Loaderspin from "../../Components/Loader/Loaderspin";
import MessageAlert from "../../Components/message/MessageAlert";
import { Link, useParams } from "react-router-dom";
import Paginate from "../../Components/Paginate/Paginate";
import Carouselproduct from "../../Components/carousel/Carouselproduct";
const Homepage = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber,
    keyword,
  });

  return (
    <>
      {!keyword ? (
        <Carouselproduct />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loaderspin />
      ) : error ? (
        <MessageAlert variant="danger">
          <h2>Error:{error.error}</h2>
        </MessageAlert>
      ) : (
        <div>
          <h1>Latest Products </h1>
          <Row>
            {data.products.map((items) => {
              return (
                <Col key={items._id} sm={12} md={6} lg={3} xl={3}>
                  <Productcard product={items} />
                </Col>
              );
            })}
          </Row>
          <Paginate
            page={data.page}
            pages={data.pages}
            keyword={keyword ? keyword : " "}
          />
        </div>
      )}
    </>
  );
};

export default Homepage;
