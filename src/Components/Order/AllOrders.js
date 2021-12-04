import './AllOrders.css'
import React, { useState, Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../Loader/Loader';
import 'react-accessible-accordion/dist/fancy-example.css';
import { Rating } from "@material-ui/lab";
import { useSelector } from 'react-redux'
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



function AllOrders() {

    //========================= Hooks variables ================================//
    const { loadingOrder } = useSelector((state) => state.order);
    const [data2, setData2] = useState();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    //========================= useEffect ================================//
    useEffect(() => {
        getData()
    }, [])


    //========================= Find Category ================================//
    const filterItem = (category) => {
        if (category === "All") {
            setData(data2)
            return;
        }
        const updatelist = data2.filter((curElem) => {
            return curElem.status === category
        })
        if (updatelist.length !== 0) {
            setData(updatelist)
        } else {
            setData(data2)
        }
    }

    //========================= Get All Order Data ================================//
    const getData = async () => {
        try {
            setLoading(true)
            const userInfo = JSON.parse(localStorage.getItem('user-details'))
            await fetch("/api/orders/", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userInfo.access}`
                },
                // body: JSON.stringify(item)
            }).then((result) => {
                // // console.log("Result", result.status)
                result.json().then((resp) => {
                    // // console.log(resp)
                    setData(resp)
                    setData2(resp)
                })
            })
            setLoading(false)

        } catch (err) {

        }
    }

    //========================= Main root ================================//
    return (
        <Fragment>
            {loadingOrder || loading?
                (
                    <Loader />
                ) :
                data && data.length === 0 ?
                    (
                        <div className="emptyCart">
                            <RemoveShoppingCartIcon />

                            <Typography>No Product in Your Cart</Typography>
                             <Link style={{ textDecoration: 'none' }} to="/products">View Products</Link>
                        </div>
                    )
                    :
                    (
                        <Fragment>
                            <div >
                                <div className=''>
                                    <div className=''>
                                        <div className='disc'>
                                            <button className='buttons' onClick={() => filterItem('All')}>All</button>
                                            <button className='buttons' onClick={() => filterItem('Pending')}>Pending</button>
                                            <button className='buttons' onClick={() => filterItem('Cancel')}>Cancel</button>
                                            <button className='buttons' onClick={() => filterItem('Delivered')}>Delivered</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                data && data.map((product) =>
                                    <div className=''>
                                        <div className="dis" key={product.id}>

                                            <div className='proimage'>
                                                <img src={product.product.product_image} alt={product.product.title} />
                                            </div>

                                            <div className='lis'>
                                                 <Link style={{ textDecoration: 'none' }} to={`/orderdetails/${product.id}`}>
                                                    <h5 >{product.product.title}</h5>
                                                </Link>
                                                <p> Brand: {product.product.brand}</p>
                                                <p>Price: ₹ {product.product.selling_price}</p>
                                                {product.product.stock > 1 ?
                                                    <p style={{ color: 'green', fontWeight: '700' }}>Stock: IN STOCK </p>

                                                    : <p style={{ color: 'red', fontWeight: '700' }}>Stock: Out of Stock </p>}
                                                <Rating
                                                    value={product.product.rating}
                                                    readOnly={true}
                                                    precision={0.5}
                                                />{" "}
                                                <span> ({product.product.numReviews} Reviews) </span>
                                                <p style={{ color: '#DE13B3', fontWeight: '700' }}>Status: {product.status} </p>

                                            </div>

                                            <div className='accc'>
                                                <div>
                                                    <Accordion>
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1a-content"
                                                            id="panel1a-header"
                                                        >
                                                            <Typography>Order Details</Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <Typography>
                                                                <p style={{ fontWeight: '700' }}>Order ID: {product.id}</p>
                                                                <p style={{ fontWeight: '700' }}>Amount: ₹ {product.totalamount}</p>
                                                                <p style={{ fontWeight: '700' }}>Quantity: {product.quantity}</p>
                                                                <p style={{ fontWeight: '700' }}>Order Data: {product.ordered_date}</p>
                                                                <p style={{ fontWeight: '700' }}>Order End: {product.deliveryAt}</p>
                                                            </Typography>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                    <Accordion>
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1a-content"
                                                            id="panel1a-header"
                                                        >
                                                            <Typography>Address</Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <Typography>
                                                            <p style={{ fontWeight: '700' }}>Name: {product.customer.name}</p>
                                                            <p style={{ fontWeight: '700' }}>Location: {product.customer.location}</p>
                                                            <p style={{ fontWeight: '700' }}>City: {product.customer.city}</p>
                                                            <p style={{ fontWeight: '700' }}>Zipcode: {product.customer.zipcode}</p>
                                                            <p style={{ fontWeight: '700' }}>State: {product.customer.state}</p>
                                                            <p style={{ fontWeight: '700' }}>Landmark: {product.customer.landmark}</p>
                                                            <p style={{ fontWeight: '700' }}>Street: {product.customer.street}</p>
                                                            </Typography>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                    <Accordion>
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1a-content"
                                                            id="panel1a-header"
                                                        >
                                                            <Typography>Payment History</Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <Typography>
                                                            <p style={{ fontWeight: '700' }}>Order Id: {product.paymentHistory.ORDER_ID}</p>
                                                            <p style={{ fontWeight: '700' }}>Total Amount: {product.paymentHistory.TXN_AMOUNT}</p>
                                                            <p style={{ fontWeight: '700' }}>Email: {product.paymentHistory.email}</p>
                                                            <p style={{ fontWeight: '700' }}>Status: {product.paymentHistory.status}</p>
                                                            <p style={{ fontWeight: '700' }}>Geteway: {product.paymentHistory.gateway}</p>
                                                            <p style={{ fontWeight: '700' }}>Bankname: {product.paymentHistory.bankname}</p>
                                                            <p style={{ fontWeight: '700' }}>TXNID: {product.paymentHistory.TXNID}</p>
                                                            <p style={{ fontWeight: '700' }}>Payment Data: {product.paymentHistory.TXNDATE}</p>
                                                            </Typography>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )}
                        </Fragment>
                    )}
        </Fragment>);
}


export default AllOrders

