import React, { Fragment, useEffect } from 'react'
import './Products.css'
import { clearErrors, getProduct } from '../../actions/productActins'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../Loader/Loader'
import { useAlert } from 'react-alert'
import Product from '../Home/Product'
import Pagination from "react-js-pagination";
import { useState } from 'react'
import { Slider, Typography } from '@material-ui/core'
import MetaData from '../../Components/layout/MetaData'

//========================= categories  ================================//
const categories = [
  "All",
  "Laptop",
  "Buttom Wear",
  "Top Wear",
  "Mobile",
  "Electronics",
  "Shoes",
  "LED",
  "Fashion WOMEN",
];

const Products = (props) => {

  //========================= Varibale Hooks  ================================//
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const alert = useAlert()
  const dispatch = useDispatch()
  const { loading, error, products, productsCount } = useSelector((state) => state.products);
  const keyword = props.match.params.keyword
  const [ratings, setRatings] = useState(0);
  const [filterPrice, setFilterPrice] = useState([0, 25000]);

  if (category === 'All'){
    setCategory("")
  }

   //========================= useEffect  ================================//
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, category, ratings, filterPrice))
  }, [dispatch, keyword, currentPage, category, ratings, filterPrice, alert, error])

   //========================= set corrent page funct  ================================//
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

   //========================= Price Handler func  ================================//
  const priceHandler = (event, newPrice) => {
    setFilterPrice(newPrice);
  };

   //========================= pagination options  ================================//
  const options = {
    activePage: currentPage,
    itemsCountPerPage: 1,
    totalItemsCount: productsCount,
    nextPageText: "Next",
    prevPageText: "Prev",
    firstPageText: "1st",
    lastPageText: "Last",
    itemClass: "page-item",
    linkClass: "page-link",
    activeClass: "pageItemActive",
    activeLinkClass: "pageLinkActive"
  }


   //========================= main root  ================================//
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
        <MetaData title="PRODUCT -- ECOMMERCE" />
          <h2 className='productsHeading'>Products</h2>
          <div className='products'>
            {products && products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={filterPrice}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {/* {resultPerPage < productsCount && ( */}
          <div className="paginationBox">
            <Pagination onChange={setCurrentPageNo} {...options} />
          </div>
          {/* )} */}
        </Fragment>
      )}
    </Fragment>
  )
}

export default Products
