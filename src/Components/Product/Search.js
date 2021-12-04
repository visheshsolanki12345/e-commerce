import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
import MetaData from "../layout/MetaData";
import "./Search.css";
import Loader from "../Loader/Loader";
import { List, ListItem } from "@material-ui/core";
import { Link } from "react-router-dom";


const Search = ({ history }) => {

  //========================= varibale hooks  ================================//
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  // // console.log('data', data)

  //========================= searchSuggestion func  ================================//
  const searchSuggestion = async () => {
    const searchData = await axios.get("/api/search/")
    setData(searchData.data)
  }

  //========================= useEffect  ================================//
  useEffect(() => {
    searchSuggestion()
    setLoading(false)
  }, [])

  //========================= searchSubmitHandler func  ================================//
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };

  //========================= getKeyword func  ================================//
  const getKeyword = (text) => {
    setKeyword(text);
  }

  //========================= loading func  ================================//
  if (loading) {
    return <Loader />
  }

  //========================= Main root  ================================//
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Search A Product -- ECOMMERCE" />
          <form className="searchBox" onSubmit={searchSubmitHandler}>
            <input
              type="text"
              placeholder="Search a Product ..."
              onChange={(e) => getKeyword(e.target.value)}
            />
            <input type="submit" value="Search" />
          </form>

          <div className='searchBox2'>
          {
            keyword &&
            <List className='listMain' >
              {
                data.filter(product => product.title.toLowerCase().includes(keyword.toLowerCase())).map(product => (
                  <ListItem className='selectHover' key={product.id}>
                    <Link 
                      to={`/products/${product.title}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {product.title}
                    </Link>
                  </ListItem>
                ))
              }
            </List>
          }
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Search;
