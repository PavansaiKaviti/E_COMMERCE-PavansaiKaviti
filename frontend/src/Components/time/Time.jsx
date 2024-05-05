import React from "react";

const Time = ({ time }) => {
  const timestamp = new Date(time);
  return <>{timestamp.toLocaleString()}</>;
};

export default Time;
