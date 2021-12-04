import { Rating } from "@material-ui/lab";
import React from "react";
import profilePng from "../../Components/images/Profile.png";


 //========================= ReviewCard Func  ================================//
const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };


   //========================= Main Root  ================================//
  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
      <p>{review.createdAt}</p>
    </div>
  );
};

export default ReviewCard;
