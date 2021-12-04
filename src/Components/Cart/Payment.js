import './payment.css'
import React, { Fragment, useState } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import { payTemOrder } from "../../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";


const Payment = ({ history }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState()
  const { shippingInfo } = useSelector((state) => state.shiping);
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


  const PaymentPaytem = () => {
    var x = Math.floor((Math.random() * 1000) + 1000)
    dispatch(payTemOrder(x, data.id))
    localStorage.removeItem("shippingInfo");
    history.push("/orders");
  };

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <div className="paymentForm" >
          <Typography>Go Payment Getway</Typography>
        </div>
        <button className="button-64" ><span class="text">Go With RazorPay </span></button>
        <button className="button-63"  onClick={PaymentPaytem}><span class="text">Go With PayTem </span></button>
      </div>
    </Fragment>
  );
};

export default Payment;
