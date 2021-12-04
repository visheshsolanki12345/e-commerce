import React from "react";
import "./orderSuccess.css";
import CancelIcon from '@mui/icons-material/Cancel';
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const OrderNotSuccess = () => {
  return (
    <div className="orderSuccessnot">
      <CancelIcon />

      <Typography>Your Order Not successfully </Typography>
      <Link to="/orders">Check Status</Link>
    </div>
  );
};

export default OrderNotSuccess;
