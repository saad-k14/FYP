import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import requestServices from "../../services/RequestService";

const NewRequest = (props) => {
  const [user, setUser] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [details, setDetails] = React.useState("");
  const [minprice, setMinprice] = React.useState("");
  const [maxprice, setMaxprice] = React.useState("");
  const [duration, setDuration] = React.useState("");
  return (
    <div className="newRequest">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className="RequestHeading">
            <h1>Add a New Request</h1>
          </div>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <TextField
            label="User"
            fullWidth
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
            }}
          />
          <TextField
            label="Category"
            fullWidth
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <TextField
            label="Details"
            fullWidth
            value={details}
            onChange={(e) => {
              setDetails(e.target.value);
            }}
          />
          <TextField
            label="Minprice"
            fullWidth
            value={minprice}
            onChange={(e) => {
              setMinprice(e.target.value);
            }}
          />
          <TextField
            label="Maxprice"
            fullWidth
            value={maxprice}
            onChange={(e) => {
              setMaxprice(e.target.value);
            }}
          />
          <TextField
            label="Duration"
            fullWidth
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={9}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              requestServices
                .addRequest({
                  user,
                  category,
                  details,
                  minprice,
                  maxprice,
                  duration,
                })
                .then((data) => {
                  console.log(data);
                  props.history.push("/requests");
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Add New
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default NewRequest;
