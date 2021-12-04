import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import avtar from '../../images/avtar.png'
import { logout } from "../../../actions/userActions";
import { useDispatch } from "react-redux";
import Loader from "../../Loader/Loader";
import { useSelector } from "react-redux";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';


const UserOptions = ({ user }) => {

  //========================= Varibale Hooks ================================//
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();

  //========================= State Data ================================//
  const { cartItems } = useSelector((state) => state.cart);
  // // console.log('cart', cartItems)

  //========================= deshbord Icons ================================//
  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <LocalShippingIcon />, name: "Tracking", func: track },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems && cartItems.count ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems && cartItems.count? cartItems.count : 0})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];


  //========================= Check Admin ================================//
  if (user && user.isAdmin === false) {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  

   //========================= Icons Function ================================//
  function dashboard() {
    history.push("/admin/dashboard");
  }
  function orders() {
    history.push("/orders");
  }
  function account() {
    history.push("/account");
  }
  function cart() {
    history.push("/cart");
  }
  function track() {
    history.push("/tracking");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }


  //========================= Main Root ================================//
  return (
    <Fragment>
      {user && user.loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Backdrop open={open} style={{ zIndex: "10" }} />
          <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            style={{ zIndex: "11" }}
            open={open}
            direction="down"
            className="speedDial"
            icon={
              <img
                className="speedDialIcon"
                src={user && user.userData.userImage ? user.userData.userImage : avtar}
                // src={avtar}
                alt="Profile"
              />
            }
          >
            {options.map((item, i) => (
              <SpeedDialAction
                key={i}
                icon={item.icon}
                tooltipTitle={item.name}
                onClick={item.func}
                // tooltipOpen={window.innerWidth <= 600 ? true : false}
                tooltipOpen={true}
              />
            ))}
          </SpeedDial>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UserOptions;
