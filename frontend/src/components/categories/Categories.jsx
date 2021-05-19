import React from "react";
import SingleCategory from "./SingleCategory";

import { Button, Grid, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import categoryServices from "../../services/CategoriesService";

const useStyles = makeStyles((theme) => ({
  addBtn: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const Categories = (props) => {
  const [categories, setCategories] = React.useState([]);
  const classes = useStyles();
  const getData = () => {
    categoryServices
      .getBlogs()
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //getData();
  React.useEffect(getData, []);
  console.log("inside categories component");
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <h1>categories</h1>
        </Grid>
        <Grid item xs={3}>
          <Link to="categories/new">
            <Button>Add new Category</Button>
          </Link>
        </Grid>
      </Grid>
      {categories.length == 0 ? (
        <p>there are no categories yet</p>
      ) : (
        <Grid container spacing={3}>
          {categories.map((category, index) => (
            <SingleCategory key={index} category={category} />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Categories;
