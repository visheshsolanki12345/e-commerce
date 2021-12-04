import React, { Fragment, useState } from 'react'
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom'
import './Tracking.css'
import { Rating } from "@material-ui/lab";
// import { useAlert } from 'react-alert'
import { useSelector, useDispatch } from 'react-redux';
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Button, Typography } from '@material-ui/core';
import { orderdelete, showAllOrders } from '../../actions/orderActions'
import { useAlert } from 'react-alert'
import CancelIcon from '@mui/icons-material/Cancel';
// import { Box } from '@mui/system';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


 //========================= Style ================================//
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 280,
    height: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Tracking = () => {

    //========================= State order data ================================//
    const { loadingOrder, order } = useSelector((state) => state.order);

    //========================= Varibale Hooks ================================//
    const alert = useAlert()
    // const [data, setData] = useState([])
    const dispatch = useDispatch()
    const [cancelOrderTitle, setCancelOrderTitle] = useState()
    const [open, setOpen] = useState(false);
    const [idcancel, setIdcancel] = useState();
    const cat = 'Cancel'
    const cat2 = 'Delivered'

    //========================= toggle handleOpen ================================//
    const handleOpen = (id) => {
        setOpen(true);
        setIdcancel(id)
    }

    //========================= toggle handleClose ================================//
    const handleClose = () => setOpen(false);


    //========================= deleteOrder func ================================//
    const deleteOrder = (id) => {
        dispatch(orderdelete(id, cancelOrderTitle))
        if (localStorage.getItem('user-details')) {
            dispatch(showAllOrders())
            // setQuantity(1)
        }
        handleClose()
        alert.success("Cancel Order Successfull..");
        setCancelOrderTitle("")
        setIdcancel("")
    }

    
    //========================= main root ================================//
    return (
        <Fragment>
            {loadingOrder ?
                (
                    <Loader />
                ) :
                order && (order.length === 0 || order.message === "no order") ?
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
                            <div>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <div className='cancelbutton'>
                                            <CancelIcon className='cancel' style={{ height: '50px', width: '50px', color: 'tomato' }} onClick={() => handleClose()} />
                                        </div>
                                        <Typography id="modal-modal-title" variant="h6" component="h2" align='center' color='red'>
                                            Cancel Your Order
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            <div className='textArea'>
                                                <textarea type="text" value={cancelOrderTitle} onChange={(e) => setCancelOrderTitle(e.target.value)} />

                                            </div>
                                            <div className='cancelbutton'>
                                            <button type="button" onClick={() => deleteOrder(idcancel)}> Cancel Order</button>
                                            </div>
                                        </Typography>
                                    </Box>
                                </Modal>
                            </div>
                            {
                                order && order.length !== 0 && order.status !== 202 && order
                                    .filter(product => product.status !== cat && product.status !== cat2)
                                    .map(product =>
                                        <div className="container">
                                            <article className="card">
                                                <header className="card-header">
                                                    <Link style={{ textDecoration: 'none' }} to={`/orders/`}>
                                                        <h3>Orders / My Orders</h3>
                                                    </Link>
                                                </header>
                                                <div className="card-body">

                                                    <h3>Order ID : {product.id}</h3>
                                                    <article className="card">
                                                        <div className="card-body row">
                                                            <div className="col"> <strong>Estimated Delivery time:</strong> <br /> {product.Estimated_delivery_time} </div>
                                                            <div className="col"> <strong>Shipping BY:</strong> <br /> {product.shipping_ny} </div>
                                                            <div className="col"> <strong>Status:</strong> <br /> {product.status} </div>
                                                            <div className="col"> <strong>Tracking #:</strong> <br /> {product.id} </div>
                                                        </div>
                                                    </article>
                                                    {/* Panding */}
                                                    {
                                                        product.status === 'Pending' ?
                                                            <div className="track">
                                                                <div className="step"> <span className="icon"> <i className="fa fa-check" /> </span> <span className="text">Order confirmed</span> </div>
                                                                <div className="step"> <span className="icon"> </span> <span className="text"> Picked by courier</span> </div>
                                                                <div className="step"> <span className="icon"> <i className="fa fa-truck" /> </span> <span className="text"> On the way </span> </div>
                                                                <div className="step"> <span className="icon"> <i className="fa fa-box" /> </span> <span className="text">Ready for pickup</span> </div>
                                                            </div>
                                                            :
                                                            <>
                                                            </>
                                                    }


                                                    {/* Confirm */}
                                                    {
                                                        product.status === 'Confirm' ?
                                                            <div className="track">
                                                                <div className="step active"> <span className="icon"> <i className="fa fa-check" /> </span> <span className="text">Order confirmed</span> </div>
                                                                <div className="step"> <span className="icon"> </span> <span className="text"> Picked by courier</span> </div>
                                                                <div className="step"> <span className="icon"> <i className="fa fa-truck" /> </span> <span className="text"> On the way </span> </div>
                                                                <div className="step"> <span className="icon"> <i className="fa fa-box" /> </span> <span className="text">Ready for pickup</span> </div>
                                                            </div>
                                                            :
                                                            <>
                                                            </>
                                                    }
                                                    {/* Confirm to Picked */}
                                                    {
                                                        product.status === 'Picked by courier' ?

                                                            <div className="track">
                                                                <div className="step active"> <span className="icon"> <i className="fa fa-check" /> </span> <span className="text">Order confirmed</span> </div>
                                                                <div className="step active"> <span className="icon"> <i className="fa fa-user" /> </span> <span className="text"> Picked by courier</span> </div>
                                                                <div className="step"> <span className="icon"> <i className="fa fa-truck" /> </span> <span className="text"> On the way </span> </div>
                                                                <div className="step"> <span className="icon"> <i className="fa fa-box" /> </span> <span className="text">Ready for pickup</span> </div>
                                                            </div>
                                                            :
                                                            <>
                                                            </>
                                                    }
                                                    {/* on the way */}
                                                    {
                                                        product.status === 'On The Way' ?

                                                            <div className="track">
                                                                <div className="step active"> <span className="icon"> <i className="fa fa-check" /> </span> <span className="text">Order confirmed</span> </div>
                                                                <div className="step active"> <span className="icon"> <i className="fa fa-user" /> </span> <span className="text"> Picked by courier</span> </div>
                                                                <div className="step active"> <span className="icon"> <i className="fa fa-truck" /> </span> <span className="text"> On the way </span> </div>
                                                                <div className="step"> <span className="icon"> <i className="fa fa-box" /> </span> <span className="text">Ready for pickup</span> </div>
                                                            </div>
                                                            :
                                                            <>
                                                            </>
                                                    }
                                                    {/* on the way */}
                                                    {
                                                        product.status === 'Ready for pickup' ?

                                                            <div className="track">
                                                                <div className="step active"> <span className="icon"> <i className="fa fa-check" /> </span> <span className="text">Order confirmed</span> </div>
                                                                <div className="step active"> <span className="icon"> <i className="fa fa-user" /> </span> <span className="text"> Picked by courier</span> </div>
                                                                <div className="step active"> <span className="icon"> <i className="fa fa-truck" /> </span> <span className="text"> On the way </span> </div>
                                                                <div className="step active"> <span className="icon"> <i class="fa fa-smile-o"></i> </span> <span className="text">Ready for pickup</span> </div>
                                                            </div>
                                                            :
                                                            <>
                                                            </>
                                                    }

                                                    <div className="row">
                                                        <figure className="itemside ">
                                                            <div className="aside"><img src={product.product.product_image} alt={product.product.title} className="img-sm border" /></div>
                                                            <figcaption className="info align-self-center">
                                                                <p className="title"><Link style={{ textDecoration: 'none' }} to={`/product/${product.product.id}`}> {product.product.title} </Link><br /> Brand : {product.product.brand}</p> <div>
                                                                    <Rating
                                                                        value={product.product.rating}
                                                                        readOnly={true}
                                                                        precision={0.5}
                                                                    />
                                                                </div> <span className="text-muted" style={{ fontWeight: '700' }}> Total Amount ₹{product.totalamount} /- </span>
                                                            </figcaption>
                                                        </figure>
                                                    </div>
                                                    <div className='cancelbtn'>
                                                        <Button type="button" onClick={() => handleOpen(product.id)} variant="contained" style={{ background: "tomato" }} startIcon={<CancelIcon />}>Order Cancel</Button>
                                                    </div>
                                                    <div>
                                                    </div>
                                                </div>
                                            </article>
                                        </div>
                                    )}
                        </Fragment>
                    )}
        </Fragment>);
}


export default Tracking
