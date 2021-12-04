import React, { useEffect } from 'react'
import Home from './Components/Home/Home'
import Header from './Components/layout/Header/Header'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Footer from './Components/layout/Footer/Footer'
import ProductDetails from './Components/Product/ProductDetails'
import "./App.css"
import Products from './Components/Product/Products'
import Search from './Components/Product/Search';
import LoginSignUp from './Components/User/LoginSignUp';
import store from './Store'
import { loadUser } from './actions/userActions';
import WebFont from "webfontloader";
import UserOptions from './Components/layout/Header/UserOptions';
import { useSelector } from 'react-redux';
import Profile from './Components/User/Profile'
import ProtectedRoute from "./Components/Route/ProtectedRoute"
import UpdateProfile from './Components/User/UpdateProfile'
import UpdatePassword from './Components/User/UpdatePassword'
import Cart from './Components/Cart/Cart';
import Shipping from './Components/Cart/Shipping';
import SaveShippingAddress from './Components/Cart/SaveShippingAddress';
import ConfirmOrder from './Components/Cart/ConfirmOrder';
import { showAddresh, showCartData } from './actions/cartAction';
import Payment from './Components/Cart/Payment';
import OrderSuccess from './Components/Cart/OrderSuccess';
import OrderNotSuccess from './Components/Cart/OrderNotSuccess';
import AllOrders from './Components/Order/AllOrders'
import { showAllOrders } from './actions/orderActions';
import Tracking from './Components/Tracking/Tracking';
import OrderDetails from './Components/Order/OrderDetails';




const App = () => {
   //========================= State user data ================================//
  const { isAuthenticated, user } = useSelector((state) => state.user);


   //========================= useEffect ================================//
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    if(localStorage.getItem('user-details')){
      const userInfo = JSON.parse(localStorage.getItem('user-details'))
      store.dispatch(loadUser(userInfo && userInfo.access))
      store.dispatch(showCartData())
      store.dispatch(showAddresh())
      store.dispatch(showAllOrders())
    }
  }, [])
  

   //========================= Main Root ================================//
  return (
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route exact path="/product/:id" component={ProductDetails} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/products/:keyword" component={Products} />
          <Route exact path="/Search" component={Search} />
          <Route exact path="/login" component={LoginSignUp} />
          <ProtectedRoute exact path="/account" component={Profile} />
          <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
          <ProtectedRoute exact path="/password/update" component={UpdatePassword} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/shipping" component={Shipping} />
          <ProtectedRoute exact path="/addshippingaddress" component={SaveShippingAddress} />
          <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
          <ProtectedRoute exact path="/payment" component={Payment} />
          <ProtectedRoute exact path="/ordersuccess" component={OrderSuccess} />
          <ProtectedRoute exact path="/ordernotsuccess" component={OrderNotSuccess} />
          <ProtectedRoute exact path="/orders" component={AllOrders} />
          <ProtectedRoute exact path="/tracking" component={Tracking} />
          <ProtectedRoute exact path="/orderdetails/:id" component={OrderDetails} />
        </Switch>
        {/* <Footer /> */}
      </Router>
  )
}

export default App
