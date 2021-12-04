import React, { Fragment, useEffect } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { incDec, Decriment, showCartData, deleteItem } from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";



const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.productDetails)
  const { cartItems, loadingCart } = useSelector((state) => state.cart);
  // console.log('cartItems', cartItems)

  const increaseQuantity = (id, quantity) => {
    const newQty = quantity;
    if (product.stock <= quantity) {
      return;
    }
    dispatch(incDec(id, newQty));
    if (localStorage.getItem('user-details')) {
      dispatch(showCartData())
    }
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity;
    if (1 >= quantity) {
      return;
    }
    dispatch(Decriment(id, newQty));
    if (localStorage.getItem('user-details')) {
      dispatch(showCartData())
    }
  };

  const deleteCartItems = (id) => {
    dispatch(deleteItem(id));
    if (localStorage.getItem('user-details')) {
      dispatch(showCartData())
    }
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  useEffect(() => {
    if (localStorage.getItem('user-details')) {
      dispatch(showCartData())
    }
  }, [dispatch])

  return (
    <Fragment>
      {
        loadingCart ?
          (
            <Loader />
          ) :
          cartItems && (cartItems.length === 0 || cartItems.message === 'Cart is Empty.')?
            (
              <div className="emptyCart">
                <RemoveShoppingCartIcon />

                <Typography>No Product in Your Cart</Typography>
                <Link to="/products">View Products</Link>
              </div>
            )
            :
            (
              <Fragment>
                <div className="cartPage">
                  <div className="cartHeader">
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>Subtotal</p>
                  </div>

                  {cartItems && 
                    cartItems.data.map((item) => (
                      <div className="cartContainer" key={item.id}>
                        <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                        <div className="cartInput">
                          <button
                            onClick={() =>
                              decreaseQuantity(item.id, item.quantity)
                            }
                          >
                            -
                          </button>
                          <input type="number" value={item.quantity} readOnly />
                          <button
                            onClick={() =>
                              increaseQuantity(
                                item.id,
                                item.quantity,
                                item.stock
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                        <p className="cartSubtotal">{`₹${item.product.selling_price * item.quantity}`}</p>
                      </div>
                    ))}

                  <div className="cartGrossProfit">
                    <div></div>
                    <div className="cartGrossProfitBox">
                      <p>Gross Total</p>
                      <p>{`₹${cartItems && cartItems.totalamount}`}</p>
                    </div>
                    <div></div>
                    <div className="checkOutBtn">
                      <button onClick={checkoutHandler}>Check Out</button>
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
    </Fragment>
  );
};

export default Cart;
