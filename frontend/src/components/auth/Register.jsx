import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Grid,
  Switch,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import BusinessServices from "../../services/BusinessService";
import CustomerServices from "../../services/CustomerService";
import categoryServices from "../../services/CategoriesService";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "300px",
  },
  child: {
    width: "60%",
  },
}));
const Register = (props) => {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [details, setDetails] = React.useState("");
  const [isCustomer, setIsCustomer] = React.useState(false);
  const [category, setCategory] = React.useState("");

  const getCategories = () => {
    categoryServices.getCategories().then((data) => {
      setCategories(data);
    });
  };
  React.useEffect(getCategories, []);
  return (
    <div className="Registerback">
      <div className={classes.container}>
        <div className={classes.child}>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />{" "}
          <br />
          <TextField
            label="email"
            fullWidth
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />{" "}
          <br />
          <TextField
            label="password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />{" "}
          <br />
          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />{" "}
          <br />
          <TextField
            label="Phone"
            fullWidth
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />{" "}
          <br />
          {!isCustomer && (
            <>
              {/* <TextField
                label="Categories"
                fullWidth
                value={categories}
                onChange={(e) => {
                  setCategories(e.target.value);
                }} */}
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="category"
                fullWidth
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

              <br />
            </>
          )}
          {!isCustomer && (
            <>
              <TextField
                label="Details"
                fullWidth
                value={details}
                onChange={(e) => {
                  setDetails(e.target.value);
                }}
              />
              <br />
            </>
          )}
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Business User</Grid>
            <Grid item>
              <Switch
                checked={isCustomer}
                onChange={() => {
                  setIsCustomer(!isCustomer);
                }}
                name="isCustomer"
                color="primary"
              />
            </Grid>
            <Grid item>Customer User</Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              !isCustomer
                ? BusinessServices.register(
                    name,
                    email,
                    password,
                    username,
                    category,
                    phone,
                    details
                  )
                    .then((data) => {
                      console.log(data);
                      props.history.push("/login");
                    })
                    .catch((err) => {
                      console.log(err);
                      toast.error(err.response.data, {
                        position: toast.POSITION.TOP_LEFT,
                      });
                    })
                : CustomerServices.register(
                    name,
                    email,
                    password,
                    username,
                    phone
                  )
                    .then((data) => {
                      console.log(data);
                      props.history.push("/login");
                    })
                    .catch((err) => {
                      console.log(err);
                      toast.error(err.response.data, {
                        position: toast.POSITION.TOP_LEFT,
                      });
                    });
            }}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
