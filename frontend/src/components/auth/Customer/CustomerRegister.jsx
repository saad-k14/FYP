import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import CustomerServices from "../../../services/CustomerService";

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
const C_Register = (props) => {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");

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
            label="Phone"
            fullWidth
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />{" "}
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              CustomerServices.register(name, email, password, phone)
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

export default C_Register;
