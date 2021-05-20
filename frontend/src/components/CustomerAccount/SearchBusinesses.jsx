import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  Switch,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@material-ui/core";

import categoryServices from "../../services/CategoriesService";
import BusinessServices from "../../services/BusinessService";
import SingleCategory from "../categories/SingleCategory";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Searchbusiness = () => {
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState("");
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

  const getCategories = () => {
    categoryServices.getCategories().then((data) => {
      setCategories(data);
    });
  };
  React.useEffect(getCategories, []);

  return (
    <div>
      <h1>This is where a customer will search businesses with categories</h1>
      <div className={classes.root} noValidate autoComplete="off">
        <TextField
          id="filled-basic"
          label="Enter a username"
          variant="filled"
        />
        <Button variant="contained" color="primary" onClick={(e) => {}}>
          Search By Username
        </Button>
      </div>
      <div className={classes.root}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          {categories.map((d, index) => (
            <MenuItem value={d._id} key={index}>
              {d.title}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            BusinessServices.getB_UsersBycategory(category).then((data) => {
              console.log(data);
            });
          }}
        >
          Search By Category
        </Button>
      </div>
      <div></div>
    </div>
  );
};

export default Searchbusiness;
