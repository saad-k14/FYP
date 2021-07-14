import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

const ToolBar = () => {
  const classes = useStyles();
  return <div className={classes.toolbar} />;
};

export default ToolBar;
