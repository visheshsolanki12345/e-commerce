import React, { Fragment } from "react";
import "./Shipping.css";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import CheckoutSteps from "../Cart/CheckoutSteps";
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import Loader from "../Loader/Loader";
import Carousel from "react-elastic-carousel";
import { Button } from "@material-ui/core";
import SaveShippingAddress from "./SaveShippingAddress";
import { Link } from "react-router-dom";

const Shipping = ({ history }) => {
  var { shippingInfo, shiploading } = useSelector((state) => state.shiping);
  // // console.log('shippingInfo', shippingInfo && shippingInfo)

  const shippingSubmit = (e) => {
    const data = { 'id': e }
    localStorage.setItem("shippingInfo", JSON.stringify(data));
    history.push("/order/confirm");
  };

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 3 },
  ];

  return (
    <Fragment>
      {
        shiploading ?
          (
            <Loader />
          ) :
          shippingInfo && shippingInfo.length === 0 ?
            (
              <SaveShippingAddress />
            )
            :
            (
              <Fragment>
                <MetaData title="Shipping Details" />
                <CheckoutSteps activeStep={0} />
                <div className="shippingContainer">
                  <Button variant="contained"><Link to="/addshippingaddress">Add New Address</Link></Button>
                  <h2 className="shippingHeading">Select Shipping Address</h2>
                  <Carousel breakPoints={breakPoints}>
                  
                    {
                      shippingInfo && shippingInfo.data.map((e, i) =>
                        <form
                          className="shippingForm" key={e.id}
                        ><h1>{i+1}</h1>
                          <div>
                            <PersonIcon />
                            <input
                              type="text"
                              placeholder="Name"
                              value={e.name}
                            />
                          </div>
                          <div>
                            <AccessibilityNewIcon />
                            <input
                              type="text"
                              placeholder="Landmark"
                              value={e.landmark}
                            />
                          </div>
                          <div>
                            <LocationOnIcon />
                            <input
                              type="text"
                              placeholder="Location"
                              value={e.location}
                            />
                          </div>
                          <div>
                            <HomeIcon />
                            <input
                              type="text"
                              placeholder="Full Address"
                              value={e.addresh}
                            />
                          </div>

                          <div>
                            <LocationCityIcon />
                            <input
                              type="text"
                              placeholder="City"
                              value={e.city}
                            />
                          </div>

                          <div>
                            <PinDropIcon />
                            <input
                              type="number"
                              placeholder="Pin Code"
                              value={e.zipcode}
                            />
                          </div>

                          <div>
                            <PhoneIcon />
                            <input
                              type="number"
                              placeholder="Phone Number"
                              value={e.zipcode}
                              size="10"
                            />
                          </div>
                          <div>
                            <PublicIcon />
                            <input
                              type="text"
                              placeholder="Country"
                              value={e.country}
                            />
                          </div>
                          <div>
                            <TransferWithinAStationIcon />
                            <input
                              type="text"
                              placeholder="State"
                              value={e.state}
                            />
                          </div>

                          <input
                            type="button"
                            onClick={() => shippingSubmit(e.id)}
                            value="Continue"
                            className="shippingBtn"
                          />
                        </form>
                      )
                    }

                  </Carousel>
                </div>
              </Fragment>
            )}
    </Fragment>
  )
}

export default Shipping;
