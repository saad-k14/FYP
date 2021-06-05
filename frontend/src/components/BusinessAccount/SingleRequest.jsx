//to display a single category
import React from "react";
import { Grid, Button } from "@material-ui/core";
import requestServices from "../../services/RequestService";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const SingleRequest = (props) => {
  const { request, onDelete, history } = props;
  console.log(props);
  return (
    <Grid item xs={4}>
      <h2>{request.category}</h2>
      <p>{request.user}</p>
      <p>{request.details}</p>
      <p>
        minprice = {request.minprice}$, maxprice = {request.maxprice}$
      </p>
      <p>{request.duration}</p>
      <hr />
    </Grid>
  );
};
//display the categories (done)
//link the titles to a new page with all the business users related to that category
//link the names of those business users to their profiles

export default withRouter(SingleRequest);
