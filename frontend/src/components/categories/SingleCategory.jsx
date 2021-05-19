//to display a single category
import React from "react";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

const SingleCategory = ({ category }) => {
  return (
    <Grid item xs={3}>
      <h2>
        <Link>{category.title}</Link>
      </h2>
      <hr />
    </Grid>
  );
};
//display the categories (done)
//link the titles to a new page with all the business users related to that category
//link the names of those business users to their profiles

export default SingleCategory;
