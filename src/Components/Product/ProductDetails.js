import React, { useEffect, Fragment, useState } from 'react'
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import Loader from '../Loader/Loader'
import { useAlert } from 'react-alert'
import { useSelector, useDispatch } from 'react-redux'
import { getProductDetails, clearErrors, newReview } from '../../actions/productActins'
import { addItemsToCart, showCartData, incDec, Decriment } from "../../actions/cartAction";
import { Rating } from "@material-ui/lab";
import ReviewCard from './ReviewCard';
import MetaData from '../layout/MetaData';
import { useHistory } from "react-router-dom";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@material-ui/core";


const ProductDetails = (props) => {

    //========================= State Data ================================//
    const { product, loading, error } = useSelector((state) => state.productDetails)
    const { cartItems, loadingCart } = useSelector((state) => state.cart)


     //========================= Varibale Hooks ================================//
    const history = useHistory()
    const userInfo = JSON.parse(localStorage.getItem('user-details'))
    const alert = useAlert()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [quantity, setQuantity] = useState();
    const [incdecID, setIncdecID] = useState();

    //========================= Review toggle funct ================================//
    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };


    //========================= Review Submit funct  ================================//
    const reviewSubmitHandler = () => {
        dispatch(newReview(props.match.params.id, rating, comment));
        dispatch(getProductDetails(props.match.params.id))
        if (localStorage.getItem('user-details')) {
            dispatch(showCartData())
        }
        setOpen(false);
    };


  //========================= find cart count value  ================================//
    if (cartItems && cartItems.length !== 0) {
        if (cartItems === 401) {
            alert.error("Please before login.")
            history.push('/login')
        } else {
            if (cartItems.message !== "Cart is Empty.") {
                var uniqueList = [...new Set(cartItems.data.map((curElem) => {
                    return curElem.product.id
                })
                ),]
                // // console.log('uniqueList', uniqueList);
            }
        }
    }


    //========================= find id form data  ================================//
    const items = async () => {
        const itemFind = await cartItems.data.find(x => x.product.id === product.id)
        // console.log(itemFind.quantity)
        if (itemFind) {
            setQuantity(itemFind.quantity)
            setIncdecID(itemFind.id)
        }
        return
    }

      //========================= call items funct  ================================//
    if (cartItems && cartItems.length !== 0 && cartItems.message !== "Cart is Empty.") {
        if (cartItems) {
            items()
        }
    } 
    

      //========================= increment cart funct  ================================//
    const increaseQuantity = () => {
        if (product.stock <= quantity) return;
        
        const qty = quantity + 1;
        setQuantity(qty);
        dispatch(incDec(incdecID, quantity));
        if (localStorage.getItem('user-details')) {
            dispatch(showCartData())
            // setQuantity(1)
        }
    };

    //========================= decrement cart funct  ================================//
    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
        dispatch(Decriment(incdecID, quantity));
        if (localStorage.getItem('user-details')) {
            dispatch(showCartData())
        }
    };

    //========================= add to cart funct  ================================//
    const addToCartHandler = () => {
        dispatch(addItemsToCart(props.match.params.id, quantity));
        if (localStorage.getItem('user-details')) {
            dispatch(showCartData())
        }
        alert.success("Item Added To Cart");
    };

    //========================= go func  ================================//
    const goLogin = () => {
        alert.error("Please before login.")
        history.push('/login')
    }

    //========================= Star option  ================================//
    const options = {
        size: "large",
        value: product && product.rating,
        readOnly: true,
        precision: 0.5,
    };

    //========================= image Array  ================================//
    const images = [product && product.product_image, product && product.product_image1, product && product.product_image2, product && product.product_image3, product && product.product_image4]

    //========================= move order funct  ================================//
    const moveOrder = () => {
        history.push('/cart')
    }


    //========================= useEffect  ================================//
    useEffect(() => {
        dispatch(getProductDetails(props.match.params.id))
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (localStorage.getItem('user-details')) {
            dispatch(showCartData())
        }
    }, [dispatch, props.match.params.id, error, alert])


    //========================= Main root  ================================//
    return (
        <Fragment>
            {loading || loadingCart || product === undefined ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${product.title} -- ECOMMERCE`} />

                    <div className='ProductDetails'>
                        <div>
                            <Carousel>
                                {images &&
                                    images.map((item, i) => (
                                        <img
                                            className="CarouselImage"
                                            key={i}
                                            src={item}
                                            alt={`${i} Slide`}
                                        />
                                    ))}
                            </Carousel>
                        </div>
                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.title}</h2>
                                <p>Product # {product.id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <Rating {...options} />
                                <span className="detailsBlock-2-span">
                                    {" "}
                                    ({product.numReviews} Reviews)
                                </span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`₹${product.selling_price}`}</h1>
                                <h1 style={{ color: 'red' }}><del>{`₹${product.discounted_price}`}</del></h1>
                                <div className="detailsBlock-3-1">

                                    {
                                        uniqueList && userInfo && uniqueList.find(element => element === product.id) ?
                                            <>
                                                <div className="detailsBlock-3-1-1">
                                                    <button onClick={decreaseQuantity}>-</button>
                                                    <input readOnly type="number" value={quantity && quantity} />
                                                    <button onClick={increaseQuantity}>+</button>
                                                </div>
                                                <button
                                                    disabled={product.Stock < 1 ? true : false}
                                                    onClick={moveOrder}
                                                >
                                                    Buy Now
                                                </button>
                                            </>
                                            : userInfo ?
                                                <>
                                                    <button
                                                        disabled={product.Stock < 1 ? true : false}
                                                        onClick={addToCartHandler}
                                                    >
                                                        Add to Cart
                                                    </button>

                                                </>
                                                :
                                                <>
                                                    <button
                                                        onClick={goLogin}
                                                    >
                                                        Add to Cart
                                                    </button>
                                                </>
                                    }
                                </div>

                                <p>
                                    Status:
                                    <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                        {product.stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </div>

                            <div className="detailsBlock-4">
                                Description : <p>{product.description}</p>
                            </div>
                            {
                                userInfo ?
                                    <>
                                        <button onClick={submitReviewToggle} className="submitReview">
                                            Submit Review
                                        </button>
                                    </>
                                    :
                                    <>
                                        <button onClick={goLogin} className="submitReview">
                                            Submit Review
                                        </button>
                                    </>
                            }

                        </div>
                    </div>

                    <h3 className="reviewsHeading">REVIEWS</h3>
                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />

                            <textarea
                                className="submitDialogTextArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={reviewSubmitHandler} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {product.reviewby && product.reviewby[0] ? (
                        <div className="reviews">
                            {product.reviewby &&
                                product.reviewby.map((review, i) => (
                                    <ReviewCard key={i} review={review} />
                                ))}
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                    )}
                </Fragment>
            )}
        </Fragment>

    )
}

export default ProductDetails
