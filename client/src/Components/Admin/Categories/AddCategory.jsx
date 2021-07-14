import React from "react";
import { Grid, makeStyles, Button } from "@material-ui/core";
import Controls from "./../Common/FormControls";
import Notification from "../Common/Notification";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "80%",
  },
}));

const AddCategory = (props) => {
  const classes = useStyles();
  const [categoryId, setCategoryId] = React.useState(0);
  const [categoryName, setCategoryName] = React.useState("");
  const [categoryIcon, setCategoryIcon] = React.useState("");
  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const { addOrEdit, categoryForEdit } = props;

  const resetForm = () => {
    setCategoryId(0);
    setCategoryName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("categoryName", categoryName);
    data.append("categoryIcon", categoryIcon);
    addOrEdit(data, categoryId, resetForm);
  };

  React.useEffect(() => {
    if (categoryForEdit != null) {
      setCategoryId(categoryForEdit._id);
      setCategoryName(categoryForEdit.categoryName);
    }
  }, [categoryForEdit]);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Controls.Input
            size="medium"
            style={{ width: "100%" }}
            className={classes.input}
            label="Category Name"
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
            fullWidth
            autoFocus
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="icon"
            type="file"
            onChange={(event) => {
              const icon = event.target.files[0];
              setCategoryIcon(icon);
            }}
          />
          <label htmlFor="icon">
            <Button variant="contained" color="primary" component="span">
              Category Icon
            </Button>
          </label>
          {/* <input
            type="file"
            id="displayImage"
            // onChange={(event) => {
            //   const displayImage = event.target.files[0];
            //   setDisplayImage(displayImage);
            // }}
          /> */}
        </Grid>
        <Grid item xs={12} md={6}></Grid>
        <Grid item xs={12} md={6}>
          <Controls.Button
            variant="contained"
            color="primary"
            size="large"
            text="Submit"
            type="submit"
          />
          <Controls.Button
            variant="contained"
            color="default"
            size="large"
            text="Reset"
            onClick={resetForm}
          />
        </Grid>
      </Grid>
      <Notification notify={notify} setNotify={setNotify}></Notification>
    </form>
  );
};

export default AddCategory;
