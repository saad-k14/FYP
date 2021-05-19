import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Grid } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import BusinessServices from "../../services/BusinessService";
import CustomerServices from "../../services/CustomerService";

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
const Login = (props) => {
  const classes = useStyles();
  const [email, setEmail] = React.useState("admin1@gmail.com");
  const [password, setPassword] = React.useState("password");
  const [isCustomer, setIsCustomer] = React.useState(false);
  return (
    <div className="Loginback">
      <div className={classes.container}>
        <div className={classes.child}>
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
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              if (isCustomer) {
                CustomerServices.login(email, password)
                  .then((data) => {
                    console.log(data);
                    window.location.href = "/customer";
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                BusinessServices.login(email, password)
                  .then((data) => {
                    console.log(data);
                    window.location.href = "/business";
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }}
          >
            {isCustomer ? <>Customer Login</> : <>Business Login</>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
