import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import axios from "axios";
import categoryServices from "./../../services/CategoriesService";

const UpdateCategory = (props) => {
  const [title, setTitle] = React.useState("");
  const id = props.match.params.id;
  React.useEffect(() => {
    categoryServices.getSingleCategory(id).then((data) => {
      setTitle(data.title);
    });
  }, []);
  return (
    <div className="UpdatepageforCategory">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className="CategoryHeading">
            <h1>Update This Category</h1>
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
                .updateCategory(id, { title })
                .then((data) => {
                  console.log(data);
                  props.history.push("/categories");
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Update
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default UpdateCategory;
