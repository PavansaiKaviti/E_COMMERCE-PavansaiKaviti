import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ Rating, Review }) => {
  return (
    <div className="rating">
      <span>
        {Rating >= 1 ? (
          <FaStar />
        ) : Rating >= 0.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {Rating >= 2 ? (
          <FaStar />
        ) : Rating >= 1.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {Rating >= 3 ? (
          <FaStar />
        ) : Rating >= 2.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {Rating >= 4 ? (
          <FaStar />
        ) : Rating >= 3.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {Rating >= 5 ? (
          <FaStar />
        ) : Rating >= 4.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span> {Review} Reviews</span>
    </div>
  );
};

export default Rating;
