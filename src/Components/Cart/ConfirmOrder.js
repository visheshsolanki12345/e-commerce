import React, { Fragment, useState } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const ConfirmOrder = ({ history }) => {
  const [data, setData] = useState()
  const { cartItems } = useSelector((state) => state.cart);
  const { shippingInfo } = useSelector((state) => state.shiping);
  const { user } = useSelector((state) => state.user);
  const userInfo = JSON.parse(localStorage.getItem('shippingInfo'))


  const items = async () => {
    const itemFind = await shippingInfo.data.find(x => x.id === userInfo.id)
    // // console.log('itemfind', itemFind)
    if (itemFind) {
      setData(itemFind)
    }
    return
  }
  if (shippingInfo && shippingInfo.length !== 0) {
    if (shippingInfo) {
      items()
    }
  }

  // // console.log('userInfo', data)


  const address = `${data && data.addresh}, ${data && data.city}, ${data && data.state}, ${data && data.pinCode}, ${data && data.country}`;

  const proceedToPayment = () => {
    history.push("/payment");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{data && data.mobile}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.data.map((item) => (
                  <div key={item.id}>
                    <img src={item.product.product_image} alt="Product" />
                    <Link to={`/product/${item.id}`}>
                      {item.title}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹ {item.product.selling_price} ={" "}
                      <b>₹{item.product.selling_price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{cartItems && cartItems.amount}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{cartItems && cartItems.ShippingAmmount}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{cartItems && cartItems.gst}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{cartItems && cartItems.totalamount}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
