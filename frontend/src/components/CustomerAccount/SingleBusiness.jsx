//to display a single category
import React from "react";
import { Grid, Button } from "@material-ui/core";
import requestServices from "../../services/RequestService";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const SingleBusiness = (props) => {
  const { b_user } = props;
  return (
    <Grid item xs={4}>
      <h2>{b_user.name}</h2>
      <p>{b_user.username}</p>
      <p>{b_user.email}</p>
      <p>{b_user.phone}</p>
      <p>{b_user.details}</p>
      <hr />
    </Grid>
  );
};
//display the categories (done)
//link the titles to a new page with all the business users related to that category
//link the names of those business users to their profiles

export default withRouter(SingleBusiness);
