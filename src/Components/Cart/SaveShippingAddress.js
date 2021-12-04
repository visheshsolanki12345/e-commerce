import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo, showAddresh } from "../../actions/cartAction";
import MetaData from "../layout/MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import Loader from "../Loader/Loader";

const SaveShippingAddress = ({ history }) => {
    const dispatch = useDispatch();

    const alert = useAlert();
    var { shiploading } = useSelector((state) => state.shiping);
    // // console.log('shippingInfo', shippingInfo && shippingInfo)

    const [name, setName] = useState("");
    const [addresh, setAddresh] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [mobile, setMobile] = useState("");
    const [landmark, setLandmark] = useState("");
    const [location, setLocation] = useState("");

    const shippingSubmit = (e) => {
        if (mobile.length < 10 || mobile.length > 10) {
            alert.error("Phone Number should be 10 digits Long");
            return;
        }
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("addresh", addresh);
        myForm.set("city", city);
        myForm.set("state", state);
        myForm.set("country", country);
        myForm.set("zipcode", zipcode);
        myForm.set("mobile", mobile);
        myForm.set("landmark", landmark);
        myForm.set("location", location);
        // console.log('myForm', myForm)
        dispatch(saveShippingInfo(myForm));
        dispatch(showAddresh())
        history.push("/shipping");
    };
    
    return (
        <Fragment>
            {
                shiploading ?
                    (
                        <Loader />
                    ) : (
                        <Fragment>
                            <MetaData title="Shipping Details" />
                            <div className="shippingContainer">
                                <div className="shippingBox" id="container">
                                    <h2 className="shippingHeading">New Shipping Details</h2>
                                    <form
                                        className="shippingForm"
                                        encType="multipart/form-data"
                                        onSubmit={shippingSubmit}
                                    >
                                        <div>
                                            <PersonIcon />
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <AccessibilityNewIcon />
                                            <input
                                                type="text"
                                                placeholder="Landmark"
                                                required
                                                value={landmark}
                                                onChange={(e) => setLandmark(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <LocationOnIcon />
                                            <input
                                                type="text"
                                                placeholder="Location"
                                                required
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <HomeIcon />
                                            <input
                                                type="text"
                                                placeholder="Full Address"
                                                required
                                                value={addresh}
                                                onChange={(e) => setAddresh(e.target.value)}
                                            />
                                        </div>

                                        <div>
                                            <LocationCityIcon />
                                            <input
                                                type="text"
                                                placeholder="City"
                                                required
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                            />
                                        </div>

                                        <div>
                                            <PinDropIcon />
                                            <input
                                                type="number"
                                                placeholder="Pin Code"
                                                required
                                                value={zipcode}
                                                onChange={(e) => setZipcode(e.target.value)}
                                            />
                                        </div>

                                        <div>
                                            <PhoneIcon />
                                            <input
                                                type="number"
                                                placeholder="Phone Number"
                                                required
                                                value={mobile}
                                                onChange={(e) => setMobile(e.target.value)}
                                                size="10"
                                            />
                                        </div>
                                        <div>
                                            <PublicIcon />

                                            <select
                                                required
                                                value={country}
                                                onChange={(e) => setCountry(e.target.value)}
                                            >
                                                <option value="">Country</option>
                                                {Country &&
                                                    Country.getAllCountries().map((item) => (
                                                        <option key={item.isoCode} value={item.isoCode}>
                                                            {item.name}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>

                                        {country && (
                                            <div>
                                                <TransferWithinAStationIcon />

                                                <select
                                                    required
                                                    value={state}
                                                    onChange={(e) => setState(e.target.value)}
                                                >
                                                    <option value="">State</option>
                                                    {State &&
                                                        State.getStatesOfCountry(country).map((item) => (
                                                            <option key={item.isoCode} value={item.isoCode}>
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                </select>
                                            </div>
                                        )}
                                        <input
                                            type="submit"
                                            value="Save Address"
                                            className="shippingBtn"
                                            disabled={state ? false : true}
                                        />
                                    </form>
                                </div>
                            </div>
                        </Fragment>
                    )}
        </Fragment>
    )
}
export default SaveShippingAddress
