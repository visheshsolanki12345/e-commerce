import React, { Fragment, useEffect, useState } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import { getOrderDetails } from '../../actions/orderActions'
import Loader from '../Loader/Loader'

const OrderDetails = (props) => {
  //========================= Varibale Hooks ================================//
  const { order, loadingOrder } = useSelector((state) => state.order);
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const alert = useAlert();

  //========================= items Func ================================//
   const items = async () => {
    // console.log(itemFind.quantity)
    if (await order) {
      setData(order.product)
    }
    return
  }

  //========================= call items Func ================================//
  if (order && order.length !== 0) {
    if (order) {
      items()
    }
  }

  //========================= useEffect ================================//
  useEffect(() => {
    dispatch(getOrderDetails(props.match.params.id));
  }, [dispatch, alert, props.match.params.id]);
  // console.log('yes.....................', data)


  //========================= Main Root ================================//
  return (
    <Fragment>
      {loadingOrder ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{data && data.id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.customer && order.customer.mobile}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.customer &&
                      `${order.customer.addresh}, ${order.customer.city}, ${order.customer.state}, ${order.customer.zipcode}, ${order.customer.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentHistory &&
                        order.paymentHistory.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentHistory &&
                      order.paymentHistory.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalamount && order.totalamount}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.status && order.status === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.status && order.status}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">         
              <div>
                <img src={data && data.product_image} alt="Product" />
                <Link to={`/product/${data && data.id}`}>
                  {data && data.title}
                </Link>{" "}
                <span>
                  {order.quantity} X ₹ {data && data.selling_price} ={" "}
                  <b>₹{data && data.selling_price * order.quantity}</b>
                </span>
              </div>
              
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
