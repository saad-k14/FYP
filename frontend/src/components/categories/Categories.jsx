import React from "react";
import SingleCategory from "./SingleCategory";
import { Button, Grid } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
//import { Link } from "react-router-dom";
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
      .getCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //getData();
  React.useEffect(getData, []);
  const handleNewBlogsClick = () => {
    console.log(props);
    props.history.push("categories/newcategory");
  };
  console.log("inside categories component");
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <h1>categories</h1>
        </Grid>
        <Fab
          color="primary"
          aria-label="add"
          className={classes.addBtn}
          onClick={handleNewBlogsClick}
        >
          <AddIcon />
        </Fab>
      </Grid>
      {categories.length == 0 ? (
        <p>there are no categories yet</p>
      ) : (
        <div className="Categories">
          <Grid container spacing={3}>
            {categories.map((categories, index) => (
              <SingleCategory
                key={index}
                category={categories}
                onDelete={getData}
              />
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default Categories;
