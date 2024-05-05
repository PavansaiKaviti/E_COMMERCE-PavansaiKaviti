import React from "react";
import { Carousel, Image } from "react-bootstrap";
import { useTopProductsQuery } from "../../slices/ProductApislice";
import { Link } from "react-router-dom";
import Loaderspin from "../Loader/Loaderspin";
import MessageAlert from "../message/MessageAlert";

const Carouselproduct = () => {
  const { data, isLoading, error } = useTopProductsQuery();
  return (
    <>
      {isLoading ? (
        <Loaderspin />
      ) : error ? (
        <MessageAlert variant="danger">
          {error.error || error.data.message}
        </MessageAlert>
      ) : (
        <>
          <Carousel pause="hover" className="bg-primary mb-4">
            {data.map((product) => (
              <Carousel.Item key={product._id}>
                <Link to={`/product/${product._id}`}>
                  <Image src={product.image} alt={product.name} fluid />
                  <Carousel.Caption className="carousel-caption">
                    <h3>
                      {product.name} (${product.price})
                    </h3>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
        </>
      )}
    </>
  );
};

export default Carouselproduct;
