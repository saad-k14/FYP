import {
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
  Select as MuiSelect,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  inputWidth: {
    width: "80%",
  },
}));

export default function Select(props) {
  const classes = useStyles();
  const { name, label, value, error = null, onChange, options } = props;
  return (
    <FormControl variant="outlined" className={classes.inputWidth} size="small">
      {/* {...error && { error: true }} */}
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange}>
        <MenuItem value="">None</MenuItem>
        {options.map((item) => (
          <MenuItem key={item._id} value={item._id || item._id}>
            {item.officeName || item.productGroupName}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
