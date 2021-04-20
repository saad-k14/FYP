import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
//import userService from "../Services/UserServices";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(25),
  },
  title: {
    flexGrow: 1,
  },
}));

const Menu = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="primary"
            aria-label="menu"
          ></IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">Home</Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link to="/AboutUs">About Us</Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link to="/ContactUs">Contact Us</Link>
          </Typography>
          {/*{!userService.isLoggedIn() ? (
            <>
              <div className="login">
                <Typography variant="h6">
                  <Link to="/login" className={classes.link}>
                    Login
                  </Link>
                </Typography>
              </div>
              <div className="Register">
                <Typography variant="h6">
                  <Link to="/register" className={classes.link}>
                    Register
                  </Link>
                </Typography>
              </div>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                userService.logout();
                window.location.reload();
              }}
            >
              LogOut {userService.getLoggedInUser().name}
            </Button>
            )}*/}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Menu;
