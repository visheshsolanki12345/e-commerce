import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {

  //========================= State data user ================================//
  const { loading, isAuthenticated } = useSelector((state) => state.user);


  //========================= Main Root ================================//
  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Redirect to="/login" />;
            }

            // if (isAdmin === true && user.role !== "admin") {
            //   return <Redirect to="/login" />;
            // }

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
