import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import BusinessServices from "../../services/BusinessService";

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

const BusinessMenu = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className="MenuBar">
        <AppBar position="static" color="transparent">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="primary"
              aria-label="menu"
            ></IconButton>
            <Typography variant="h6" className={classes.title}>
              <Link to="/Business">Profile</Link>
            </Typography>
            <Typography variant="h6" className={classes.title}>
              <Link to="/Business/CheckRequests">Check Requests</Link>
            </Typography>
            <Typography variant="h6" className={classes.title}>
              <Link to="/ContactUs">Contact Us</Link>
            </Typography>
            {!BusinessServices.isLoggedIn() ? (
              <>
                <div className="login">
                  <Typography variant="h6">
                    <Link to="/business/login" className={classes.link}>
                      Login
                    </Link>
                  </Typography>
                </div>
                <div className="Register">
                  <Typography variant="h6">
                    <Link to="/business/register" className={classes.link}>
                      Register
                    </Link>
                  </Typography>
                </div>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={(e) => {
                  BusinessServices.logout();
                  window.location.reload();
                }}
              >
                LogOut
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
};

export default BusinessMenu;
