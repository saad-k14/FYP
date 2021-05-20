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
  Grid,
} from "@material-ui/core";

import categoryServices from "../../services/CategoriesService";
import BusinessServices from "../../services/BusinessService";
import SingleCategory from "../categories/SingleCategory";
import SingleBusiness from "./SingleBusiness";

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
  const [username, setUsername] = React.useState("");
  const [b_users, setB_users] = React.useState([]);
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
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            BusinessServices.getB_UsersByUsername(username).then((data) => {
              setB_users(data);
            });
          }}
        >
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
              setB_users(data);
            });
          }}
        >
          Search By Category
        </Button>
      </div>
      <div>
        <br />
        {b_users.length != 0 ? (
          <Grid container spacing={3}>
            {b_users.map((requests, index) => (
              <SingleBusiness key={index} b_user={requests} />
            ))}
          </Grid>
        ) : (
          <div>
            <h2>No user Found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Searchbusiness;
