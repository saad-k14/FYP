//to display a single category
import React from "react";
import { Grid, Button } from "@material-ui/core";
import categoryServices from "./../../services/CategoriesService";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const SingleCategory = (props) => {
  const { category, onDelete, history } = props;
  console.log(props);
  return (
    <Grid item xs={4}>
      <h2>
        <>
          <div>
            <Link to={"/categories/" + category._id}>{category.title}</Link>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              console.log("navigate to update");
              history.push("/categories/update/" + category._id);
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => {
              categoryServices
                .deleteCategory(category._id)
                .then((data) => {
                  console.log(data);
                  onDelete();
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Delete
          </Button>
        </>
      </h2>
      <hr />
    </Grid>
  );
};
//display the categories (done)
//link the titles to a new page with all the business users related to that category
//link the names of those business users to their profiles

export default withRouter(SingleCategory);
