import React from 'react'
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";


const Product = ({ product }) => {
    const options = {
      value: product.rating,
      readOnly: true,
      precision: 0.5,
    };
    

    return (
            <Link className='productCard' to={`/product/${product.id}`} >
                <img src={product.product_image} alt={product.title} />
                <p>{product.title}</p>

                <div>
                <Rating {...options} />{" "}
                    <span> ({product.numReviews} Reviews) </span>
                </div>
                <span> Rs.{product.selling_price} <del>  Rs. {product.discounted_price} </del> </span>
            </Link>

    )
}

export default Product




