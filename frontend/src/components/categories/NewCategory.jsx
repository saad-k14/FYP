import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import categoryServices from "./../../services/CategoriesService";

const NewCategory = (props) => {
  const [title, setTitle] = React.useState("");
  return (
    <div className="newCategory">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className="CategoryHeading">
            <h1>Add a New Category</h1>
          </div>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={9}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              categoryServices
                .addCategory({ title })
                .then((data) => {
                  console.log(data);
                  props.history.push("/categories");
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Add New
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default NewCategory;
