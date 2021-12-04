import React, { Fragment, useEffect } from 'react'
import { CgMouse } from 'react-icons/all'
import './Home.css'
import Product from './Product'
import MetaData from '../layout/MetaData'
import { getProduct } from '../../actions/productActins'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../Loader/Loader'
import { useAlert } from 'react-alert'

const Home = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      return alert.error(error)
    }
    dispatch(getProduct())
  }, [dispatch, error, alert])

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="E-Commerce" />
          <div className='banner'>
            <p>Welcome To Ecommerce</p>
            <h1>FIND AMAZING PRODUCT BELOW</h1>
            <a href="#container">
              <button> Scroll <CgMouse /></button>
            </a>
          </div>

          <h2 className="homeHeading">Feathred Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <Product key={product.id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>

  )
}
export default Home
