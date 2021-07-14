import { TextField } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  inputWidth: {
    // width: "80%",
  },
}));

export default function Input(props) {
  const { name, label, value, error = null, onChange, ...other } = props;
  const classes = useStyles();

  return (
    <TextField
      className={classes.inputWidth}
      variant="outlined"
      label={label}
      size="small"
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
}
